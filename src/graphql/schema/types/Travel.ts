import { getSession } from "next-auth/client";
import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";

export const Travel = objectType({
  name: "Travel",
  definition(t) {
    t.nonNull.int("id");
    t.field("from", {
      type: "Airport",
      resolve: (parent, _, context) => {
        return context.prisma.travel
          .findUnique({
            where: { id: parent.id },
          })
          .from();
      },
    });
    t.field("to", {
      type: "Airport",
      resolve: (parent, _, context) => {
        return context.prisma.travel
          .findUnique({
            where: { id: parent.id },
          })
          .to();
      },
    });
    t.date("departureDate");
    t.date("arrivalDate");
  },
});

export const TravelQueries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("travelById", {
      type: "Travel",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.travel.findUnique({
          where: { id: Number(args.id) },
        });
      },
    });
  },
});

export const TravelMutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("addTravel", {
      type: "Travel",
      args: {
        from: nonNull(intArg()),
        to: nonNull(intArg()),
        departureDate: nonNull(stringArg()),
        arrivalDate: nonNull(stringArg()),
      },
      resolve: async (_, { from, to, departureDate, arrivalDate }, ctx) => {
        const session = await getSession({ req: ctx.req });
        // console.log(session);
        // const newTravel = await ctx.prisma.travel.create({
        //   data: {
        //     from: {
        //       connect: {
        //         id: Number(from),
        //       },
        //     },
        //     to: {
        //       connect: {
        //         id: Number(to),
        //       },
        //     },
        //     user: {
        //       connect: {
        //         id: session.user.userId,
        //       },
        //     },
        //     departureDate: new Date(),
        //     arrivalDate: new Date(),
        //   },
        // });
        return ctx.prisma.travel.create({
          data: {
            from: {
              connect: {
                id: Number(from),
              },
            },
            to: {
              connect: {
                id: Number(to),
              },
            },
            user: {
              connect: {
                id: session.user.userId,
              },
            },
            departureDate: new Date(departureDate),
            arrivalDate: new Date(arrivalDate),
          },
        });
      },
    });
  },
});
