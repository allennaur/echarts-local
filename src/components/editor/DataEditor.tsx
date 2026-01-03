import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface DataEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  height?: string | number;
  theme?: 'light' | 'vs-dark';
  readOnly?: boolean;
}

const DataEditor: React.FC<DataEditorProps> = ({
  value,
  onChange,
  language = 'json',
  height = '100%',
  theme = 'light',
  readOnly = false,
}) => {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Configure editor settings here if needed
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      fontFamily: "'Fira Code', 'Droid Sans Mono', 'monospace'",
      wordWrap: 'on',
    });

    // Add JSON schema validation if language is JSON
    if (language === 'json') {
      // You could add specific schema validation here
    }
  };

  return (
    <div className="border rounded-md overflow-hidden h-full">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        theme={theme}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
};

export default DataEditor;
