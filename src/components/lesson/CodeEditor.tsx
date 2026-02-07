import { Suspense, lazy, useCallback } from 'react'

const MonacoEditor = lazy(() => import('@monaco-editor/react'))

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
}

function EditorSkeleton() {
  return (
    <div
      data-testid="editor-skeleton"
      className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center"
    >
      <span className="text-gray-400 text-sm">Chargement de l'éditeur...</span>
    </div>
  )
}

export function CodeEditor({ value, onChange, language = 'html' }: CodeEditorProps) {
  const handleChange = useCallback(
    (val: string | undefined) => {
      onChange(val ?? '')
    },
    [onChange]
  )

  return (
    <div className="w-full h-full min-h-[200px]" data-testid="code-editor-wrapper">
      <Suspense fallback={<EditorSkeleton />}>
        <MonacoEditor
          height="100%"
          language={language}
          theme="vs-light"
          value={value}
          onChange={handleChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </Suspense>
    </div>
  )
}
