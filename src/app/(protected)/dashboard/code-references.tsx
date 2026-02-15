'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react'
import { ChevronDown, ChevronRight, FileCode2, Copy, Check } from 'lucide-react'

type Props = {
    filesReferenced: {
        fileName: string
        sourceCode: string
    }[]
}

const CodeReferences = ({ filesReferenced }: Props) => {
    const [expandedFiles, setExpandedFiles] = React.useState<Set<string>>(new Set([filesReferenced[0]?.fileName]))
    const [copiedFile, setCopiedFile] = React.useState<string | null>(null)

    if (!filesReferenced.length) return null

    const toggleFile = (fileName: string) => {
        const newExpanded = new Set(expandedFiles)
        if (newExpanded.has(fileName)) {
            newExpanded.delete(fileName)
        } else {
            newExpanded.add(fileName)
        }
        setExpandedFiles(newExpanded)
    }

    const copyToClipboard = async (fileName: string, code: string) => {
        await navigator.clipboard.writeText(code)
        setCopiedFile(fileName)
        setTimeout(() => setCopiedFile(null), 2000)
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileCode2 className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-100">Relevant Files for Context</h3>
                    <span className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-xs text-zinc-400">
                        {filesReferenced.length}
                    </span>
                </div>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-zinc-400">
                The following files were analyzed to generate the answer above:
            </p>

            <div className="space-y-2">
                {filesReferenced.map((file, index) => {
                    const isExpanded = expandedFiles.has(file.fileName)
                    const isCopied = copiedFile === file.fileName

                    return (
                        <div
                            key={file.fileName}
                            className="overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 transition-all duration-200"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="group flex items-center justify-between p-2">
                                <button
                                    onClick={() => toggleFile(file.fileName)}
                                    className="flex flex-1 items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-zinc-800/50"
                                >
                                    {isExpanded ? (
                                        <ChevronDown className="h-3.5 w-3.5 text-zinc-400 transition-transform" />
                                    ) : (
                                        <ChevronRight className="h-3.5 w-3.5 text-zinc-400 transition-transform" />
                                    )}
                                    <FileCode2 className="h-3.5 w-3.5 shrink-0 text-zinc-100" />
                                    <span className="truncate text-xs font-mono font-medium text-zinc-100">
                                        {file.fileName}
                                    </span>
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        copyToClipboard(file.fileName, file.sourceCode)
                                    }}
                                    className="shrink-0 rounded-md p-2 opacity-0 transition-all hover:bg-zinc-800/60 group-hover:opacity-100"
                                    title="Copy code"
                                >
                                    {isCopied ? (
                                        <Check className="h-3.5 w-3.5 text-zinc-100" />
                                    ) : (
                                        <Copy className="h-3.5 w-3.5 text-zinc-400" />
                                    )}
                                </button>
                            </div>

                            {/* Code Content - Conditional Rendering Instead of CSS Transitions */}
                            {isExpanded && (
                                <div className="animate-fade-in border-t border-zinc-800">
                                    <div className="max-h-[280px] overflow-auto bg-zinc-950 custom-scrollbar">
                                        <SyntaxHighlighter
                                            language="typescript"
                                            style={vscDarkPlus}
                                            customStyle={{
                                                margin: 0,
                                                padding: '10px 12px',
                                                borderRadius: 0,
                                                fontSize: '11px',
                                                lineHeight: '1.5',
                                                background: '#0a0a0a',
                                            }}
                                            showLineNumbers
                                            wrapLines
                                            lineNumberStyle={{
                                                minWidth: '2.5em',
                                                paddingRight: '1em',
                                                color: '#a1a1aa',
                                                fontSize: '10px',
                                            }}
                                        >
                                            {file.sourceCode}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CodeReferences
