# Message Translation

## About

The aim of this app is to provide a way for a user to create a new 'message' and send it to a group of people using a link. Users must authenticate with Oauth (google, github, discord) to create a new message, and will be able to edit or delete the message. When a user (signed in or not) visits the link the message will be displayed translated to their language.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## To Do

-   [x] Finish message component to show message content + user details + share link
-   [x] Add message title field
-   [x] Rename message text field to content
-   [x] Move away from SSR for `/message/[id]`
-   [x] Add message md support
-   [x] Add edit message functionality
-   [ ] Add delete message functionality
-   [ ] Add message list functionality (`/message`)
-   [ ] Add actual translation functionality using user locale (test code in `index.tsx`)
-   [ ] Style App
-   [ ] Reintroduce SSR for `/message/[id]` and things

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
