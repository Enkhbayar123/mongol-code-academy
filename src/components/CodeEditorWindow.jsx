// src/components/CodeEditorWindow.jsx
import React from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditorWindow({
  onChange,
  language = 'python',
  code = '',
  theme = 'vs-dark'
}) {
  const handleEditorChange = (value) => {
    if (onChange) {
      onChange('code', value || '');
    }
  };

  // Normalize language identifier for Monaco Editor
  const monacoLanguage =
    language.toLowerCase() === 'cpp' || language.toLowerCase() === 'c++'
      ? 'cpp'
      : language.toLowerCase() === 'javascript' || language.toLowerCase() === 'js'
      ? 'javascript'
      : 'python';

  return (
    <div className="w-full h-full overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        language={monacoLanguage}
        value={code}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          bracketPairColorization: { enabled: true },
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true
        }}
      />
    </div>
  );
}