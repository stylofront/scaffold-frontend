import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { SupportedStacks } from "@/components/landing/SupportedStacks"
import { Feedback } from "@/components/landing/Feedback"

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <HowItWorks />
            <SupportedStacks />
            <Feedback />
        </>
    )
}
