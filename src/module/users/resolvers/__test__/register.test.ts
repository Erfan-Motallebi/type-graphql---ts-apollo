import { graphCall } from "../../../utils/graphCall";
import { resolverMutation } from "../../../utils/resolvers";
import Request from "supertest";
import { Connection } from "typeorm";
import dbConnection from "../../../utils/dbConnection";

let conn: Connection;

beforeAll(async () => {
  conn = await dbConnection({ correct: true });
});

afterAll(async () => {
  await conn.close();
});

describe("User Registration Rersolver Test", () => {
  test("should return a user when it gets done", async () => {
    try {
      const resp = await graphCall({
        source: resolverMutation,
        variableValues: {
          firstName: "test",
          lastName: "forTest",
          email: "test@test.com",
          password: "12356",
        },
      });
      console.log({ resp });
    } catch ({ data, location, path }) {
      console.log({ data, location, path });
    }

    // await Request(app)
    //   .post("/")
    //   .set("Content-Type", "application/json")
    //   .set("Accept", "application/json")
    //   .send({
    //     query: resolverMutation,
    //     operationName: "AddUser",
    //     variables: {
    //       firstName: "Erfan",
    //       lastName: "Motallebi",
    //       email: "eZipcoder@gmail.com",
    //       password: "123456",
    //     },
    //   })
    //   .expect(200);
  });
});
