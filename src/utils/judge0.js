// src/utils/judge0.js
import axios from "axios";

// Free Piston API endpoint
const API_URL = "https://emkc.org/api/v2/piston/execute";

// Supported languages and their Piston versions
export const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  javascript: "18.15.0",
  typescript: "5.0.3",
  c: "10.2.0",
  "c++": "10.2.0",
  java: "15.0.2",
  go: "1.16.2",
  rust: "1.68.2"
};

export const executeCode = async (sourceCode, language, stdin) => {
  // Piston expects the language name in lowercase (e.g., "python")
  const langKey = language.toLowerCase();
  
  // Get the specific version for that language, or default to python's version if not found
  const version = LANGUAGE_VERSIONS[langKey] || "3.10.0";

  try {
    const response = await axios.post(API_URL, {
      language: langKey,
      version: version,
      files: [
        {
          content: sourceCode,
        },
      ],
      stdin: stdin || "",
    });

    const { run } = response.data;

    // Return a standardized response format
    return {
      stdout: run.stdout,
      stderr: run.stderr,
      status: {
        description: run.code === 0 ? "Accepted" : "Error",
      },
    };
  } catch (error) {
    console.error("Error executing code:", error);
    return {
      stdout: null,
      stderr: "Failed to connect to Code Execution API. " + error.message,
      status: { description: "Error" },
    };
  }
};