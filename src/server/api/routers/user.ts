import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "../trpc";

export const userRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.string())
        .query(({ctx, input}) => {
            return ctx.db.user.findFirst({
                where: {id: input},
            });
        }),

    getAllWithPagination: publicProcedure
        .input(z.object({pageIndex: z.number(), pageSize: z.number()}))
        .query(({ctx, input}) => {
            return ctx.db.user.findMany({
                skip: input.pageSize * (input.pageIndex - 1),
                take: input.pageSize
            })
        }),

    updateById: publicProcedure
        .input(z.object({id: z.string(), image: z.string(), role: z.enum(["USER", "ADMIN"])}))
        .query(({ctx, input}) => {
            return ctx.db.user.update({
                where: {id: input.id},
                data: {
                    image: input.image,
                    role: input.role
                }
            })
        }),

    deleteById: publicProcedure
        .input(z.string())
        .query(({ctx, input}) => {
            return ctx.db.user.delete({where: {id: input}})
        })
});