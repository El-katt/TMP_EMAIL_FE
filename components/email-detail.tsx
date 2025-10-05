"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Mail } from "lucide-react"
import type { Email } from "@/lib/mock-emails"
import { format } from "date-fns"

interface EmailDetailProps {
  email: Email | null
  onDelete: () => void
}

export function EmailDetail({ email, onDelete }: EmailDetailProps) {
  if (!email) {
    return (
      <Card className="p-12 text-center h-full flex items-center justify-center">
        <div>
          <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No email selected</h3>
          <p className="text-sm text-muted-foreground">Select an email from the list to view its contents</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2 text-balance">{email.subject}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{email.from}</span>
            <span>•</span>
            <span>{format(email.date, "PPpp")}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>

      <Separator className="mb-6" />

      <div className="prose prose-sm max-w-none">
        <div className="whitespace-pre-wrap text-foreground leading-relaxed">{email.body}</div>
      </div>
    </Card>
  )
}
