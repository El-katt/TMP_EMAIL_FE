export interface Email {
  id: string
  from: string
  subject: string
  preview: string
  body: string
  date: Date
  read: boolean
}

const sampleEmails = [
  {
    from: "noreply@github.com",
    subject: "Verify your email address",
    preview: "Please verify your email address to complete your GitHub account setup.",
    body: `Hello,

Thank you for signing up for GitHub!

To complete your account setup, please verify your email address by clicking the link below:

[Verify Email Address]

This link will expire in 24 hours.

If you didn't create a GitHub account, you can safely ignore this email.

Best regards,
The GitHub Team`,
  },
  {
    from: "notifications@slack.com",
    subject: "Welcome to Slack!",
    preview: "Get started with your new Slack workspace.",
    body: `Welcome to Slack!

You've been invited to join a Slack workspace. Slack is where work happens - it's a place where teams come together to collaborate, share ideas, and get things done.

Here are some tips to get started:
• Set up your profile
• Join channels relevant to your work
• Start conversations with your teammates
• Customize your notifications

Click here to get started: [Open Slack]

Happy collaborating!
The Slack Team`,
  },
  {
    from: "support@stripe.com",
    subject: "Your payment confirmation",
    preview: "Thank you for your payment. Here are the details of your transaction.",
    body: `Payment Confirmation

Thank you for your payment!

Transaction Details:
Amount: $29.99
Date: ${new Date().toLocaleDateString()}
Status: Completed

Your payment has been successfully processed. You should receive your order confirmation shortly.

If you have any questions, please don't hesitate to contact our support team.

Best regards,
Stripe Support Team`,
  },
  {
    from: "newsletter@medium.com",
    subject: "Your weekly reading digest",
    preview: "Here are the top stories we think you'll love this week.",
    body: `Your Weekly Reading Digest

Hello Reader,

We've curated the best stories from this week just for you:

1. "The Future of Web Development" - A deep dive into emerging technologies
2. "10 Tips for Better Code Reviews" - Improve your team's code quality
3. "Understanding React Server Components" - A comprehensive guide

Click here to read more: [View Digest]

Happy reading!
The Medium Team`,
  },
  {
    from: "security@amazon.com",
    subject: "Security alert: New sign-in",
    preview: "We noticed a new sign-in to your Amazon account.",
    body: `Security Alert

We noticed a new sign-in to your Amazon account.

Details:
Device: Chrome on Windows
Location: New York, USA
Time: ${new Date().toLocaleString()}

If this was you, you can safely ignore this email.

If this wasn't you, please secure your account immediately by changing your password.

Stay safe,
Amazon Security Team`,
  },
]

export function generateMockEmails(emailPrefix: string): Email[] {
  // Generate 3-5 random emails
  const count = Math.floor(Math.random() * 3) + 3
  const shuffled = [...sampleEmails].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)

  return selected.map((template, index) => ({
    id: `${emailPrefix}-${Date.now()}-${index}`,
    from: template.from,
    subject: template.subject,
    preview: template.preview,
    body: template.body,
    date: new Date(Date.now() - Math.random() * 86400000 * 2), // Random date within last 2 days
    read: Math.random() > 0.5, // Randomly mark some as read
  }))
}
