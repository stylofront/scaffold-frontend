"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Zap, Download, FileCode, Settings } from "lucide-react"
import { motion } from "framer-motion"

const features = [
    {
        icon: FileCode,
        title: "Smart Configuration",
        description: "Choose your framework, language, styling, and linting preferences with an intuitive wizard interface."
    },
    {
        icon: Settings,
        title: "Zero Dependency Lock",
        description: "No pinned versions. Your project installs the latest stable packages when you run npm install."
    },
    {
        icon: Zap,
        title: "Instant Generation",
        description: "Everything happens in your browser. No server calls, no waiting. Generate and download in milliseconds."
    },
    {
        icon: Download,
        title: "Ready to Code",
        description: "Download a clean ZIP file with all configs ready. Just extract, install dependencies, and start coding."
    }
]

export function Features() {
    return (
        <section id="features" className="py-16 sm:py-20 md:py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">
                        What This Tool Does
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                        Generate project scaffolds without the hassle of setting up configs manually.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors bg-card/50 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold font-heading text-lg mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
