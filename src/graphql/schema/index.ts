import { makeSchema, asNexusMethod } from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import path from "path";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../permissions";

import * as User from "./types/User";
import * as ExampleQuery from "./types/ExampleQuery";
import * as Airport from "./types/Airport";
import * as Travel from "./types/Travel";
import { DecimalScalar } from "./types/scalars/Decimal";

export const GQLDate = asNexusMethod(DateTimeResolver, "date");

export const baseSchema = makeSchema({
  types: [Airport, Travel, User, ExampleQuery, GQLDate, DecimalScalar],
  plugins: [],
  outputs: {
    typegen: path.join(process.cwd(), "src/graphql/schema/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "src/graphql/schema/schema.graphql"),
  },
  contextType: {
    module: path.join(process.cwd(), "src/graphql/context.ts"),
    export: "Context",
  },

  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
    debug: true,
  },
});

export const schema = applyMiddleware(baseSchema, permissions);
