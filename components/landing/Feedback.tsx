"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Bug, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function Feedback() {
    const [formType, setFormType] = useState<"feedback" | "bug" | "suggestion">("feedback")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim() || !email.trim() || !message.trim()) {
            return
        }

        setIsSubmitting(true)
        setSubmitStatus("idle")

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "b3673d69-0a75-4567-8d2d-50786ba24382",
                    subject: `StyloFront Scaffold - ${formType === "feedback" ? "Feedback" : formType === "bug" ? "Bug Report" : "Feature Suggestion"}`,
                    name,
                    email,
                    message,
                    type: formType,
                    from_name: "StyloFront Scaffold Generator",
                }),
            })

            const result = await response.json()

            if (result.success) {
                setSubmitStatus("success")
                setName("")
                setEmail("")
                setMessage("")
                setTimeout(() => setSubmitStatus("idle"), 5000)
            } else {
                setSubmitStatus("error")
            }
        } catch (error) {
            console.error("Form submission error:", error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    const formTypes = [
        { id: "feedback" as const, label: "Feedback", icon: MessageSquare, gradient: "from-blue-500 to-cyan-500" },
        { id: "bug" as const, label: "Bug Report", icon: Bug, gradient: "from-red-500 to-orange-500" },
        { id: "suggestion" as const, label: "Suggestion", icon: Sparkles, gradient: "from-purple-500 to-pink-500" },
    ]

    return (
        <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden" id="feedback">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8 sm:mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">We&apos;d Love to Hear From You</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-3">
                        <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Share Your Thoughts
                        </span>
                    </h2>

                    <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                        Help us improve the scaffold generator with your valuable feedback
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative"
                >
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl opacity-50" />

                    <div className="relative bg-background/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 sm:p-8 shadow-2xl">
                        {submitStatus === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center"
                                >
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                                <p className="text-muted-foreground text-sm">
                                    Your message has been sent successfully. We&apos;ll get back to you soon!
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Type Selector */}
                                <div>
                                    <Label className="text-sm font-semibold mb-3 block">What would you like to share?</Label>
                                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                        {formTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setFormType(type.id)}
                                                className={`relative flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${formType === type.id
                                                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${type.gradient}`}>
                                                    <type.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </div>
                                                <span className="text-xs sm:text-sm font-medium">{type.label}</span>
                                                {formType === type.id && (
                                                    <motion.div
                                                        layoutId="activeType"
                                                        className="absolute inset-0 border-2 border-primary rounded-xl"
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Name & Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="feedback-name" className="text-sm font-semibold mb-2 block">
                                            Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="feedback-name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="feedback-email" className="text-sm font-semibold mb-2 block">
                                            Email <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="feedback-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <Label htmlFor="feedback-message" className="text-sm font-semibold mb-2 block">
                                        Message <span className="text-destructive">*</span>
                                    </Label>
                                    <Textarea
                                        id="feedback-message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={
                                            formType === "feedback"
                                                ? "Tell us what you think about the scaffold generator..."
                                                : formType === "bug"
                                                    ? "Please describe what went wrong and steps to reproduce..."
                                                    : "What feature would you like to see added?"
                                        }
                                        required
                                        className="min-h-[120px] resize-none"
                                    />
                                </div>

                                {/* Error Message */}
                                {submitStatus === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                                    >
                                        Something went wrong. Please try again.
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !name.trim() || !email.trim() || !message.trim()}
                                    className="w-full h-12 text-base font-semibold gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Send {formType === "feedback" ? "Feedback" : formType === "bug" ? "Bug Report" : "Suggestion"}
                                        </>
                                    )}
                                </Button>

                                {/* Footer Note */}
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                    <span>We typically respond within 24 hours</span>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
