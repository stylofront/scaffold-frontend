"use client"

import { useScaffold } from "@/hooks/use-scaffold"
import { StepIndicator } from "./StepIndicator"
import { StepFramework } from "./StepFramework"
import { StepConfiguration } from "./StepConfiguration"
import { StepProjectInfo } from "./StepProjectInfo"
import { StepPreview } from "./StepPreview"
import { StepGenerate } from "./StepGenerate"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"

export function Wizard() {
    const {
        step,
        manifest,
        isGenerating,
        error,
        fileTree,
        canProceed,
        updateManifest,
        nextStep,
        prevStep,
        generatePreview,
        generateAndDownloadZip,
        reset
    } = useScaffold()

    // Generate preview when entering step 4
    useEffect(() => {
        if (step === 4) {
            generatePreview()
        }
    }, [step, generatePreview])

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <StepFramework
                        selected={manifest.framework}
                        onSelect={(framework) => updateManifest("framework", framework)}
                    />
                )
            case 2:
                return (
                    <StepConfiguration
                        manifest={manifest}
                        onUpdate={updateManifest}
                    />
                )
            case 3:
                return (
                    <StepProjectInfo
                        name={manifest.name || ""}
                        description={manifest.description || ""}
                        onNameChange={(name) => updateManifest("name", name)}
                        onDescriptionChange={(desc) => updateManifest("description", desc)}
                    />
                )
            case 4:
                return (
                    <StepPreview fileTree={fileTree} />
                )
            case 5:
                return (
                    <StepGenerate
                        manifest={manifest}
                        isGenerating={isGenerating}
                        onGenerate={generateAndDownloadZip}
                        onReset={reset}
                    />
                )
            default:
                return null
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Glassmorphism card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border border-primary/10 bg-background/80 backdrop-blur-xl shadow-2xl shadow-primary/5"
            >
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

                {/* Glow effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
                    {/* Step Indicator */}
                    <StepIndicator currentStep={step} />

                    {/* Error message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Step Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="min-h-[320px] sm:min-h-[360px] md:min-h-[400px]"
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-border/50"
                    >
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={step === 1}
                            className="w-full sm:w-auto gap-2 h-11 px-6 text-base order-2 sm:order-1"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </Button>

                        {step < 5 && (
                            <Button
                                onClick={nextStep}
                                disabled={!canProceed}
                                className={`
                  w-full sm:w-auto gap-2 h-11 px-8 text-base font-medium order-1 sm:order-2
                  ${canProceed
                                        ? 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 hover:shadow-primary/30'
                                        : ''
                                    }
                `}
                            >
                                {step === 4 ? (
                                    <>
                                        <Sparkles className="h-4 w-4" />
                                        Continue to Generate
                                    </>
                                ) : (
                                    <>
                                        Next Step
                                        <ChevronRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
