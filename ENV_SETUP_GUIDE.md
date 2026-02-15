# Environment Variables Setup Guide

This guide will help you set up all the required environment variables for the Dionysus project.

## Quick Start

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Fill in the values following the instructions below.

---

## Required Environment Variables

### 1. Database (PostgreSQL with pgvector)

**DATABASE_URL**
- **Required**: Yes
- **Description**: PostgreSQL connection string with pgvector extension
- **Recommended Provider**: [Neon](https://neon.tech) (free tier available)
- **Setup**:
  1. Create account at https://neon.tech
  2. Create a new project
  3. Enable pgvector extension in SQL Editor:
     ```sql
     CREATE EXTENSION IF NOT EXISTS vector;
     ```
  4. Copy connection string from dashboard
- **Format**: `postgresql://username:password@host:port/database?sslmode=require`

---

### 2. Authentication (Clerk)

**NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY** & **CLERK_SECRET_KEY**
- **Required**: Yes
- **Description**: Authentication service for user management
- **Setup**:
  1. Create account at https://clerk.com
  2. Create a new application
  3. Go to API Keys section
  4. Copy both publishable and secret keys
- **Note**: The redirect URLs are pre-configured in the .env file

---

### 3. AI Services

#### Google Gemini (Primary AI)
**GEMINI_API_KEY**
- **Required**: Yes
- **Description**: Used for embeddings and chat responses
- **Setup**:
  1. Go to https://makersuite.google.com/app/apikey
  2. Create API key
  3. Copy the key
- **Free Tier**: Available

#### OpenAI
**OPENAI_API_KEY**
- **Required**: Yes
- **Description**: Used for code summarization
- **Setup**:
  1. Go to https://platform.openai.com/api-keys
  2. Create new secret key
  3. Copy the key (starts with `sk-`)
- **Note**: Requires billing setup, but usage is minimal

#### AssemblyAI
**ASSEMBLYAI_API_KEY**
- **Required**: Only if using meeting transcription feature
- **Description**: Audio transcription service
- **Setup**:
  1. Create account at https://www.assemblyai.com/
  2. Go to dashboard
  3. Copy API key
- **Free Tier**: 5 hours/month

---

### 4. GitHub Integration

**GITHUB_TOKEN**
- **Required**: Optional (fallback token exists in code)
- **Description**: For accessing repositories and higher rate limits
- **Setup**:
  1. Go to https://github.com/settings/tokens
  2. Generate new token (classic)
  3. Select scopes: `repo` (for private repos) or `public_repo`
  4. Copy the token
- **Note**: Without this, you'll use the default token with lower rate limits

---

### 5. Payment Processing (Stripe)

**STRIPE_SECRET_KEY**, **STRIPE_PUBLISHABLE_KEY**, **STRIPE_WEBHOOK_SECRET**
- **Required**: Only if using billing/credits feature
- **Description**: Payment processing for purchasing credits
- **Setup**:
  1. Create account at https://stripe.com
  2. Go to Developers > API keys
  3. Copy Secret key and Publishable key
  4. For webhook:
     - Go to Developers > Webhooks
     - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
     - Select event: `checkout.session.completed`
     - Copy webhook signing secret

---

### 6. Firebase Storage

**NEXT_PUBLIC_FIREBASE_*** (6 variables)
- **Required**: Only if using meeting upload feature
- **Description**: Storage for meeting audio files
- **Setup**:
  1. Go to https://console.firebase.google.com/
  2. Create new project
  3. Add web app to project
  4. Copy all config values from the setup screen
  5. Enable Storage in Firebase console

---

### 7. Application Configuration

**NEXT_PUBLIC_URL**
- **Required**: Yes
- **Description**: Your application's public URL
- **Development**: `http://localhost:3000`
- **Production**: Your deployed domain (e.g., `https://yourdomain.com`)

---

## Minimal Setup (For Testing)

To get started quickly with minimal features, you only need:

1. **DATABASE_URL** - PostgreSQL with pgvector
2. **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY** & **CLERK_SECRET_KEY** - Auth
3. **GEMINI_API_KEY** - AI embeddings and chat
4. **OPENAI_API_KEY** - Code summaries
5. **NEXT_PUBLIC_URL** - Application URL

This will enable:
- ✅ User authentication
- ✅ Repository indexing
- ✅ AI Q&A
- ✅ Commit summaries
- ❌ Meeting transcription (requires AssemblyAI + Firebase)
- ❌ Credit purchases (requires Stripe)

---

## Verification

After setting up your `.env` file, run:

```bash
npm run dev
```

Check the console for any missing environment variable errors.

---

## Security Notes

- ⚠️ **Never commit `.env` to version control**
- ⚠️ **Keep your API keys secret**
- ⚠️ **Use different keys for development and production**
- ⚠️ **Rotate keys if they are exposed**

---

## Troubleshooting

### Database Connection Issues
- Ensure pgvector extension is installed
- Check connection string format
- Verify SSL mode is correct

### Clerk Authentication Issues
- Verify redirect URLs match your configuration
- Check that both keys are from the same Clerk application

### AI API Issues
- Check API key validity
- Verify billing is set up (for OpenAI)
- Check rate limits

---

## Need Help?

If you encounter issues:
1. Check the console for specific error messages
2. Verify all required variables are set
3. Ensure API keys are valid and not expired
4. Check service status pages for outages

