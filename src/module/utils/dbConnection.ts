import { createConnection, getConnection } from "typeorm";

export default {
  async create() {
    await createConnection();
  },
  async close() {
    await getConnection().close();
  },
  async clear() {
    // getting the connected relation
    const connection = getConnection();
    //  getting all enttites
    const entities = connection.entityMetadatas;
    // iterating over the entities to clear the table [ Entity ] using getRepository
    entities.forEach(async (entity) => {
      const repos = connection.getRepository(entity.name);
      await repos.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
