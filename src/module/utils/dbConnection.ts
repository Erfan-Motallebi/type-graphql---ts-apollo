import { Connection, createConnection } from "typeorm";

interface ICorrect {
  correct: boolean;
}

export const dbConn = async ({ correct = false }: ICorrect) => {
  let db;
  try {
    db = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "rootroot",
      database: "TypeGraphQLJest",
      // logging: true,
      synchronize: correct,
      dropSchema: correct,
      entities: ["../../entities/**/*.ts"],
    });
  } catch (error) {
    console.log(error);
  }
  return db;
};
