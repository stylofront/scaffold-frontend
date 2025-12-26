"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import Image from "next/image"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/80 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center gap-1.5 font-bold text-lg font-heading group">
                        <Image src="/logo-t.png" alt="Logo" width={42} height={42} className="h-10 w-12" />
                        <span className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">StyloFront</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 rounded-md"
                        >
                            Home
                        </Link>
                        <Link
                            href="/generate"
                            className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 rounded-md"
                        >
                            Generator
                        </Link>
                        <Link
                            href="/templates"
                            className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 rounded-md"
                        >
                            Templates
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="h-9 w-9 ml-2"
                            aria-label="Toggle theme"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="h-9 w-9"
                            aria-label="Toggle theme"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="h-9 w-9"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <HiOutlineMenuAlt3 className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t py-4 space-y-1">
                        <Link
                            href="/"
                            className="block px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/generate"
                            className="block px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Generator
                        </Link>
                        <Link
                            href="/templates"
                            className="block px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Templates
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}
