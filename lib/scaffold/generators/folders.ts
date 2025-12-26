import { ScaffoldManifest, GeneratedFile } from "@/lib/types"

export function generateFolderStructure(manifest: ScaffoldManifest): GeneratedFile[] {
  const files: GeneratedFile[] = []
  const ext = manifest.language === "ts" ? "ts" : "js"
  const jsxExt = manifest.language === "ts" ? "tsx" : "jsx"

  switch (manifest.framework) {
    case "next":
      // App directory structure
      files.push({
        path: `app/layout.${jsxExt}`,
        content: generateNextLayout(manifest)
      })
      files.push({
        path: `app/page.${jsxExt}`,
        content: generateNextPage()
      })
      // Components folder
      files.push({
        path: `components/.gitkeep`,
        content: ""
      })
      // Lib folder
      files.push({
        path: `lib/.gitkeep`,
        content: ""
      })
      break

    case "react":
      // Vite config
      files.push({
        path: `vite.config.${ext}`,
        content: generateViteConfig(manifest)
      })
      // Index HTML
      files.push({
        path: "index.html",
        content: generateIndexHtml(manifest)
      })
      // Main entry
      files.push({
        path: `src/main.${jsxExt}`,
        content: generateReactMain(manifest)
      })
      // App component
      files.push({
        path: `src/App.${jsxExt}`,
        content: generateReactApp(manifest)
      })
      // Components folder
      files.push({
        path: `src/components/.gitkeep`,
        content: ""
      })
      // Lib folder
      files.push({
        path: `src/lib/.gitkeep`,
        content: ""
      })
      break

    case "node":
      // Main entry
      files.push({
        path: `src/index.${ext}`,
        content: generateNodeIndex(manifest)
      })
      // Lib folder
      files.push({
        path: `src/lib/.gitkeep`,
        content: ""
      })
      break

    case "static":
      // Index HTML
      files.push({
        path: "src/index.html",
        content: generateStaticHtml(manifest)
      })
      // Main JS
      files.push({
        path: "src/main.js",
        content: generateStaticJs()
      })
      // Styles
      files.push({
        path: "src/styles.css",
        content: generateStaticCss()
      })
      break
  }

  return files
}

function generateNextLayout(manifest: ScaffoldManifest): string {
  const hasStyles = manifest.styling !== "none"
  const styleExt = manifest.styling === "scss" || manifest.styling === "sass" ? "scss" : "css"

  return `${hasStyles ? `import './globals.${styleExt}'\n` : ""}import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${manifest.name}',
  description: '${manifest.description || "Generated with StyloFront Scaffold"}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`
}

function generateNextPage(): string {
  return `export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-gray-600">Generated with StyloFront Scaffold</p>
      </div>
    </main>
  )
}
`
}

function generateViteConfig(manifest: ScaffoldManifest): string {
  const isTS = manifest.language === "ts"

  return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
${isTS ? "import { resolve } from 'path'" : ""}

export default defineConfig({
  plugins: [react()],
  ${isTS ? `resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },` : ""}
})
`
}

function generateIndexHtml(manifest: ScaffoldManifest): string {
  const jsxExt = manifest.language === "ts" ? "tsx" : "jsx"

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${manifest.name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.${jsxExt}"></script>
  </body>
</html>
`
}

function generateReactMain(manifest: ScaffoldManifest): string {
  const hasStyles = manifest.styling !== "none"
  const styleExt = manifest.styling === "scss" || manifest.styling === "sass" ? "scss" : "css"

  return `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
${hasStyles ? `import './index.${styleExt}'` : ""}

ReactDOM.createRoot(document.getElementById('root')${manifest.language === "ts" ? "!" : ""}).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`
}

function generateReactApp(manifest: ScaffoldManifest): string {
  return `${manifest.language === "ts" ? "function App(): JSX.Element" : "function App()"} {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to ${manifest.name}</h1>
        <p className="text-gray-600">Generated with StyloFront Scaffold</p>
      </div>
    </div>
  )
}

export default App
`
}

function generateNodeIndex(manifest: ScaffoldManifest): string {
  return `${manifest.language === "ts" ? "// TypeScript Node.js entry point\n" : ""}console.log("Hello from ${manifest.name}!")

// Your application code goes here
`
}

function generateStaticHtml(manifest: ScaffoldManifest): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${manifest.name}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="container">
    <h1>Welcome to ${manifest.name}</h1>
    <p>Generated with StyloFront Scaffold</p>
  </main>
  <script src="main.js"></script>
</body>
</html>
`
}

function generateStaticJs(): string {
  return `// Your JavaScript code goes here
console.log('App loaded!')
`
}

function generateStaticCss(): string {
  return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #666;
}
`
}
