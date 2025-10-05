"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, ArrowLeft, RefreshCw, Trash2, Clock, User } from "lucide-react"
import { EmailList } from "@/components/email-list"
import { EmailDetail } from "@/components/email-detail"
import { generateMockEmails, type Email } from "@/lib/mock-emails"

export default function InboxPage() {
  const params = useParams()
  const router = useRouter()
  const email = params.email as string
  const fullEmail = `${email}@mwahabi.com`

  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading emails
    setIsLoading(true)
    setTimeout(() => {
      const mockEmails = generateMockEmails(email)
      setEmails(mockEmails)
      setIsLoading(false)
    }, 500)
  }, [email])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      const mockEmails = generateMockEmails(email)
      setEmails(mockEmails)
      setIsLoading(false)
    }, 500)
  }

  const handleDeleteEmail = (id: string) => {
    setEmails(emails.filter((e) => e.id !== id))
    if (selectedEmail?.id === id) {
      setSelectedEmail(null)
    }
  }

  const handleDeleteAll = () => {
    setEmails([])
    setSelectedEmail(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold">TempMail</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              {emails.length > 0 && (
                <Button variant="outline" size="sm" onClick={handleDeleteAll}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All
                </Button>
              )}
            </div>
          </div>

          {/* Email Address Display */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Your temporary email</p>
                  <p className="font-mono text-lg font-semibold">{fullEmail}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm">
                <Clock className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </Card>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6 h-full">
          {/* Email List */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Inbox {emails.length > 0 && `(${emails.length})`}</h2>
            </div>
            <EmailList
              emails={emails}
              selectedEmail={selectedEmail}
              onSelectEmail={setSelectedEmail}
              onDeleteEmail={handleDeleteEmail}
              isLoading={isLoading}
            />
          </div>

          {/* Email Detail */}
          <div className="lg:col-span-3">
            <EmailDetail email={selectedEmail} onDelete={() => selectedEmail && handleDeleteEmail(selectedEmail.id)} />
          </div>
        </div>
      </main>
    </div>
  )
}
