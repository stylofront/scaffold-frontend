export type Framework = "next" | "react" | "node" | "static"
export type Language = "js" | "ts"
export type Styling = "none" | "css" | "scss" | "sass" | "tailwind"
export type PackageManager = "npm" | "pnpm" | "bun" | "yarn"

export interface ScaffoldManifest {
    framework: Framework
    language: Language
    styling: Styling
    lint: boolean
    packageManager: PackageManager
    name: string
    description?: string
    // Additional options
    git: boolean
    prettier: boolean
}

export interface FileNode {
    name: string
    type: "file" | "folder"
    children?: FileNode[]
    content?: string
}

export interface GeneratedFile {
    path: string
    content: string
}

// Wizard step types
export type WizardStep = 1 | 2 | 3 | 4 | 5

export interface WizardState {
    step: WizardStep
    manifest: Partial<ScaffoldManifest>
    isGenerating: boolean
    error: string | null
}

// Framework display info
export interface FrameworkInfo {
    id: Framework
    name: string
    description: string
    icon: string
}

export const FRAMEWORKS: FrameworkInfo[] = [
    {
        id: "next",
        name: "Next.js",
        description: "Full-stack React framework with App Router",
        icon: "N"
    },
    {
        id: "react",
        name: "React (Vite)",
        description: "Lightning-fast React with Vite bundler",
        icon: "R"
    },
    {
        id: "node",
        name: "Node.js",
        description: "Backend JavaScript/TypeScript project",
        icon: "⬡"
    },
    {
        id: "static",
        name: "Static Frontend",
        description: "Simple HTML/CSS/JS project",
        icon: "◇"
    }
]

// Template types for pre-built templates page
export interface ProjectTemplate {
    id: string
    name: string
    description: string
    framework: Framework
    language: Language
    styling: Styling
    lint: boolean
    packageManager: PackageManager
    git: boolean
    prettier: boolean
    tags: string[]
    popular?: boolean
}

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
    {
        id: "next-ts-tailwind",
        name: "Next.js + TypeScript + Tailwind",
        description: "Production-ready Next.js starter with TypeScript and Tailwind CSS",
        framework: "next",
        language: "ts",
        styling: "tailwind",
        lint: true,
        packageManager: "npm",
        git: true,
        prettier: true,
        tags: ["React", "TypeScript", "Tailwind", "ESLint", "Prettier"],
        popular: true
    },
    {
        id: "next-js-minimal",
        name: "Next.js Minimal",
        description: "Lightweight Next.js project with JavaScript, no extras",
        framework: "next",
        language: "js",
        styling: "css",
        lint: false,
        packageManager: "npm",
        git: true,
        prettier: false,
        tags: ["React", "JavaScript", "Minimal"]
    },
    {
        id: "react-vite-ts",
        name: "React + Vite + TypeScript",
        description: "Fast React development with Vite and TypeScript",
        framework: "react",
        language: "ts",
        styling: "tailwind",
        lint: true,
        packageManager: "pnpm",
        git: true,
        prettier: true,
        tags: ["React", "Vite", "TypeScript", "Tailwind"],
        popular: true
    },
    {
        id: "react-vite-sass",
        name: "React + Vite + SCSS",
        description: "React with Vite bundler and SCSS styling",
        framework: "react",
        language: "ts",
        styling: "scss",
        lint: true,
        packageManager: "npm",
        git: true,
        prettier: true,
        tags: ["React", "Vite", "SCSS", "TypeScript"]
    },
    {
        id: "node-ts-api",
        name: "Node.js TypeScript API",
        description: "Backend Node.js project with TypeScript",
        framework: "node",
        language: "ts",
        styling: "none",
        lint: true,
        packageManager: "npm",
        git: true,
        prettier: true,
        tags: ["Node.js", "TypeScript", "Backend", "API"]
    },
    {
        id: "node-js-minimal",
        name: "Node.js Minimal",
        description: "Simple Node.js project with JavaScript",
        framework: "node",
        language: "js",
        styling: "none",
        lint: false,
        packageManager: "npm",
        git: true,
        prettier: false,
        tags: ["Node.js", "JavaScript", "Minimal"]
    },
    {
        id: "static-landing",
        name: "Static Landing Page",
        description: "Simple HTML/CSS/JS landing page",
        framework: "static",
        language: "js",
        styling: "css",
        lint: false,
        packageManager: "npm",
        git: true,
        prettier: false,
        tags: ["HTML", "CSS", "JavaScript", "Landing Page"]
    },
    {
        id: "static-tailwind",
        name: "Static + Tailwind (CDN)",
        description: "Static HTML with Tailwind CSS via CDN",
        framework: "static",
        language: "js",
        styling: "tailwind",
        lint: false,
        packageManager: "npm",
        git: true,
        prettier: false,
        tags: ["HTML", "Tailwind", "CDN"]
    }
]
