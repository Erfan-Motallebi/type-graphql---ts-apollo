import { Connection, createConnection } from "typeorm";

export const dbConn = async (correct: boolean = false): Promise<Connection> => {
  return await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "rootroot",
    database: "TypeGraphQL-Test-jest",
    // logging: true,
    synchronize: correct,
    dropSchema: correct,
    entities: ["./src/entities/*.*"],
  });
};
