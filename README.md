## Liveblocks real-time voting demo

This demo shows you how to implement real-time Next.js caching/revalidating with [Liveblocks](https://liveblocks.io/). No data is stored on Liveblocks to make this work, it simply tells other users to refresh their data from your database.

https://github.com/CTNicholas/nextjs-realtime-cache-update/assets/33033422/1a27992a-fcec-4182-b3cf-0097c4098bcb

### Set up Liveblocks

- Install all dependencies with `npm install`
- Create an account on [liveblocks.io](https://liveblocks.io/dashboard)
- Copy your **secret** key from the [dashboard](https://liveblocks.io/dashboard/apikeys)
- Create an `.env.local` file and add your **secret** key as the `LIVEBLOCKS_SECRET_KEY` environment variable
- Run `npm run dev` and go to [http://localhost:3000](http://localhost:3000)
