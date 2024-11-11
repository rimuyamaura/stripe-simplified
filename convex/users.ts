import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('users')
      .withIndex('byclerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique();

    if (existingUser) {
      console.log('User already exists');
      return existingUser._id;
    }

    const userId = await ctx.db.insert('users', {
      email: args.email,
      name: args.name,
      clerkId: args.clerkId,
      stripeCustomerId: args.stripeCustomerId,
    });

    return userId;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('byclerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique();
  },
});

export const getUserByStripeCustomerId = query({
  args: { stripeCustomerId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_stripeCustomerId', (q) =>
        q.eq('stripeCustomerId', args.stripeCustomerId)
      )
      .unique();
  },
});

export const getUserAccess = query({
  args: { userId: v.id('users'), courseId: v.id('courses') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError('User not found');
    }

    // Check for subscriptions
    if (user.currentSubscriptionId) {
      const subscription = await ctx.db.get(user.currentSubscriptionId);
      if (subscription && subscription.status === 'active') {
        return { hasAccess: true, accessType: 'subscription' };
      }
    }

    // Check for individual courses purchased
    const purchase = await ctx.db
      .query('purchases')
      .withIndex('by_userId_and_courseId', (q) =>
        q.eq('userId', args.userId).eq('courseId', args.courseId)
      )
      .unique();

    if (purchase) {
      return { hasAccess: true, accessType: 'course' };
    }

    return { hasAccess: false };
  },
});
