# Environment Variables Quick Reference

## Overview

This document provides a quick reference for all environment variables used in the Dionysus project.

---

## Variables List

| Variable | Required | Service | Purpose | Get From |
|----------|----------|---------|---------|----------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL | Database connection with pgvector | [Neon](https://neon.tech) |
| `NODE_ENV` | ✅ Yes | App | Environment mode | Set to `development` or `production` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ Yes | Clerk | Public auth key | [Clerk Dashboard](https://dashboard.clerk.com) |
| `CLERK_SECRET_KEY` | ✅ Yes | Clerk | Secret auth key | [Clerk Dashboard](https://dashboard.clerk.com) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | ✅ Yes | Clerk | Sign in route | Set to `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | ✅ Yes | Clerk | Sign up route | Set to `/sign-up` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` | ✅ Yes | Clerk | Post-signup redirect | Set to `/sync-user` |
| `GEMINI_API_KEY` | ✅ Yes | Google AI | Embeddings & chat | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `OPENAI_API_KEY` | ✅ Yes | OpenAI | Code summaries | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `ASSEMBLYAI_API_KEY` | ⚠️ Optional | AssemblyAI | Meeting transcription | [AssemblyAI](https://www.assemblyai.com) |
| `GITHUB_TOKEN` | ⚠️ Optional | GitHub | Repo access | [GitHub Settings](https://github.com/settings/tokens) |
| `STRIPE_SECRET_KEY` | ⚠️ Optional | Stripe | Payment processing | [Stripe Dashboard](https://dashboard.stripe.com) |
| `STRIPE_PUBLISHABLE_KEY` | ⚠️ Optional | Stripe | Client-side payments | [Stripe Dashboard](https://dashboard.stripe.com) |
| `STRIPE_WEBHOOK_SECRET` | ⚠️ Optional | Stripe | Webhook verification | [Stripe Webhooks](https://dashboard.stripe.com/webhooks) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ⚠️ Optional | Firebase | Storage auth | [Firebase Console](https://console.firebase.google.com) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ⚠️ Optional | Firebase | Storage auth domain | [Firebase Console](https://console.firebase.google.com) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ⚠️ Optional | Firebase | Project identifier | [Firebase Console](https://console.firebase.google.com) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ⚠️ Optional | Firebase | Storage bucket | [Firebase Console](https://console.firebase.google.com) |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ⚠️ Optional | Firebase | Messaging ID | [Firebase Console](https://console.firebase.google.com) |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ⚠️ Optional | Firebase | App identifier | [Firebase Console](https://console.firebase.google.com) |
| `NEXT_PUBLIC_URL` | ✅ Yes | App | Application URL | `http://localhost:3000` (dev) |
| `SKIP_ENV_VALIDATION` | ❌ No | App | Skip validation | Set to `true` for Docker |

---

## Feature Requirements

### Core Features (Required)
- ✅ User Authentication
- ✅ Repository Indexing
- ✅ AI Q&A
- ✅ Commit Summaries

**Required Variables:**
```
DATABASE_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
GEMINI_API_KEY
OPENAI_API_KEY
NEXT_PUBLIC_URL
```

### Meeting Transcription (Optional)
**Additional Variables:**
```
ASSEMBLYAI_API_KEY
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### Credit System & Billing (Optional)
**Additional Variables:**
```
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
```

### Private Repository Access (Optional)
**Additional Variables:**
```
GITHUB_TOKEN
```

---

## Setup Priority

### 1️⃣ Essential (Start Here)
```bash
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
GEMINI_API_KEY="AIza..."
OPENAI_API_KEY="sk-..."
NEXT_PUBLIC_URL="http://localhost:3000"
```

### 2️⃣ Important (Add Next)
```bash
GITHUB_TOKEN="ghp_..."  # For better rate limits
```

### 3️⃣ Optional Features (Add As Needed)
```bash
# For meeting transcription
ASSEMBLYAI_API_KEY="..."
NEXT_PUBLIC_FIREBASE_API_KEY="..."
# ... other Firebase vars

# For billing
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## Cost Breakdown

| Service | Free Tier | Paid Plan Starts |
|---------|-----------|------------------|
| **Neon (Database)** | 0.5 GB storage, 1 project | $19/month |
| **Clerk (Auth)** | 10,000 MAU | $25/month |
| **Google Gemini** | 60 requests/min | Free (as of 2024) |
| **OpenAI** | No free tier | Pay-as-you-go (~$0.15/1M tokens) |
| **AssemblyAI** | 5 hours/month | $0.37/hour |
| **Firebase** | 5 GB storage | Pay-as-you-go |
| **Stripe** | Free | 2.9% + $0.30 per transaction |

---

## Security Best Practices

1. ✅ Never commit `.env` to git
2. ✅ Use different keys for dev/prod
3. ✅ Rotate keys regularly
4. ✅ Use environment-specific Stripe keys (test vs live)
5. ✅ Enable webhook signature verification
6. ✅ Set up proper CORS for Firebase
7. ✅ Use read-only GitHub tokens when possible

---

## Validation

The app uses `@t3-oss/env-nextjs` for environment validation. Check `src/env.js` for the schema.

To skip validation (e.g., in Docker):
```bash
SKIP_ENV_VALIDATION=true
```

---

## Common Issues

### "DATABASE_URL is not defined"
- Ensure `.env` file exists in project root
- Check variable name spelling
- Restart dev server after changes

### "Invalid Clerk keys"
- Verify keys are from the same Clerk application
- Check for extra spaces or quotes
- Ensure keys haven't expired

### "Gemini API quota exceeded"
- Check rate limits in Google AI Studio
- Consider upgrading plan
- Implement request throttling

### "OpenAI authentication failed"
- Verify API key is valid
- Check billing is set up
- Ensure key has correct permissions

---

## Quick Copy Template

```bash
# Copy this to your .env file and fill in the values

# Database
DATABASE_URL=""

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/sync-user"

# AI Services
GEMINI_API_KEY=""
OPENAI_API_KEY=""
ASSEMBLYAI_API_KEY=""

# GitHub
GITHUB_TOKEN=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""

# App Config
NEXT_PUBLIC_URL="http://localhost:3000"
```

