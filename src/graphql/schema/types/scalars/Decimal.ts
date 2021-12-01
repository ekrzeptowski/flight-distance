import { scalarType } from "nexus";
import * as DecimalJs from "decimal.js";

import { Kind } from "graphql";

export const DecimalScalar = scalarType({
  name: "Decimal",
  asNexusMethod: "decimal",
  description: "An arbitrary-precision Decimal type",
  serialize(value: DecimalJs.Decimal) {
    return value.toString();
  },
  parseValue(value: DecimalJs.Decimal.Value) {
    return new DecimalJs.Decimal(value);
  },
  parseLiteral(ast) {
    if (
      ast.kind === Kind.INT ||
      ast.kind === Kind.FLOAT ||
      ast.kind === Kind.STRING
    ) {
      return new DecimalJs.Decimal(ast.value);
    }
    return null;
  },
});
