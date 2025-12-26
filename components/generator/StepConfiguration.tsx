"use client"

import { ScaffoldManifest, Language, Styling, PackageManager } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StepConfigurationProps {
    manifest: Partial<ScaffoldManifest>
    onUpdate: <K extends keyof ScaffoldManifest>(key: K, value: ScaffoldManifest[K]) => void
}

export function StepConfiguration({ manifest, onUpdate }: StepConfigurationProps) {
    return (
        <div>
            <div className="text-center sm:text-left mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Configure Your Project
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Customize your project settings
                </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
                {/* Language */}
                <ConfigSection title="Language" delay={0}>
                    <RadioGroup
                        value={manifest.language}
                        onValueChange={(value) => onUpdate("language", value as Language)}
                        className="grid grid-cols-2 gap-2 sm:gap-3"
                    >
                        <OptionCard
                            value="ts"
                            selected={manifest.language === "ts"}
                            title="TypeScript"
                            description="Type-safe"
                            icon="TS"
                            gradient="from-blue-500 to-blue-600"
                        />
                        <OptionCard
                            value="js"
                            selected={manifest.language === "js"}
                            title="JavaScript"
                            description="Classic"
                            icon="JS"
                            gradient="from-yellow-400 to-yellow-500"
                        />
                    </RadioGroup>
                </ConfigSection>

                {/* Styling */}
                <ConfigSection title="Styling" delay={0.1}>
                    <RadioGroup
                        value={manifest.styling}
                        onValueChange={(value) => onUpdate("styling", value as Styling)}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3"
                    >
                        <OptionCard
                            value="tailwind"
                            selected={manifest.styling === "tailwind"}
                            title="Tailwind"
                            description="v4"
                            icon="🎨"
                            gradient="from-cyan-400 to-teal-500"
                        />
                        <OptionCard
                            value="css"
                            selected={manifest.styling === "css"}
                            title="CSS"
                            description="Variables"
                            icon="🎯"
                            gradient="from-blue-400 to-indigo-500"
                        />
                        <OptionCard
                            value="scss"
                            selected={manifest.styling === "scss"}
                            title="SCSS"
                            description="Sass"
                            icon="💅"
                            gradient="from-pink-400 to-rose-500"
                        />
                        <OptionCard
                            value="sass"
                            selected={manifest.styling === "sass"}
                            title="Sass"
                            description="Indent"
                            icon="✨"
                            gradient="from-pink-500 to-fuchsia-500"
                        />
                        <OptionCard
                            value="none"
                            selected={manifest.styling === "none"}
                            title="None"
                            description="Minimal"
                            icon="○"
                            gradient="from-gray-400 to-gray-500"
                        />
                    </RadioGroup>
                </ConfigSection>

                {/* Package Manager */}
                <ConfigSection title="Package Manager" delay={0.2}>
                    <RadioGroup
                        value={manifest.packageManager}
                        onValueChange={(value) => onUpdate("packageManager", value as PackageManager)}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
                    >
                        <OptionCard
                            value="npm"
                            selected={manifest.packageManager === "npm"}
                            title="npm"
                            description="Default"
                            icon="📦"
                            gradient="from-red-400 to-red-500"
                        />
                        <OptionCard
                            value="yarn"
                            selected={manifest.packageManager === "yarn"}
                            title="yarn"
                            description="Classic"
                            icon="🧶"
                            gradient="from-blue-400 to-blue-500"
                        />
                        <OptionCard
                            value="pnpm"
                            selected={manifest.packageManager === "pnpm"}
                            title="pnpm"
                            description="Efficient"
                            icon="⚡"
                            gradient="from-orange-400 to-amber-500"
                        />
                        <OptionCard
                            value="bun"
                            selected={manifest.packageManager === "bun"}
                            title="bun"
                            description="Fast"
                            icon="🥟"
                            gradient="from-amber-400 to-yellow-500"
                        />
                    </RadioGroup>
                </ConfigSection>

                {/* Tools */}
                <ConfigSection title="Developer Tools" delay={0.3}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                        <ToggleCard
                            active={manifest.lint === true}
                            onClick={() => onUpdate("lint", !manifest.lint)}
                            title="ESLint"
                            description="Linting"
                            icon="🔍"
                        />
                        <ToggleCard
                            active={manifest.prettier === true}
                            onClick={() => onUpdate("prettier", !manifest.prettier)}
                            title="Prettier"
                            description="Formatting"
                            icon="✨"
                        />
                        <ToggleCard
                            active={manifest.git === true}
                            onClick={() => onUpdate("git", !manifest.git)}
                            title="Git"
                            description=".gitignore"
                            icon="📁"
                        />
                        <div className="flex items-center justify-center p-3 text-xs text-muted-foreground bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
                            More soon...
                        </div>
                    </div>
                </ConfigSection>
            </div>
        </div>
    )
}

interface ConfigSectionProps {
    title: string
    delay: number
    children: React.ReactNode
}

function ConfigSection({ title, delay, children }: ConfigSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <Label className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 block text-foreground">
                {title}
            </Label>
            {children}
        </motion.div>
    )
}

interface OptionCardProps {
    value: string
    selected: boolean
    title: string
    description: string
    icon: string
    gradient: string
}

function OptionCard({ value, selected, title, description, icon, gradient }: OptionCardProps) {
    return (
        <Label
            htmlFor={value}
            className={cn(
                "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border cursor-pointer transition-all duration-200",
                selected
                    ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
            )}
        >
            <RadioGroupItem value={value} id={value} className="sr-only" />
            <div className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-sm sm:text-base font-bold text-white bg-gradient-to-br shrink-0",
                gradient
            )}>
                {icon}
            </div>
            <div className="min-w-0">
                <div className="font-medium text-sm sm:text-base truncate">{title}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground truncate">{description}</div>
            </div>
        </Label>
    )
}

interface ToggleCardProps {
    active: boolean
    onClick: () => void
    title: string
    description: string
    icon: string
}

function ToggleCard({ active, onClick, title, description, icon }: ToggleCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border transition-all duration-200 text-left",
                active
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
            )}
        >
            <div className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-lg shrink-0 transition-colors",
                active ? "bg-primary/10" : "bg-muted"
            )}>
                {icon}
            </div>
            <div className="min-w-0">
                <div className="font-medium text-sm sm:text-base truncate">{title}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground truncate">{description}</div>
            </div>
        </button>
    )
}
