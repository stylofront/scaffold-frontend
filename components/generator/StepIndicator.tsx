"use client"

import { WizardStep } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Check, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface StepIndicatorProps {
    currentStep: WizardStep
}

const steps = [
    { number: 1, label: "Framework", icon: "🚀" },
    { number: 2, label: "Configure", icon: "⚙️" },
    { number: 3, label: "Details", icon: "📝" },
    { number: 4, label: "Preview", icon: "👁️" },
    { number: 5, label: "Generate", icon: "✨" }
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100

    return (
        <div className="mb-8 md:mb-12">
            {/* Progress bar background */}
            <div className="relative">
                {/* Desktop/Tablet: Horizontal stepper */}
                <div className="hidden sm:block">
                    {/* Background line */}
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />

                    {/* Animated progress line */}
                    <motion.div
                        className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary via-primary to-primary/50"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Steps */}
                    <div className="relative flex items-center justify-between">
                        {steps.map((step, index) => {
                            const isCompleted = currentStep > step.number
                            const isCurrent = currentStep === step.number
                            const isPending = currentStep < step.number

                            return (
                                <div key={step.number} className="flex flex-col items-center">
                                    {/* Step circle */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={cn(
                                            "relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2",
                                            isCompleted && "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25",
                                            isCurrent && "bg-background border-primary text-primary ring-4 ring-primary/20 shadow-xl shadow-primary/20",
                                            isPending && "bg-muted border-muted-foreground/20 text-muted-foreground"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            >
                                                <Check className="h-5 w-5" />
                                            </motion.div>
                                        ) : isCurrent ? (
                                            <motion.span
                                                initial={{ scale: 0.5 }}
                                                animate={{ scale: 1 }}
                                                className="text-lg"
                                            >
                                                {step.icon}
                                            </motion.span>
                                        ) : (
                                            <span className="text-xs">{step.number}</span>
                                        )}

                                        {/* Pulse animation for current step */}
                                        {isCurrent && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full bg-primary/20"
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}
                                    </motion.div>

                                    {/* Step label */}
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                        className={cn(
                                            "mt-3 text-xs font-medium transition-colors",
                                            isCompleted && "text-primary",
                                            isCurrent && "text-foreground font-semibold",
                                            isPending && "text-muted-foreground"
                                        )}
                                    >
                                        {step.label}
                                    </motion.span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile: Compact stepper with progress bar */}
                <div className="sm:hidden">
                    {/* Current step info */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                key={currentStep}
                                initial={{ scale: 0.5, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg shadow-lg shadow-primary/25"
                            >
                                {steps[currentStep - 1].icon}
                            </motion.div>
                            <div>
                                <motion.p
                                    key={`label-${currentStep}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-semibold text-foreground"
                                >
                                    {steps[currentStep - 1].label}
                                </motion.p>
                                <p className="text-xs text-muted-foreground">
                                    Step {currentStep} of {steps.length}
                                </p>
                            </div>
                        </div>

                        {/* Step dots */}
                        <div className="flex items-center gap-1.5">
                            {steps.map((step) => (
                                <motion.div
                                    key={step.number}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: step.number * 0.05 }}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all duration-300",
                                        currentStep > step.number && "bg-primary",
                                        currentStep === step.number && "bg-primary w-4",
                                        currentStep < step.number && "bg-muted-foreground/30"
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>

            {/* Completion celebration */}
            {currentStep === 5 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center justify-center gap-2 text-sm text-primary"
                >
                    <Sparkles className="h-4 w-4" />
                    <span>Almost there! Ready to generate your project</span>
                    <Sparkles className="h-4 w-4" />
                </motion.div>
            )}
        </div>
    )
}
