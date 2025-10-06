"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, ArrowRight, Shield, Clock, Zap } from "lucide-react"

export default function HomePage() {
  const [emailPrefix, setEmailPrefix] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailPrefix.trim()) {
      // const cleanPrefix = emailPrefix
      //   .trim()
      //   .toLowerCase()
      //   .replace(/[^a-z0-9]/g, "")
      router.push(`/inbox/${emailPrefix}`)
    }
  }

  const handleRandomEmail = () => {
    const randomPrefix = Math.random().toString(36).substring(2, 10)
    setEmailPrefix(randomPrefix)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">TempMail</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
              Temporary Email
              <span className="block text-primary">In Seconds</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Get a disposable email address instantly. No registration required. Perfect for testing, signups, and
              protecting your privacy.
            </p>
          </div>

          {/* Email Input Card */}
          <Card className="p-8 mb-12 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Enter your email name"
                    value={emailPrefix}
                    onChange={(e) => setEmailPrefix(e.target.value)}
                    className="h-14 text-lg pr-32"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                    @mwahabi.com
                  </span>
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 text-lg" disabled={!emailPrefix.trim()}>
                  Get Inbox
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button type="button" variant="ghost" onClick={handleRandomEmail} className="text-sm">
                  Generate Random Email
                </Button>
              </div>
            </form>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Setup</h3>
              <p className="text-sm text-muted-foreground">
                No registration needed. Start receiving emails immediately.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">Keep your real email private and avoid spam forever.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Temporary</h3>
              <p className="text-sm text-muted-foreground">Emails are stored temporarily for your convenience.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>TempMail - Temporary Email Service</p>
        </div>
      </footer>
    </div>
  )
}
