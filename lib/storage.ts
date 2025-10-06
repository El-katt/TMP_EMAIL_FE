'use server'

import fs from 'fs';
import path from 'path';
import { type Email } from "@/lib/email"

const STORAGE_FILE = '/opt/yopmail/emails.json';



interface EmailStorage {
  [inbox: string]: Email[];
}

// Load emails from file
function loadEmails(): EmailStorage {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading emails:', error);
  }
  return {};
}

// Save emails to file
function saveEmails(emails: EmailStorage): void {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(emails, null, 2));
  } catch (error) {
    console.error('Error saving emails:', error);
  }
}

// Get emails for an inbox
async function getEmails(inbox: string): Promise<Email[]> {
  const allEmails = loadEmails();
  return allEmails[inbox] || [];
}

// Add email to inbox
async function addEmail(inbox: string, email: Email): Promise<void> {
  const allEmails = loadEmails();
  if (!allEmails[inbox]) {
    allEmails[inbox] = [];
  }
  allEmails[inbox].push(email);
  saveEmails(allEmails);
}

export { getEmails, addEmail };