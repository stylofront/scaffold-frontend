"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Sparkles, Info } from "lucide-react"

interface StepProjectInfoProps {
    name: string
    description: string
    onNameChange: (name: string) => void
    onDescriptionChange: (description: string) => void
}

export function StepProjectInfo({
    name,
    description,
    onNameChange,
    onDescriptionChange
}: StepProjectInfoProps) {
    // Sanitize project name (lowercase, no spaces, valid npm name)
    const handleNameChange = (value: string) => {
        const sanitized = value
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-_]/g, "")
        onNameChange(sanitized)
    }

    const isValidName = name.length > 0 && name.length <= 214

    return (
        <div>
            <div className="text-center sm:text-left mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Name Your Project
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Give your project a name and optional description
                </p>
            </div>

            <div className="space-y-6 max-w-lg mx-auto sm:mx-0">
                {/* Project Name */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                >
                    <Label htmlFor="project-name" className="text-sm sm:text-base font-semibold flex items-center gap-2">
                        Project Name
                        <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative mt-2">
                        <Input
                            id="project-name"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="my-awesome-project"
                            className={`h-12 text-base pl-4 pr-12 transition-all ${isValidName
                                    ? 'border-primary/50 focus:ring-primary/20'
                                    : name.length > 0
                                        ? 'border-destructive/50'
                                        : ''
                                }`}
                            autoComplete="off"
                            spellCheck={false}
                        />
                        {isValidName && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <Sparkles className="h-5 w-5 text-primary" />
                            </motion.div>
                        )}
                    </div>
                    <div className="flex items-start gap-1.5 mt-2">
                        <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground">
                            Lowercase letters, numbers, hyphens, and underscores only. This will be your folder name.
                        </p>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Label htmlFor="project-description" className="text-sm sm:text-base font-semibold flex items-center gap-2">
                        Description
                        <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                    </Label>
                    <Textarea
                        id="project-description"
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        placeholder="A brief description of your project..."
                        className="mt-2 min-h-[100px] text-base resize-none"
                    />
                </motion.div>

                {/* Preview */}
                {name && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl bg-muted/50 border border-border"
                    >
                        <p className="text-xs text-muted-foreground mb-2">Preview</p>
                        <div className="font-mono text-sm">
                            <span className="text-muted-foreground">~/projects/</span>
                            <span className="text-primary font-medium">{name}</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
