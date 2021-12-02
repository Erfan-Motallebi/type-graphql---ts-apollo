import { info } from "console";
import { graphql } from "graphql";
import { createSchema } from "../../../utils/createSchema";
import { graphCall } from "../../../utils/graphCall";
import { resolverMutation } from "./utils/resolvers";

describe("User Registration Rersolver Test", () => {
  test("should return a user when it gets done", async () => {
    info(
      graphCall({
        source: resolverMutation,
        variableValues: {
          first_name: "Erfan",
          last_name: "Motallebi",
          email: "eZipcoder@gmail.com",
          password: "123456",
        },
      })
    );
  });
});
