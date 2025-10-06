"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail, MailOpen } from "lucide-react"
import type { Email } from "@/lib/email"
import { formatDistanceToNow } from "date-fns"

interface EmailListProps {
  emails: Email[]
  selectedEmail: Email | null
  onSelectEmail: (email: Email) => void
  onDeleteEmail: (id: string) => void
  isLoading: boolean
}

export function EmailList({ emails, selectedEmail, onSelectEmail, onDeleteEmail, isLoading }: EmailListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </Card>
        ))}
      </div>
    )
  }

  if (emails && emails.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold mb-2">No emails yet</h3>
        <p className="text-sm text-muted-foreground">Emails sent to this address will appear here</p>
      </Card>
    )
  }
// console.log('emails:', emails);
// console.log('emails type:', typeof emails);
// console.log('is array?', Array.isArray(emails));
  return (
    <div className="space-y-2">
      
      {emails.map((email) => (
        <Card
          key={email.id}
          className={`p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
            selectedEmail?.id === email.id ? "bg-accent" : ""
          }`}
          onClick={() => onSelectEmail(email)}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {email.read ? (
                <MailOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              )}
              <span className={`font-semibold truncate ${!email.read ? "text-primary" : ""}`}>{email.from}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteEmail(email.id)
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
          <h3 className={`text-sm mb-1 truncate ${!email.read ? "font-semibold" : ""}`}>{email.subject}</h3>
          {/* <p className="text-xs text-muted-foreground truncate mb-2">{email.preview}</p> */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(email.date, { addSuffix: true })}
            </span>
            {!email.read && (
              <Badge variant="default" className="text-xs">
                New
              </Badge>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
