// import { httpRouter } from "convex/server";
// import { httpAction } from "./_generated/server";
// import { Webhook } from 'svix'
// import { WebhookEvent} from '@clerk/nextjs/server'

// const http = httpRouter();

// const clerkWebhook = httpAction(async (ctx, request) => {
//     const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
//     if (!webhookSecret) {
//         throw new Error('Missing CLERK_WEBHOOK_SECRET')
//     }

//     const svix_id = request.headers.get('svix-id')
//     const svix_signature = request.headers.get('svix-signature')
//     const svix_timestamp = request.headers.get('svix-timestamp')
//     if (!svix_id || !svix_signature || !svix_timestamp) {
//         return new Response('Error occurred -- Missing svix headers', {
//             status: 400
//         });
//     }

//     const payload = await request.json();
//     const body = JSON.stringify(payload);

//     const wh = new Webhook(webhookSecret)
//     let evt: WebhookEvent

//     try {
//         evt = wh.verify(body, {
//             'svix-id': svix_id,
//             'svix-signature': svix_signature,
//             'svix-timestamp': svix_timestamp
//         })
//     } catch (error) {
//         console.error('Error verifying webhook signature', error);
//         return new Response('Error occurred', { status: 400 });
//     }

//     try {
//         // save user to db
//     } catch (error) {

//     }
// )

// http.route({
//     path:'/clerk-webhook',
//     method:'POST',
//     handler: clerkWebhook
// })

// export default http;
