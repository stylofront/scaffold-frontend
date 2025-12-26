import { ScaffoldManifest, GeneratedFile, FileNode } from "@/lib/types"
import { generatePackageJson } from "./generators/package-json"
import { generateTsConfig, generateTsConfigNode } from "./generators/tsconfig"
import { generateEslintConfig } from "./generators/eslint"
import { generateTailwindConfig, generatePostcssConfig, generateGlobalsCss } from "./generators/tailwind"
import { generateGitignore } from "./generators/gitignore"
import { generateReadme } from "./generators/readme"
import { generateFolderStructure } from "./generators/folders"
import { generatePrettierConfig, generatePrettierIgnore } from "./generators/prettier"

export function generateScaffold(manifest: ScaffoldManifest): GeneratedFile[] {
    const files: GeneratedFile[] = []

    // Generate package.json
    files.push(generatePackageJson(manifest))

    // Generate tsconfig.json (if TypeScript)
    const tsconfig = generateTsConfig(manifest)
    if (tsconfig) {
        files.push(tsconfig)
    }

    // Generate tsconfig.node.json (for Vite React with TS)
    const tsconfigNode = generateTsConfigNode(manifest)
    if (tsconfigNode) {
        files.push(tsconfigNode)
    }

    // Generate ESLint config (if enabled)
    const eslintConfig = generateEslintConfig(manifest)
    if (eslintConfig) {
        files.push(eslintConfig)
    }

    // Generate Tailwind config (if enabled)
    const tailwindConfig = generateTailwindConfig(manifest)
    if (tailwindConfig) {
        files.push(tailwindConfig)
    }

    // Generate PostCSS config (if Tailwind enabled)
    const postcssConfig = generatePostcssConfig(manifest)
    if (postcssConfig) {
        files.push(postcssConfig)
    }

    // Generate globals/styles CSS/SCSS (if styling enabled)
    const globalsCss = generateGlobalsCss(manifest)
    if (globalsCss) {
        files.push(globalsCss)
    }

    // Generate Prettier config (if enabled)
    const prettierConfig = generatePrettierConfig(manifest)
    if (prettierConfig) {
        files.push(prettierConfig)
    }

    // Generate Prettier ignore (if enabled)
    const prettierIgnore = generatePrettierIgnore(manifest)
    if (prettierIgnore) {
        files.push(prettierIgnore)
    }

    // Generate .gitignore (if git enabled)
    if (manifest.git !== false) {
        files.push(generateGitignore(manifest))
    }

    // Generate README.md
    files.push(generateReadme(manifest))

    // Generate folder structure and source files
    const folderFiles = generateFolderStructure(manifest)
    files.push(...folderFiles)

    return files
}

export function filesToTree(files: GeneratedFile[]): FileNode[] {
    const root: FileNode[] = []

    for (const file of files) {
        const parts = file.path.split("/")
        let currentLevel = root

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i]
            const isFile = i === parts.length - 1

            let existing = currentLevel.find((n) => n.name === part)

            if (!existing) {
                existing = {
                    name: part,
                    type: isFile ? "file" : "folder",
                    ...(isFile ? { content: file.content } : { children: [] }),
                }
                currentLevel.push(existing)
            }

            if (!isFile && existing.children) {
                currentLevel = existing.children
            }
        }
    }

    // Sort: folders first, then files, both alphabetically
    const sortNodes = (nodes: FileNode[]): FileNode[] => {
        return nodes.sort((a, b) => {
            if (a.type === "folder" && b.type === "file") return -1
            if (a.type === "file" && b.type === "folder") return 1
            return a.name.localeCompare(b.name)
        }).map((node) => {
            if (node.children) {
                return { ...node, children: sortNodes(node.children) }
            }
            return node
        })
    }

    return sortNodes(root)
}
