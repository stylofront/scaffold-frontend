"use client"

import { PROJECT_TEMPLATES, ProjectTemplate, ScaffoldManifest } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Loader2, Star, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { generateScaffold } from "@/lib/scaffold"
import { generateAndDownload } from "@/lib/scaffold/zip-generator"

export function TemplatesGrid() {
    const [downloadingId, setDownloadingId] = useState<string | null>(null)

    const handleDownload = async (template: ProjectTemplate) => {
        setDownloadingId(template.id)

        try {
            const manifest: ScaffoldManifest = {
                framework: template.framework,
                language: template.language,
                styling: template.styling,
                lint: template.lint,
                packageManager: template.packageManager,
                name: template.id,
                description: template.description,
                git: template.git,
                prettier: template.prettier
            }

            const files = generateScaffold(manifest)
            await generateAndDownload(files, manifest)
        } catch (error) {
            console.error("Failed to generate template:", error)
        } finally {
            setDownloadingId(null)
        }
    }

    // Separate popular templates
    const popularTemplates = PROJECT_TEMPLATES.filter(t => t.popular)
    const otherTemplates = PROJECT_TEMPLATES.filter(t => !t.popular)

    return (
        <div className="space-y-12">
            {/* Popular Templates */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <h2 className="text-xl font-bold font-heading">Popular Templates</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {popularTemplates.map((template, index) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            index={index}
                            isDownloading={downloadingId === template.id}
                            onDownload={() => handleDownload(template)}
                            featured
                        />
                    ))}
                </div>
            </section>

            {/* All Templates */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold font-heading">All Templates</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherTemplates.map((template, index) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            index={index}
                            isDownloading={downloadingId === template.id}
                            onDownload={() => handleDownload(template)}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

interface TemplateCardProps {
    template: ProjectTemplate
    index: number
    isDownloading: boolean
    onDownload: () => void
    featured?: boolean
}

function TemplateCard({ template, index, isDownloading, onDownload, featured }: TemplateCardProps) {
    const frameworkColors: Record<string, string> = {
        next: "from-black to-gray-700 dark:from-white dark:to-gray-300",
        react: "from-cyan-500 to-blue-500",
        node: "from-green-500 to-emerald-500",
        static: "from-orange-500 to-yellow-500"
    }

    const frameworkIcons: Record<string, string> = {
        next: "N",
        react: "R",
        node: "⬡",
        static: "◇"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <Card className={`h-full border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg group overflow-hidden ${featured ? 'ring-2 ring-primary/20' : ''}`}>
                <CardContent className="p-6 relative">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${frameworkColors[template.framework]}`} />

                    {/* Popular badge */}
                    {template.popular && (
                        <Badge className="absolute top-3 right-3 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Popular
                        </Badge>
                    )}

                    <div className="flex items-start gap-4">
                        <div
                            className={`w-12 h-12 rounded-lg bg-linear-to-br ${frameworkColors[template.framework]} flex items-center justify-center text-xl font-bold text-white dark:text-black shrink-0`}
                        >
                            {frameworkIcons[template.framework]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold font-heading text-lg group-hover:text-primary transition-colors truncate pr-8">
                                {template.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {template.description}
                            </p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {template.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                        {template.tags.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                                +{template.tags.length - 4}
                            </Badge>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                    <Button
                        onClick={onDownload}
                        disabled={isDownloading}
                        className="w-full gap-2"
                        variant={featured ? "default" : "outline"}
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Download className="h-4 w-4" />
                                Download Template
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
