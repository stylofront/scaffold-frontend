import { ScaffoldManifest, GeneratedFile } from "@/lib/types"

export function generateGitignore(manifest: ScaffoldManifest): GeneratedFile {
    const lines: string[] = [
        "# Dependencies",
        "node_modules",
        ".pnp",
        ".pnp.js",
        "",
        "# Testing",
        "coverage",
        "",
        "# Build outputs",
    ]

    switch (manifest.framework) {
        case "next":
            lines.push(".next/", "out/")
            break
        case "react":
            lines.push("dist/")
            break
        case "node":
            lines.push("dist/", "build/")
            break
        case "static":
            lines.push("build/")
            break
    }

    lines.push(
        "",
        "# Misc",
        ".DS_Store",
        "*.pem",
        "",
        "# Debug",
        "npm-debug.log*",
        "yarn-debug.log*",
        "yarn-error.log*",
        "",
        "# Local env files",
        ".env*.local",
        ".env",
        "",
        "# IDE",
        ".vscode/",
        ".idea/",
        "*.swp",
        "*.swo"
    )

    if (manifest.language === "ts") {
        lines.push("", "# TypeScript", "*.tsbuildinfo")
        if (manifest.framework === "next") {
            lines.push("next-env.d.ts")
        }
    }

    return {
        path: ".gitignore",
        content: lines.join("\n")
    }
}
