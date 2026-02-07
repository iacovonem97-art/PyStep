import { useState, useEffect, useRef } from 'react'
import { DEBOUNCE_DELAY } from '@/lib/constants'

interface PreviewPanelProps {
  code: string
}

export function PreviewPanel({ code }: PreviewPanelProps) {
  const [debouncedCode, setDebouncedCode] = useState(code)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setDebouncedCode(code)
    }, DEBOUNCE_DELAY)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [code])

  const isEmpty = !debouncedCode.trim()

  return (
    <div className="w-full h-full flex flex-col" data-testid="preview-panel">
      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 text-xs text-gray-500 font-medium">
        Prévisualisation
      </div>
      <div className="flex-1 relative bg-white">
        {isEmpty ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Écris du code pour voir le résultat
          </div>
        ) : (
          <iframe
            data-testid="preview-iframe"
            srcDoc={debouncedCode}
            title="Prévisualisation du code"
            className="w-full h-full border-0"
            sandbox="allow-same-origin"
          />
        )}
      </div>
    </div>
  )
}
