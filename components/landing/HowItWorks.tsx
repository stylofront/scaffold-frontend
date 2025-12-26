"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const steps = [
    {
        number: "01",
        title: "Choose Framework",
        description: "Select from Next.js, React (Vite), Node.js, or Static Frontend"
    },
    {
        number: "02",
        title: "Configure Options",
        description: "Pick language, styling, linting, and package manager preferences"
    },
    {
        number: "03",
        title: "Name Your Project",
        description: "Give your project a name and optional description"
    },
    {
        number: "04",
        title: "Download & Code",
        description: "Preview the structure, download the ZIP, and start building"
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-16 sm:py-20 md:py-24 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">
                        How It Works
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                        Four simple steps to generate your perfect project scaffold
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            <Card className="h-full border-primary/10 bg-background">
                                <CardContent className="p-6">
                                    <div className="text-5xl font-bold text-primary/20 font-heading mb-4">
                                        {step.number}
                                    </div>
                                    <h3 className="font-semibold font-heading text-lg mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </CardContent>
                            </Card>

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
