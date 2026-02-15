'use client'

import React from 'react'

export default function useSmoothStream(intervalMs = 12) {
  const [displayedText, setDisplayedText] = React.useState('')
  const [queuedChars, setQueuedChars] = React.useState(0)
  const bufferRef = React.useRef('')

  const appendChunk = React.useCallback((chunk: string) => {
    if (!chunk) return
    bufferRef.current += chunk
    setQueuedChars((prev) => prev + chunk.length)
  }, [])

  const reset = React.useCallback(() => {
    bufferRef.current = ''
    setDisplayedText('')
    setQueuedChars(0)
  }, [])

  React.useEffect(() => {
    const timer = setInterval(() => {
      const buffered = bufferRef.current.length
      if (!buffered) return

      let charsPerTick = 2
      if (buffered > 600) charsPerTick = 20
      else if (buffered > 300) charsPerTick = 12
      else if (buffered > 120) charsPerTick = 7
      else if (buffered > 40) charsPerTick = 4

      const nextChunk = bufferRef.current.slice(0, charsPerTick)
      bufferRef.current = bufferRef.current.slice(charsPerTick)
      setDisplayedText((prev) => prev + nextChunk)
      setQueuedChars((prev) => Math.max(prev - nextChunk.length, 0))
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs])

  return {
    displayedText,
    queuedChars,
    appendChunk,
    reset,
  }
}
