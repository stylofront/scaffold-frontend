import { ScaffoldManifest, GeneratedFile } from "@/lib/types"

export function generateTsConfig(manifest: ScaffoldManifest): GeneratedFile | null {
    if (manifest.language !== "ts") {
        return null
    }

    let config: Record<string, unknown>

    switch (manifest.framework) {
        case "next":
            config = {
                compilerOptions: {
                    target: "ES2017",
                    lib: ["dom", "dom.iterable", "esnext"],
                    allowJs: true,
                    skipLibCheck: true,
                    strict: true,
                    noEmit: true,
                    esModuleInterop: true,
                    module: "esnext",
                    moduleResolution: "bundler",
                    resolveJsonModule: true,
                    isolatedModules: true,
                    jsx: "preserve",
                    incremental: true,
                    plugins: [{ name: "next" }],
                    paths: {
                        "@/*": ["./*"]
                    }
                },
                include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
                exclude: ["node_modules"]
            }
            break

        case "react":
            config = {
                compilerOptions: {
                    target: "ES2020",
                    useDefineForClassFields: true,
                    lib: ["ES2020", "DOM", "DOM.Iterable"],
                    module: "ESNext",
                    skipLibCheck: true,
                    moduleResolution: "bundler",
                    allowImportingTsExtensions: true,
                    resolveJsonModule: true,
                    isolatedModules: true,
                    noEmit: true,
                    jsx: "react-jsx",
                    strict: true,
                    noUnusedLocals: true,
                    noUnusedParameters: true,
                    noFallthroughCasesInSwitch: true,
                    paths: {
                        "@/*": ["./src/*"]
                    }
                },
                include: ["src"],
                references: [{ path: "./tsconfig.node.json" }]
            }
            break

        case "node":
            config = {
                compilerOptions: {
                    target: "ES2022",
                    module: "NodeNext",
                    moduleResolution: "NodeNext",
                    outDir: "./dist",
                    rootDir: "./src",
                    strict: true,
                    esModuleInterop: true,
                    skipLibCheck: true,
                    forceConsistentCasingInFileNames: true,
                    resolveJsonModule: true,
                    declaration: true,
                    declarationMap: true,
                    sourceMap: true
                },
                include: ["src/**/*"],
                exclude: ["node_modules", "dist"]
            }
            break

        default:
            return null
    }

    return {
        path: "tsconfig.json",
        content: JSON.stringify(config, null, 2)
    }
}

export function generateTsConfigNode(manifest: ScaffoldManifest): GeneratedFile | null {
    if (manifest.language !== "ts" || manifest.framework !== "react") {
        return null
    }

    const config = {
        compilerOptions: {
            composite: true,
            skipLibCheck: true,
            module: "ESNext",
            moduleResolution: "bundler",
            allowSyntheticDefaultImports: true,
            strict: true
        },
        include: ["vite.config.ts"]
    }

    return {
        path: "tsconfig.node.json",
        content: JSON.stringify(config, null, 2)
    }
}
