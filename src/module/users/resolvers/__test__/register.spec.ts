import { info } from "console";
import { Connection } from "typeorm";
import { dbConn } from "../../../utils/dbConnection";
import { graphCall } from "../../../utils/graphCall";
import { resolverMutation } from "../../../utils/resolvers";

let dbCnnectionTypeOrm: Connection;

beforeAll(async () => {
  dbCnnectionTypeOrm = await dbConn({ correct: true });
});

afterAll(async () => {
  await dbCnnectionTypeOrm.close();
});

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
