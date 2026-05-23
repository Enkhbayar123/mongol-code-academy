/**
 * Gemini API Client Utility for MongolGPT Specialized Counselor
 */

const SYSTEM_INSTRUCTION = `
You are MongolGPT, a highly specialized academic, career, and psychological counselor for students of the Mongol Code Academy.

YOUR MISSION:
1. Provide personalized, highly detailed learning roadmaps in software engineering, programming languages, algorithms, data structures, and tech stacks.
2. Provide career guidance, major selection advice, high-school-to-university transition tips, and computer science study methods.
3. Provide academic stress management, encouragement, motivational counseling, and mental well-being support for students struggling with challenging concepts.

CRITICAL GUARDRAIL BOUNDARY RULES:
- You must ONLY assist students with learning roadmaps, major selection, career advice, and psychological/stress counseling.
- If a student asks you to solve coding homework, write full source code, debug compiler errors, write code snippets, solve math equations, or answer unrelated general knowledge/chit-chat queries, you MUST warmly, supportively, and firmly decline. 
- You should say something like: "Би танд зөвхөн суралцах замын зураг гаргах, мэргэжил сонголт болон сэтгэл зүйн зөвлөгөө өгөх чиглэлээр туслах зориулалттай MongolGPT зөвлөх байна. Бусад ерөнхий код бичих эсвэл даалгаврын хувьд та манай Бодлого бодох хэсгийн AI Tutor-оос тусламж авах боломжтой шүү. 😊" (Adapting the language to match the query's language).
- Respond in the language used by the student (Mongolian, English, or Korean).
- Maintain a warm, empathetic, professional, inspiring, and friendly counseling tone. Use warm emojis occasionally to put the student at ease.
`;

// List of models and API versions to try in sequence to ensure 100% robust access
const MODELS_TO_TRY = [
  "gemini-3.5-flash",        // Primary modern model (2026 standard)
  "gemini-3.1-pro",          // Advanced modern fallback
  "gemini-3.0-flash",        // Legacy modern fallback
  "gemini-2.5-flash",        // Final 2.x fallback
  "gemini-2.0-flash",        // 2.0 fallback
  "gemini-1.5-flash"         // Old legacy fallback
];

const API_VERSIONS = [
  "v1",
  "v1beta"
];

/**
 * Sends chat history to Gemini API under counselor instructions.
 * Incorporates a robust nested model and API version fallback chain to ensure high reliability.
 * @param {Array<{sender: 'user'|'ai', text: string}>} chatHistory 
 * @param {string} language - Active language code ('mn' | 'ko' | 'en')
 * @returns {Promise<string>}
 */
export async function askGeminiCounselor(chatHistory, language = 'mn') {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_free_gemini_api_key_here") {
    return "Энэхүү платформд Gemini API түлхүүр тохируулагдаагүй байна. Та төслийн root хавтас дотор '.env' файл үүсгэн VITE_GEMINI_API_KEY түлхүүрээ оруулна уу. (Gemini API key is not configured in the .env file).";
  }

  const langName = language === 'ko' ? 'Korean' : language === 'en' ? 'English' : 'Mongolian';
  const lastUserIndex = chatHistory.map(m => m.sender).lastIndexOf('user');

  // Format message history for Gemini API with context-injected counselor instructions
  const contents = chatHistory.map((msg, index) => {
    // Find the very first message sent by the user to inject the counselor system rules
    const isFirstUserMessage = msg.sender === 'user' && !chatHistory.slice(0, index).some(m => m.sender === 'user');
    const isLastUserMessage = index === lastUserIndex;
    
    let text = msg.text;

    if (isFirstUserMessage) {
      text = `[SYSTEM INSTRUCTION: ${SYSTEM_INSTRUCTION}]\n\nStudent Message: ${text}`;
    }

    if (isLastUserMessage) {
      text = `[LANGUAGE DIRECTIVE: You MUST respond, console, and answer this and all future messages ENTIRELY in the ${langName} language. Do not output other languages.]\n\n${text}`;
    }

    return {
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text }]
    };
  });

  let lastError = null;

  // Try each model and version combination in sequence until one succeeds
  for (const modelName of MODELS_TO_TRY) {
    for (const apiVersion of API_VERSIONS) {
      try {
        console.log(`[MongolGPT] Attempting counseling generation with model: ${modelName} (${apiVersion})`);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8192,
              }
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || `HTTP status ${response.status}`);
        }

        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!candidateText) {
          throw new Error("Empty response or invalid payload format from API");
        }

        console.log(`[MongolGPT] Successfully generated response using model: ${modelName} (${apiVersion})`);
        return candidateText;
      } catch (error) {
        console.warn(`[MongolGPT] Model ${modelName} (${apiVersion}) failed:`, error.message);
        lastError = error;
        // Continue to try next combination in the fallback chain
      }
    }
  }

  // If all models in the fallback chain failed, present the final error
  console.error("[MongolGPT] All generative models failed in the fallback chain:", lastError);
  return `Уучлаарай, систем дараах алдааны улмаас хариу илгээж чадсангүй: ${lastError?.message || "Холболтын алдаа"}. Та холболтоо шалгаад дахин оролдоно уу.`;
}

