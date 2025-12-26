import { ScaffoldManifest, GeneratedFile } from "@/lib/types"

export function generateReadme(manifest: ScaffoldManifest): GeneratedFile {
    const frameworkNames = {
        next: "Next.js",
        react: "React (Vite)",
        node: "Node.js",
        static: "Static Frontend"
    }

    const stylingNames = {
        tailwind: "Tailwind CSS v4",
        css: "CSS",
        scss: "SCSS (Sass)",
        sass: "Sass",
        none: "None"
    }

    const installCommands: Record<string, string> = {
        npm: "npm install",
        yarn: "yarn",
        pnpm: "pnpm install",
        bun: "bun install"
    }

    const devCommands: Record<string, string> = {
        npm: "npm run dev",
        yarn: "yarn dev",
        pnpm: "pnpm dev",
        bun: "bun run dev"
    }

    const content = `# ${manifest.name}

${manifest.description || `A ${frameworkNames[manifest.framework]} project generated with StyloFront Scaffold.`}

## Tech Stack

- **Framework**: ${frameworkNames[manifest.framework]}
- **Language**: ${manifest.language === "ts" ? "TypeScript" : "JavaScript"}
${manifest.styling !== "none" ? `- **Styling**: ${stylingNames[manifest.styling]}` : ""}
${manifest.lint ? "- **Linting**: ESLint" : ""}
${manifest.prettier ? "- **Formatting**: Prettier" : ""}

## Getting Started

### Prerequisites

- Node.js 20+ installed
- ${manifest.packageManager} package manager

### Installation

\`\`\`bash
${installCommands[manifest.packageManager]}
\`\`\`

> 💡 **Note**: This project uses \`"*"\` for dependencies to ensure you always get the latest versions.
> After installation, you can lock versions using \`${manifest.packageManager === "npm" ? "npm shrinkwrap" : manifest.packageManager + " lockfile"}\` if needed.

### Development

\`\`\`bash
${devCommands[manifest.packageManager]}
\`\`\`

${manifest.framework === "next" ? `
### Build for Production

\`\`\`bash
${manifest.packageManager === "npm" ? "npm run build" : manifest.packageManager === "yarn" ? "yarn build" : `${manifest.packageManager} build`}
\`\`\`

### Start Production Server

\`\`\`bash
${manifest.packageManager === "npm" ? "npm start" : manifest.packageManager === "yarn" ? "yarn start" : `${manifest.packageManager} start`}
\`\`\`
` : ""}

${manifest.framework === "react" ? `
### Build for Production

\`\`\`bash
${manifest.packageManager === "npm" ? "npm run build" : manifest.packageManager === "yarn" ? "yarn build" : `${manifest.packageManager} build`}
\`\`\`

### Preview Production Build

\`\`\`bash
${manifest.packageManager === "npm" ? "npm run preview" : manifest.packageManager === "yarn" ? "yarn preview" : `${manifest.packageManager} preview`}
\`\`\`
` : ""}

${manifest.prettier ? `
### Format Code

\`\`\`bash
${manifest.packageManager === "npm" ? "npm run format" : manifest.packageManager === "yarn" ? "yarn format" : `${manifest.packageManager} format`}
\`\`\`
` : ""}

## Project Structure

\`\`\`
${manifest.name}/
├── ${manifest.framework === "next" ? "app/" : "src/"}
│   ${manifest.framework === "next" ? "├── layout.tsx" : manifest.framework === "react" ? "├── App.tsx" : "├── index." + (manifest.language === "ts" ? "ts" : "js")}
│   ${manifest.styling !== "none" ? `├── ${manifest.framework === "next" ? "globals" : "index"}.${manifest.styling === "scss" || manifest.styling === "sass" ? "scss" : "css"}` : ""}
│   ${manifest.framework !== "node" ? "└── components/" : "└── lib/"}
├── package.json
${manifest.language === "ts" ? "├── tsconfig.json" : ""}
${manifest.styling === "tailwind" ? "├── postcss.config.mjs" : ""}
${manifest.lint ? "├── eslint.config.js" : ""}
${manifest.prettier ? "├── .prettierrc" : ""}
└── README.md
\`\`\`

## License

MIT

---

Generated with [StyloFront Scaffold](https://scaffold.stylofront.com)
`

    return {
        path: "README.md",
        content
    }
}
