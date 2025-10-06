export interface Email {
  id: string
  from: string
  to: string
  subject: string
  raw: string
  text: string
  html: string
  date: Date
  read: boolean
}
