import { objectType, extendType, stringArg, nonNull, booleanArg } from "nexus";

export const AirportType = objectType({
  name: "AirportType",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("type");
    t.field("airport", {
      type: "Airport",
      resolve: (parent, _, context) => {
        return context.prisma.airportType
          .findUnique({
            where: { id: parent.id },
          })
          .airport() as any;
      },
    });
  },
});

export const Continent = objectType({
  name: "Continent",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("code");
    t.field("region", {
      type: "Region",
      resolve: (parent, _, context) => {
        return context.prisma.continent
          .findUnique({
            where: { id: parent.id },
          })
          .region() as any;
      },
    });
    t.field("country", {
      type: "Country",
      resolve: (parent, _, context) => {
        return context.prisma.continent
          .findUnique({
            where: { id: parent.id },
          })
          .country() as any;
      },
    });
    t.field("airport", {
      type: "Airport",
      resolve: (parent, _, context) => {
        return context.prisma.airportType
          .findUnique({
            where: { id: parent.id },
          })
          .airport() as any;
      },
    });
  },
});

export const Country = objectType({
  name: "Country",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("code");
    t.nonNull.string("name");
    t.field("continent", {
      type: "Continent",
      resolve: (parent, _, context) => {
        return context.prisma.country
          .findUnique({
            where: { id: parent.id },
          })
          .continent();
      },
    });
    t.string("wikipediaLink");
    t.string("keywords");
    t.field("region", {
      type: "Region",
      resolve: (parent, _, context) => {
        return context.prisma.country
          .findUnique({
            where: { id: parent.id },
          })
          .region() as any;
      },
    });
    t.field("airport", {
      type: "Airport",
      resolve: (parent, _, context) => {
        return context.prisma.country
          .findUnique({
            where: { id: parent.id },
          })
          .airport() as any;
      },
    });
  },
});

export const Region = objectType({
  name: "Region",
  definition(t) {
    t.nonNull.int("id");
    t.string("code");
    t.string("localCode");
    t.nonNull.string("name");
    t.field("continent", {
      type: "Continent",
      resolve: (parent, _, context) => {
        return context.prisma.region
          .findUnique({
            where: { id: parent.id },
          })
          .continent();
      },
    });
    t.string("wikipediaLink");
    t.string("keywords");
    t.field("country", {
      type: "Country",
      resolve: (parent, _, context) => {
        return context.prisma.region
          .findUnique({
            where: { id: parent.id },
          })
          .country();
      },
    });
    t.field("airport", {
      type: "Airport",
      resolve: (parent, _, context) => {
        return context.prisma.region
          .findUnique({
            where: { id: parent.id },
          })
          .airport() as any;
      },
    });
  },
});

export const Airport = objectType({
  name: "Airport",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("ident");
    t.field("type", {
      type: "AirportType",
      resolve: (parent, _, context) => {
        return context.prisma.airport
          .findUnique({
            where: { id: parent.id },
          })
          .type();
      },
    });
    t.nonNull.string("name");
    t.nonNull.decimal("latitudeDeg");
    t.nonNull.decimal("longitudeDeg");
    t.int("elevationFt");
    t.field("continent", {
      type: "Continent",
      resolve: (parent, _, context) => {
        return context.prisma.airport
          .findUnique({
            where: { id: parent.id },
          })
          .continent();
      },
    });
    t.field("country", {
      type: "Country",
      resolve: (parent, _, context) => {
        return context.prisma.airport
          .findUnique({
            where: { id: parent.id },
          })
          .country();
      },
    });
    t.field("region", {
      type: "Region",
      resolve: (parent, _, context) => {
        return context.prisma.airport
          .findUnique({
            where: { id: parent.id },
          })
          .region();
      },
    });
    t.string("municipality");
    t.boolean("scheduledService");
    t.string("homeLink");
    t.string("wikipediaLink");
    t.string("keywords");
  },
});

export const AirportQueries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("airportById", {
      type: "Airport",
      args: {
        ident: nonNull(stringArg()),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.airport.findUnique({
          where: { ident: args.ident },
        });
      },
    });
    t.list.field("airportByMunicipality", {
      type: "Airport",
      args: {
        municipality: nonNull(stringArg()),
        scheduledService: booleanArg(),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.airport.findMany({
          where: {
            municipality: args.municipality,
            scheduledService: args.scheduledService,
          },
        });
      },
    });
  },
});
