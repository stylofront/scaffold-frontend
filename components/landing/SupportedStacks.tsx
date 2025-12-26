"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const stacks = [
    {
        name: "Next.js",
        description: "Full-stack React framework with App Router",
        features: ["App Router", "TypeScript Ready", "API Routes"],
        color: "from-black to-gray-700 dark:from-white dark:to-gray-300"
    },
    {
        name: "React (Vite)",
        description: "Lightning-fast React development with Vite",
        features: ["Blazing Fast HMR", "TypeScript Ready", "Modern Build"],
        color: "from-cyan-500 to-blue-500"
    },
    {
        name: "Node.js",
        description: "Backend JavaScript/TypeScript projects",
        features: ["ES Modules", "TypeScript Ready", "Clean Structure"],
        color: "from-green-500 to-emerald-500"
    },
    {
        name: "Static Frontend",
        description: "Simple HTML/CSS/JS projects",
        features: ["No Framework", "Pure JavaScript", "Lightweight"],
        color: "from-orange-500 to-yellow-500"
    }
]

export function SupportedStacks() {
    return (
        <section id="stacks" className="py-16 sm:py-20 md:py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">
                        Supported Stacks
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                        Generate scaffolds for the most popular frontend and backend frameworks
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stacks.map((stack, index) => (
                        <motion.div
                            key={stack.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg group overflow-hidden">
                                <CardContent className="p-6 relative">
                                    {/* Gradient accent */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${stack.color}`} />

                                    <h3 className="font-bold font-heading text-xl mb-2 group-hover:text-primary transition-colors">
                                        {stack.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">{stack.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {stack.features.map((feature) => (
                                            <Badge key={feature} variant="secondary" className="text-xs">
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
