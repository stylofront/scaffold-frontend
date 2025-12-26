"use client"

import { Framework, FRAMEWORKS } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface StepFrameworkProps {
    selected: Framework | undefined
    onSelect: (framework: Framework) => void
}

const frameworkGradients: Record<Framework, string> = {
    next: "from-black to-gray-700 dark:from-white dark:to-gray-300",
    react: "from-cyan-400 to-blue-500",
    node: "from-green-400 to-emerald-500",
    static: "from-orange-400 to-amber-500"
}

export function StepFramework({ selected, onSelect }: StepFrameworkProps) {
    return (
        <div>
            <div className="text-center sm:text-left mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Choose Your Framework
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Select the base framework for your project
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {FRAMEWORKS.map((framework, index) => (
                    <motion.div
                        key={framework.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card
                            className={cn(
                                "relative cursor-pointer transition-all duration-300 hover:shadow-lg group overflow-hidden",
                                selected === framework.id
                                    ? "border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10"
                                    : "border-border hover:border-primary/50 hover:shadow-md"
                            )}
                            onClick={() => onSelect(framework.id)}
                        >
                            {/* Selection indicator */}
                            {selected === framework.id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10"
                                >
                                    <Check className="h-4 w-4" />
                                </motion.div>
                            )}

                            {/* Gradient accent line */}
                            <div className={cn(
                                "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r transition-opacity duration-300",
                                frameworkGradients[framework.id],
                                selected === framework.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                            )} />

                            <CardContent className="p-4 sm:p-5">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={cn(
                                            "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold transition-all duration-300 shadow-lg",
                                            `bg-gradient-to-br ${frameworkGradients[framework.id]}`,
                                            framework.id === "next"
                                                ? "text-white dark:text-black"
                                                : "text-white"
                                        )}
                                    >
                                        {framework.icon}
                                    </motion.div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold font-heading text-base sm:text-lg group-hover:text-primary transition-colors">
                                            {framework.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-2">
                                            {framework.description}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
