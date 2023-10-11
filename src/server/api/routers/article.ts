import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Prisma } from ".prisma/client";

export const articleRouter = createTRPCRouter({
  createNew: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        tags: z.array(z.string()),
        publishedAt: z.date(),
        desc: z.string(),
        image: z.string(),
        hidden: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 验证Tag是否存在并筛选
      const existedTags = await ctx.db.tag.findMany({
        where: { name: { in: input.tags } },
      });
      const tagsToConnect = existedTags.map((t) => ({ id: t.id }));
      const tagsToCreate = input.tags
        .filter((t) => !existedTags.find((et) => et.name === t))
        .map((n) => ({ name: n, desc: "" }));
      return ctx.db.article.create({
        data: {
          title: input.title,
          content: input.content,
          tags: {
            connect: tagsToConnect,
            create: tagsToCreate,
          },
          author: {
            connect: { id: ctx.session?.user.id },
          },
          hidden: input.hidden,
          desc: input.desc,
          image: input.image,
          publishedAt: input.publishedAt,
        },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.article.findUnique({
        where: { id: input.id },
        include: {
          tags: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.article.findFirst({
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        tags: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }),

  getListGroupByPublishedTime: publicProcedure.query(({ ctx }) => {
    return ctx.db.article.findMany({
      orderBy: {
        publishedAt: "asc",
      },
      select: {
        id: true,
        title: true,
        author: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
        publishedAt: true,
      },
    });
  }),

  getAllWithPagination: publicProcedure
    .input(z.object({ pageIndex: z.number(), pageSize: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.article.findMany({
        orderBy: {
          publishedAt: "desc",
        },
        include: {
          tags: true,
          author: {
            select: {
              name: true,
            },
          },
        },
        skip: input.pageSize * (input.pageIndex - 1),
        take: input.pageSize,
      });
    }),

  updateById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        hidden: z.boolean(),
        image: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.article.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          hidden: input.hidden,
          //image: input.image
        },
      });
    }),

  deleteById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.article.delete({ where: { id: input } });
  }),
});