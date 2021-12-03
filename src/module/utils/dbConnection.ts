import { Connection, createConnection } from "typeorm";

interface ICorrect {
  correct: boolean;
}

export const dbConn = async ({
  correct = false,
}: ICorrect): Promise<Connection> => {
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
    entities: ["../../entities/**/*.ts"],
  });
};
