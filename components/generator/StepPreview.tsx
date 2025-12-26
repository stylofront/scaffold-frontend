"use client"

import { FileNode } from "@/lib/types"
import { FileTree } from "./FileTree"
import { motion } from "framer-motion"
import { FolderTree, Info } from "lucide-react"

interface StepPreviewProps {
    fileTree: FileNode[]
}

export function StepPreview({ fileTree }: StepPreviewProps) {
    return (
        <div>
            <div className="text-center sm:text-left mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Preview Your Project
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Review the files that will be generated
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-xl bg-muted/20 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
                    <FolderTree className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Project Structure</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                        {countFiles(fileTree)} files
                    </span>
                </div>

                {/* File Tree */}
                <div className="p-3 sm:p-4 max-h-[280px] sm:max-h-[320px] overflow-auto">
                    {fileTree.length > 0 ? (
                        <FileTree nodes={fileTree} />
                    ) : (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-pulse flex items-center gap-2 text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Info note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10"
            >
                <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Always Latest:</span> Dependencies use <code className="bg-muted px-1 rounded">*</code> to install the newest versions. Lock versions after installation if needed.
                </p>
            </motion.div>
        </div>
    )
}

function countFiles(nodes: FileNode[]): number {
    let count = 0
    for (const node of nodes) {
        if (node.type === "file") {
            count++
        } else if (node.children) {
            count += countFiles(node.children)
        }
    }
    return count
}
