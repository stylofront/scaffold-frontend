"use client"

import { useState, useCallback, useMemo } from "react"
import { ScaffoldManifest, WizardStep, Framework, Language, Styling, PackageManager, GeneratedFile, FileNode } from "@/lib/types"
import { generateScaffold, filesToTree } from "@/lib/scaffold"
import { generateAndDownload } from "@/lib/scaffold/zip-generator"

const initialManifest: Partial<ScaffoldManifest> = {
    framework: undefined,
    language: "ts",
    styling: "tailwind",
    lint: true,
    packageManager: "npm",
    name: "",
    description: "",
    git: true,
    prettier: true
}

export function useScaffold() {
    const [step, setStep] = useState<WizardStep>(1)
    const [manifest, setManifest] = useState<Partial<ScaffoldManifest>>(initialManifest)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([])

    // Update manifest fields
    const updateManifest = useCallback(<K extends keyof ScaffoldManifest>(
        key: K,
        value: ScaffoldManifest[K]
    ) => {
        setManifest(prev => ({ ...prev, [key]: value }))
        setError(null)
    }, [])

    // Set entire manifest (for templates)
    const setFullManifest = useCallback((newManifest: Partial<ScaffoldManifest>) => {
        setManifest(newManifest)
        setError(null)
    }, [])

    // Navigation
    const nextStep = useCallback(() => {
        setStep(prev => Math.min(prev + 1, 5) as WizardStep)
    }, [])

    const prevStep = useCallback(() => {
        setStep(prev => Math.max(prev - 1, 1) as WizardStep)
    }, [])

    const goToStep = useCallback((newStep: WizardStep) => {
        setStep(newStep)
    }, [])

    // Validation
    const canProceed = useMemo(() => {
        switch (step) {
            case 1:
                return !!manifest.framework
            case 2:
                return !!manifest.language && manifest.styling !== undefined && !!manifest.packageManager
            case 3:
                return !!manifest.name && manifest.name.trim().length > 0
            case 4:
                return true
            case 5:
                return true
            default:
                return false
        }
    }, [step, manifest])

    // Generate preview files when reaching step 4
    const generatePreview = useCallback(() => {
        if (!manifest.framework || !manifest.language || !manifest.name) {
            return
        }

        try {
            const fullManifest = manifest as ScaffoldManifest
            const files = generateScaffold(fullManifest)
            setGeneratedFiles(files)
        } catch (err) {
            setError("Failed to generate preview")
            console.error(err)
        }
    }, [manifest])

    // File tree for preview
    const fileTree = useMemo((): FileNode[] => {
        if (generatedFiles.length === 0) return []
        return filesToTree(generatedFiles)
    }, [generatedFiles])

    // Generate and download
    const generateAndDownloadZip = useCallback(async () => {
        if (!manifest.framework || !manifest.language || !manifest.name) {
            setError("Please complete all required fields")
            return
        }

        setIsGenerating(true)
        setError(null)

        try {
            const fullManifest = manifest as ScaffoldManifest
            const files = generateScaffold(fullManifest)
            await generateAndDownload(files, fullManifest)
        } catch (err) {
            setError("Failed to generate ZIP file")
            console.error(err)
        } finally {
            setIsGenerating(false)
        }
    }, [manifest])

    // Reset wizard
    const reset = useCallback(() => {
        setStep(1)
        setManifest(initialManifest)
        setGeneratedFiles([])
        setError(null)
        setIsGenerating(false)
    }, [])

    return {
        step,
        manifest,
        isGenerating,
        error,
        generatedFiles,
        fileTree,
        canProceed,
        updateManifest,
        setFullManifest,
        nextStep,
        prevStep,
        goToStep,
        generatePreview,
        generateAndDownloadZip,
        reset
    }
}
