import type { Metadata } from 'next'
import { TemplatesGrid } from '@/components/templates/TemplatesGrid'

export const metadata: Metadata = {
    title: 'Pre-Built Templates - Ready-to-Use Project Starters | StyloFront',
    description: 'Download pre-configured project templates instantly. Next.js + TypeScript + Tailwind, React + Vite, Node.js API, and more. No configuration needed, just download and code.',
    keywords: ['project templates', 'starter templates', 'Next.js template', 'React template', 'Node.js boilerplate', 'TypeScript starter', 'Tailwind template'],
    openGraph: {
        title: 'Pre-Built Templates - StyloFront Scaffold',
        description: 'Download pre-configured project templates instantly. Next.js, React, Node.js ready to use.',
        type: 'website',
        url: 'https://scaffold.stylofront.com/templates',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pre-Built Templates - StyloFront Scaffold',
        description: 'Download pre-configured project templates instantly.',
    },
    alternates: {
        canonical: 'https://scaffold.stylofront.com/templates',
    },
}

export default function TemplatesPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] py-8 sm:py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-3">
                        Pre-Built Templates
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                        Ready-to-use project templates. Just download and start coding.
                    </p>
                </div>

                {/* Templates Grid */}
                <TemplatesGrid />
            </div>
        </div>
    )
}
