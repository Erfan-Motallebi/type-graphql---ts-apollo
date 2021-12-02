import path from "path/posix";
import { buildSchema } from "type-graphql";
import { customAuthChecker } from "../users/AuthChecker";

const resolverPath = path.join(__dirname, "../", "users", "resolvers");

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [resolverPath + "/**/*.ts"],
    authChecker: customAuthChecker,
  });
};
