import type { Metadata } from 'next'
import { Outfit, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    weight: ['400', '500', '600', '700', '800', '900'],
    display: 'swap',
    preload: true,
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    preload: true,
})

export const metadata: Metadata = {
    metadataBase: new URL('https://scaffold.stylofront.com'),
    title: {
        default: 'StyloFront Scaffold - Generate Project Scaffolds Instantly',
        template: '%s | StyloFront Scaffold',
    },
    description: 'Generate clean, modern project scaffolds in seconds. Client-side. Version-agnostic. No boilerplate pain. Supports Next.js, React, Node.js, and Static Frontend.',
    keywords: [
        'project scaffold generator',
        'project boilerplate',
        'Next.js scaffold',
        'React scaffold',
        'Node.js scaffold',
        'Vite scaffold',
        'project generator',
        'frontend scaffold',
        'TypeScript project generator',
        'Tailwind CSS project',
        'ESLint configuration',
        'project template',
        'boilerplate generator',
        'code scaffold',
        'project setup tool',
    ],
    authors: [{ name: 'hitesh odedara' }],
    creator: 'hitesh odedara',
    publisher: 'StyloFront',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
            },
        ],
        url: 'https://scaffold.stylofront.com',
        siteName: 'StyloFront Scaffold',
        title: 'StyloFront Scaffold - Generate Project Scaffolds Instantly',
        description: 'Generate clean, modern project scaffolds in seconds. Client-side. Version-agnostic. No boilerplate pain.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'StyloFront Scaffold - Generate Project Scaffolds Instantly',
        description: 'Generate clean, modern project scaffolds in seconds. Client-side. Version-agnostic.',
        creator: '@stylofront',
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${spaceGrotesk.variable}`}>
            <head>
                <link rel="icon" href="/logo-t.png" type="image/png" />
            </head>
            <body className={`${spaceGrotesk.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
