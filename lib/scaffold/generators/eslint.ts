import { ScaffoldManifest, GeneratedFile } from "@/lib/types"

export function generateEslintConfig(manifest: ScaffoldManifest): GeneratedFile | null {
    if (!manifest.lint) {
        return null
    }

    let config: string

    switch (manifest.framework) {
        case "next":
            config = `import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
`
            break

        case "react":
            config = `import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
${manifest.language === "ts" ? "import tseslint from 'typescript-eslint'" : ""}

export default ${manifest.language === "ts" ? "tseslint.config(" : "["}
  { ignores: ['dist'] },
  {
    ${manifest.language === "ts" ? "extends: [js.configs.recommended, ...tseslint.configs.recommended]," : "extends: [js.configs.recommended],"}
    files: ['**/*.{${manifest.language === "ts" ? "ts,tsx" : "js,jsx"}}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
${manifest.language === "ts" ? ")" : "]"}
`
            break

        case "node":
            config = `import js from '@eslint/js'
${manifest.language === "ts" ? "import tseslint from 'typescript-eslint'" : ""}

export default ${manifest.language === "ts" ? "tseslint.config(" : "["}
  { ignores: ['dist', 'node_modules'] },
  {
    ${manifest.language === "ts" ? "extends: [js.configs.recommended, ...tseslint.configs.recommended]," : "extends: [js.configs.recommended],"}
    files: ['**/*.${manifest.language === "ts" ? "ts" : "js"}'],
    rules: {
      // Add your custom rules here
    },
  },
${manifest.language === "ts" ? ")" : "]"}
`
            break

        default:
            config = `export default [
  {
    ignores: ['node_modules'],
    rules: {
      // Add your custom rules here
    },
  },
]
`
    }

    return {
        path: "eslint.config.js",
        content: config
    }
}
