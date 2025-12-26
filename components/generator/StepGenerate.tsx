"use client"

import { ScaffoldManifest, FRAMEWORKS } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, Loader2, Sparkles, CheckCircle2, Terminal } from "lucide-react"
import { motion } from "framer-motion"

interface StepGenerateProps {
    manifest: Partial<ScaffoldManifest>
    isGenerating: boolean
    onGenerate: () => void
    onReset: () => void
}

export function StepGenerate({
    manifest,
    isGenerating,
    onGenerate,
    onReset
}: StepGenerateProps) {
    const framework = FRAMEWORKS.find(f => f.id === manifest.framework)

    const frameworkGradients: Record<string, string> = {
        next: "from-black to-gray-700 dark:from-white dark:to-gray-300",
        react: "from-cyan-400 to-blue-500",
        node: "from-green-400 to-emerald-500",
        static: "from-orange-400 to-amber-500"
    }

    const stylingNames: Record<string, string> = {
        tailwind: "Tailwind v4",
        css: "CSS",
        scss: "SCSS",
        sass: "Sass",
        none: "None"
    }

    return (
        <div>
            <div className="text-center mb-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
                >
                    <Sparkles className="h-8 w-8 text-primary" />
                </motion.div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Ready to Generate!
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Review your configuration and download your scaffold
                </p>
            </div>

            {/* Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 sm:p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
            >
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg bg-gradient-to-br ${frameworkGradients[manifest.framework || "next"]} ${manifest.framework === "next" ? "dark:text-black" : ""}`}>
                        {framework?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg sm:text-xl truncate">{manifest.name}</h3>
                        {manifest.description && (
                            <p className="text-sm text-muted-foreground truncate">{manifest.description}</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                        {framework?.name}
                    </Badge>
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                        {manifest.language === "ts" ? "TypeScript" : "JavaScript"}
                    </Badge>
                    {manifest.styling !== "none" && (
                        <Badge variant="secondary" className="text-xs sm:text-sm">
                            {stylingNames[manifest.styling || "none"]}
                        </Badge>
                    )}
                    {manifest.lint && (
                        <Badge variant="secondary" className="text-xs sm:text-sm">ESLint</Badge>
                    )}
                    {manifest.prettier && (
                        <Badge variant="secondary" className="text-xs sm:text-sm">Prettier</Badge>
                    )}
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                        {manifest.packageManager}
                    </Badge>
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
                <Button
                    size="lg"
                    className="h-12 sm:h-14 px-6 sm:px-10 text-base sm:text-lg gap-3 shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 order-1"
                    onClick={onGenerate}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Download className="h-5 w-5" />
                            Download ZIP
                        </>
                    )}
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    className="h-12 sm:h-14 px-6 sm:px-8 text-base gap-2 order-2"
                    onClick={onReset}
                    disabled={isGenerating}
                >
                    <RefreshCw className="h-4 w-4" />
                    Start Over
                </Button>
            </motion.div>

            {/* Next Steps */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 sm:mt-8 p-4 rounded-xl bg-muted/30 border"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Terminal className="h-4 w-4 text-primary" />
                    <p className="font-medium text-sm">After Download</p>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-muted-foreground font-mono">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>unzip <span className="text-foreground">{manifest.name}-scaffold.zip</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>cd <span className="text-foreground">{manifest.name}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span><span className="text-foreground">{manifest.packageManager} install</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span><span className="text-foreground">{manifest.packageManager === "npm" ? "npm run dev" : `${manifest.packageManager} dev`}</span></span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
