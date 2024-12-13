# Stripe-Simplified

Next.js web app to model online course purchases and subscriptions.

\*Note that this is a mock website so products are in name only and purchases will not go through. Email notifications will not be enabled for the deployed application as I do not own a domain.

Deployed at: https://stripe-simplified.vercel.app/

## Features

- Clerk Authentication
- Convex backend with Redis DB
- One off payments and subscriptions using Stripe
- Email notifications using Resend (\*Will need to set domain for emails in production mode)

## Installation and Setup

Setup Clerk, Convex, Stripe, Redis, and Resend instances and create a .env file in the root with the following information:

```
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_MONTHLY_PRICE_ID=
STRIPE_YEARLY_PRICE_ID=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

To run in development:

```
bun run dev
bunx run convex
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
