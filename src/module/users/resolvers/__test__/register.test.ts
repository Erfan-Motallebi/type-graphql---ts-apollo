import { graphCall } from "../../../utils/graphCall";
import { resolverMutation } from "../../../utils/resolvers";
import dbConnection from "../../../utils/dbConnection";

beforeAll(async () => {
  await dbConnection.create();
});

beforeEach(async () => {
  await dbConnection.clear();
});

afterAll(async () => {
  await dbConnection.close();
});

describe("User Registration Rersolver Test", () => {
  test("should return a user when it gets done", async () => {
    console.log(
      await graphCall({
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
