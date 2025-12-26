import { ScaffoldManifest, GeneratedFile } from "@/lib/types"

// Using "*" for packages ensures npm/yarn/pnpm/bun installs the latest version
// Users can run `npm update` or lock versions after installation

export function generatePackageJson(manifest: ScaffoldManifest): GeneratedFile {
    const isTS = manifest.language === "ts"
    const hasTailwind = manifest.styling === "tailwind"
    const hasSass = manifest.styling === "sass" || manifest.styling === "scss"
    const hasLint = manifest.lint
    const hasPrettier = manifest.prettier

    const dependencies: Record<string, string> = {}
    const devDependencies: Record<string, string> = {}
    const scripts: Record<string, string> = {}

    switch (manifest.framework) {
        case "next":
            dependencies["next"] = "*"
            dependencies["react"] = "*"
            dependencies["react-dom"] = "*"
            scripts["dev"] = "next dev --turbopack"
            scripts["build"] = "next build"
            scripts["start"] = "next start"
            if (isTS) {
                devDependencies["typescript"] = "*"
                devDependencies["@types/node"] = "*"
                devDependencies["@types/react"] = "*"
                devDependencies["@types/react-dom"] = "*"
            }
            break

        case "react":
            dependencies["react"] = "*"
            dependencies["react-dom"] = "*"
            devDependencies["vite"] = "*"
            devDependencies["@vitejs/plugin-react"] = "*"
            scripts["dev"] = "vite"
            scripts["build"] = "vite build"
            scripts["preview"] = "vite preview"
            if (isTS) {
                devDependencies["typescript"] = "*"
                devDependencies["@types/react"] = "*"
                devDependencies["@types/react-dom"] = "*"
            }
            break

        case "node":
            scripts["dev"] = isTS ? "tsx watch src/index.ts" : "node --watch src/index.js"
            scripts["build"] = isTS ? "tsc" : "echo 'No build step for JS'"
            scripts["start"] = isTS ? "node dist/index.js" : "node src/index.js"
            if (isTS) {
                devDependencies["typescript"] = "*"
                devDependencies["tsx"] = "*"
                devDependencies["@types/node"] = "*"
            }
            break

        case "static":
            scripts["dev"] = "npx live-server src"
            scripts["build"] = "echo 'No build step for static'"
            break
    }

    // Add Tailwind v4 dependencies
    if (hasTailwind && manifest.framework !== "static") {
        devDependencies["tailwindcss"] = "*"
        devDependencies["@tailwindcss/postcss"] = "*"
    }

    // Add Sass dependencies
    if (hasSass && manifest.framework !== "static") {
        devDependencies["sass"] = "*"
    }

    // Add ESLint dependencies
    if (hasLint) {
        devDependencies["eslint"] = "*"
        scripts["lint"] = "eslint ."
        if (manifest.framework === "next") {
            devDependencies["eslint-config-next"] = "*"
        }
    }

    // Add Prettier dependencies
    if (hasPrettier) {
        devDependencies["prettier"] = "*"
        scripts["format"] = "prettier --write ."
        scripts["format:check"] = "prettier --check ."
    }

    const packageJson = {
        name: manifest.name,
        version: "0.1.0",
        private: true,
        type: "module",
        ...(manifest.description && { description: manifest.description }),
        scripts,
        dependencies: Object.keys(dependencies).length > 0 ? dependencies : undefined,
        devDependencies: Object.keys(devDependencies).length > 0 ? devDependencies : undefined,
    }

    // Clean up undefined values
    Object.keys(packageJson).forEach(key => {
        if (packageJson[key as keyof typeof packageJson] === undefined) {
            delete packageJson[key as keyof typeof packageJson]
        }
    })

    return {
        path: "package.json",
        content: JSON.stringify(packageJson, null, 2)
    }
}
