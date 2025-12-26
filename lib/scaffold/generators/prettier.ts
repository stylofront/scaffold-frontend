import { ScaffoldManifest, GeneratedFile } from "@/lib/types"

export function generatePrettierConfig(manifest: ScaffoldManifest): GeneratedFile | null {
    if (!manifest.prettier) {
        return null
    }

    const config = {
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: "es5",
        printWidth: 100,
        bracketSpacing: true,
        arrowParens: "avoid",
        endOfLine: "lf"
    }

    return {
        path: ".prettierrc",
        content: JSON.stringify(config, null, 2)
    }
}

export function generatePrettierIgnore(manifest: ScaffoldManifest): GeneratedFile | null {
    if (!manifest.prettier) {
        return null
    }

    const lines = [
        "# Dependencies",
        "node_modules",
        "",
        "# Build outputs"
    ]

    switch (manifest.framework) {
        case "next":
            lines.push(".next", "out")
            break
        case "react":
            lines.push("dist")
            break
        case "node":
            lines.push("dist", "build")
            break
    }

    lines.push(
        "",
        "# Misc",
        "*.min.js",
        "*.min.css",
        "package-lock.json",
        "pnpm-lock.yaml",
        "yarn.lock",
        "bun.lockb"
    )

    return {
        path: ".prettierignore",
        content: lines.join("\n")
    }
}
