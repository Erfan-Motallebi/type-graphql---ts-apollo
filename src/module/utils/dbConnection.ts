import { createConnection, getConnection } from "typeorm";

// export default {
//   async create() {
//     await createConnection();
//   },
//   async close() {
//     await getConnection().close();
//   },
//   async clear() {
//     //  getting all enttites
//     const entities = getConnection().entityMetadatas;
//     // iterating over the entities to clear the table [ Entity ] using getRepository
//     entities.forEach(async (entity) => {
//       const repos = getConnection().getRepository(entity.name);
//       await repos.query(`DELETE FROM ${entity.tableName}`);
//     });
//   },
// };

interface ICorrect {
  correct?: boolean;
}

export default async function dbConnection({ correct = false }: ICorrect) {
  return await createConnection({
    name: "graphForTest",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "rootroot",
    database: "TypeGraphQLJest",
    synchronize: correct,
    dropSchema: correct,
    entities: [__dirname + "./../../entities/**/*.ts"],
  });
}
