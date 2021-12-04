import { info } from "console";
import { Connection } from "typeorm";
import { dbConn } from "../../../utils/dbConnection";
import { graphCall } from "../../../utils/graphCall";
import { resolverMutation } from "../../../utils/resolvers";

let dbCnnectionTypeOrm: Connection | undefined;

beforeAll(async () => {
  try {
    dbCnnectionTypeOrm = await dbConn({ correct: true });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  (await dbCnnectionTypeOrm.close()) as Connection;
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
