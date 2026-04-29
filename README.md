# SmartReceipt - AI Powered Receipt Generator

SmartReceipt is a modern SaaS platform for generating professional receipts with multiple templates, real-time preview, PDF export, and customizable branding.

## Features

- Multiple templates (Modern, Dark, Minimal, Glass, Future)
- Real-time receipt preview
- PDF download/export
- Firebase authentication (login/signup)
- Firestore-backed receipt and company data
- AI chatbot support

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase (Auth, Firestore, Storage)
- Express (for API routes and production serving)

## Installation

1. Clone the repository:
   `git clone https://github.com/Talha03creator/smartreceipt-engine.git`
2. Install dependencies:
   `npm install`
3. Create your `.env.local` (or `.env`) from `.env.example`
4. Start development server:
   `npm run dev`

## Build & Deployment

- Build:
  `npm run build`
- Start production server:
  `npm start`
- Recommended deployment: Vercel (frontend) or any Node-compatible host

## Folder Structure

Main app code lives in `src/` and is organized for scalability:

- `src/app` - app-level composition points
- `src/components` - reusable UI and feature components
- `src/templates` - receipt template layer (reserved for expansion)
- `src/lib` - shared helpers and utility abstractions
- `src/hooks` - reusable React hooks
- `src/firebase` - Firebase initialization and integrations
- `src/styles` - style system entry points
- `src/utils` - domain utilities (PDF generation, etc.)
- `public` - static public assets

## Security Notes

- Never commit `.env` or `.env.local` files
- Keep API keys in environment variables only
- Firebase security is enforced via `firestore.rules`
- Gemini API key is used server-side through `/api/chat`

## Scripts

- `npm run dev` - starts Express + Vite middleware
- `npm run build` - production build via Vite
- `npm start` - starts Express server in production mode
- `npm run lint` - TypeScript type-check

## Production Readiness Checklist

- Environment variables configured from `.env.example`
- No hardcoded secrets in source
- Build passes with `npm run build`
- Type-check passes with `npm run lint`
