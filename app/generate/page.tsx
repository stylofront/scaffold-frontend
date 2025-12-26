import type { Metadata } from 'next'
import { Wizard } from '@/components/generator/Wizard'

export const metadata: Metadata = {
    title: 'Project Generator - Create Your Scaffold | StyloFront',
    description: 'Generate clean, production-ready project scaffolds in seconds. Choose Next.js, React, Node.js or Static. Configure TypeScript, Tailwind v4, ESLint, Prettier. Always latest versions.',
    keywords: ['project generator', 'scaffold', 'Next.js', 'React', 'Vite', 'TypeScript', 'Tailwind CSS', 'ESLint', 'Prettier', 'create project'],
    openGraph: {
        title: 'Project Generator - StyloFront Scaffold',
        description: 'Generate production-ready project scaffolds with Next.js, React, Node.js. TypeScript, Tailwind v4, ESLint ready.',
        type: 'website',
        url: 'https://scaffold.stylofront.com/generate',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Project Generator - StyloFront Scaffold',
        description: 'Generate production-ready project scaffolds in seconds.',
    },
    alternates: {
        canonical: 'https://scaffold.stylofront.com/generate',
    },
}

export default function GeneratePage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] py-6 sm:py-8 md:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Wizard />
            </div>
        </div>
    )
}
