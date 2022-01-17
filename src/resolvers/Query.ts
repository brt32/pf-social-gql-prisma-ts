import { Context } from "./../index";

export const Query = {
  posts: (
    _: any,
    { take, skip }: { take: number; skip: number },
    { prisma }: Context
  ) => {
    return prisma.post.findMany({
      // if return a promise, not needed to add async/await
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      skip,
      take,
    });
  },
  me: (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma, userInfo }: Context
  ) => {
    const isMyProfile = Number(userId) === userInfo?.userId;
    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
    });
    if (!profile) return null;
    return {
      ...profile,
      isMyProfile,
    };
  },
};
