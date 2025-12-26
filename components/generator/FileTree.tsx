"use client"

import { FileNode } from "@/lib/types"
import { File, Folder, ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FileTreeProps {
    nodes: FileNode[]
    depth?: number
}

export function FileTree({ nodes, depth = 0 }: FileTreeProps) {
    return (
        <div className="font-mono text-sm">
            {nodes.map((node) => (
                <FileTreeNode key={node.name} node={node} depth={depth} />
            ))}
        </div>
    )
}

interface FileTreeNodeProps {
    node: FileNode
    depth: number
}

function FileTreeNode({ node, depth }: FileTreeNodeProps) {
    const [isExpanded, setIsExpanded] = useState(true)
    const isFolder = node.type === "folder"

    const paddingLeft = depth * 16

    return (
        <div>
            <div
                className={cn(
                    "flex items-center gap-1 py-1 px-2 rounded hover:bg-muted/50 cursor-default select-none",
                    isFolder && "cursor-pointer"
                )}
                style={{ paddingLeft: `${paddingLeft + 8}px` }}
                onClick={() => isFolder && setIsExpanded(!isExpanded)}
            >
                {isFolder ? (
                    <>
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <Folder className="h-4 w-4 text-primary shrink-0" />
                    </>
                ) : (
                    <>
                        <span className="w-4" />
                        <File className="h-4 w-4 text-muted-foreground shrink-0" />
                    </>
                )}
                <span className={cn("ml-1", isFolder && "font-medium")}>
                    {node.name}
                </span>
            </div>

            {isFolder && isExpanded && node.children && (
                <FileTree nodes={node.children} depth={depth + 1} />
            )}
        </div>
    )
}
