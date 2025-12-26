"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket, Zap, ArrowDown, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative overflow-hidden border-b bg-linear-to-b from-primary/5 via-primary/10 to-background dark:from-primary/10 dark:via-primary/5 dark:to-background py-16 sm:py-20 md:py-28 lg:py-32 min-h-[85vh] sm:min-h-[90vh] flex items-center">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="mx-auto max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm shadow-sm"
                    >
                        <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                        <span className="font-medium whitespace-nowrap">No Boilerplate Pain, Ever</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold font-heading tracking-tight leading-[1.1] sm:leading-[1.15]"
                    >
                        Start New Projects
                        <br className="hidden sm:block" />
                        <span className="block sm:inline"> </span>
                        <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                            Without Boilerplate Pain
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8 sm:mb-10 md:mb-12 text-base sm:text-lg md:text-xl lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-2"
                    >
                        Generate clean, modern project scaffolds in seconds.
                        <span className="block mt-2 sm:mt-1 sm:inline font-semibold text-foreground"> Client-side. Version-agnostic. Ready to code.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col items-center gap-4 sm:gap-6"
                    >
                        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                            <Button asChild size="xl" className="h-12 sm:h-14 px-8 sm:px-10 w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                                <Link href="/generate" className="flex items-center justify-center gap-2 text-sm sm:text-base">
                                    <Rocket className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                    <span>Start Generating</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="xl" className="h-12 sm:h-14 px-8 sm:px-10 w-full sm:w-auto">
                                <Link href="#how-it-works" className="flex items-center justify-center gap-2 text-sm sm:text-base">
                                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                    <span>See How It Works</span>
                                </Link>
                            </Button>
                        </div>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap justify-center gap-2 mt-4"
                        >
                            <Badge variant="secondary" className="text-xs">No Backend Required</Badge>
                            <Badge variant="secondary" className="text-xs">100% Client-side</Badge>
                            <Badge variant="secondary" className="text-xs">Free Forever</Badge>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute -bottom-14 sm:-bottom-24 left-1/2 transform -translate-x-1/2 z-10 block"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center gap-2 text-muted-foreground"
                    >
                        <span className="text-xs uppercase tracking-wider">Scroll</span>
                        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
