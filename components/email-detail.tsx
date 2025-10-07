"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Mail } from "lucide-react"
import type { Email } from "@/lib/email"
import { format } from "date-fns"
import { useMemo } from "react"
import DOMPurify from "dompurify"

interface EmailDetailProps {
  email: Email | null
  onDelete: () => void
}

export function EmailDetail({ email, onDelete }: EmailDetailProps) {
  // Sanitize and prepare email content
  const sanitizedContent = useMemo(() => {
    if (!email) return null

    // If HTML content is available, sanitize it
    if (email.html) {
      return {
        type: 'html' as const,
        content: DOMPurify.sanitize(email.html, {
          ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'div', 'span', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'img', 'blockquote', 'pre', 'code'],
          ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class', 'style']
        })
      }
    }

    // Fallback to plain text if available
    if (email.text) {
      return {
        type: 'text' as const,
        content: email.text
      }
    }

    return null
  }, [email])

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

      <div className="email-content">
        {sanitizedContent?.type === 'html' ? (
          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: sanitizedContent.content }}
          />
        ) : sanitizedContent?.type === 'text' ? (
          <pre className="whitespace-pre-wrap text-foreground leading-relaxed font-sans text-sm">
            {sanitizedContent.content}
          </pre>
        ) : (
          <p className="text-muted-foreground italic">No content available</p>
        )}
      </div>

      <style jsx>{`
        .email-content {
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .email-content img {
          max-width: 100%;
          height: auto;
        }

        .email-content a {
          color: hsl(var(--primary));
          text-decoration: underline;
        }

        .email-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }

        .email-content th,
        .email-content td {
          border: 1px solid hsl(var(--border));
          padding: 0.5em;
          text-align: left;
        }
      `}</style>
    </Card>
  )
}
