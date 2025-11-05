# Deploying to Netlify

This guide will help you deploy your Next.js application to Netlify.

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://www.netlify.com))
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Push your code to Git**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider (GitHub/GitLab/Bitbucket)
   - Select your repository

3. **Configure Build Settings**
   - Netlify will auto-detect Next.js and use the `netlify.toml` configuration
   - Build command: `npm run build` (auto-detected)
   - Publish directory: `.next` (auto-detected)
   - Node version: `20` (set in netlify.toml)

4. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add any required environment variables from your `.env.local` file:
     - `MONGODB_URI` (if using MongoDB)
     - `NEXTAUTH_SECRET` (if using NextAuth)
     - `STRIPE_SECRET_KEY` (if using Stripe)
     - `RESEND_API_KEY` (if using Resend)
     - Any other API keys or secrets

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your site

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Important Notes

- The `@netlify/plugin-nextjs` plugin is automatically used by Netlify (no need to install it)
- Make sure all environment variables are set in Netlify's dashboard
- The site will rebuild automatically on every push to your main branch
- Custom domains can be configured in Site settings → Domain management

## Troubleshooting

If you encounter build errors:
1. Check the build logs in Netlify dashboard
2. Ensure all environment variables are set
3. Verify Node version is 20 (set in netlify.toml)
4. Check that all dependencies are listed in `package.json`

## Post-Deployment

After deployment:
1. Update your domain name in `config.ts` if you have a custom domain
2. Test all functionality on the live site
3. Set up any required webhooks (Stripe, etc.) with your Netlify URL

