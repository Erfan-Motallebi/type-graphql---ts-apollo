import dbConnection from "../../utils/dbConnection";

dbConnection({ correct: true }).then(() => process.exit());
