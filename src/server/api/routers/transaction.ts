import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const transactionRoute = createTRPCRouter({
  createTransaction: protectedProcedure
    .input(
      z.object({
        status: z.string(),
        amount: z.number(),
        date: z.date(),
        ref: z.string(),
        plan: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      const newTransaction = await prisma.transaction.create({
        data: {
          amount: input.amount,
          status: input.status,
          transactionDate: input.date,
          transactionId: input.ref,
          plan: input.plan,
          userId: user.id,
          paymentReference: input.ref,
          id: input.amount,
        },
      });

      return newTransaction;
    }),

  getAllTransaction: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    const transactionHistory = ctx.prisma.transaction.findMany({
      where: { userId: userId },
    });

    return transactionHistory;
  }),
});
