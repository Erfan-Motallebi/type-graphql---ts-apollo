import { createConnection } from "typeorm";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express, { Express, Request } from "express";
import { buildSchema } from "type-graphql";
import expressSession from "express-session";
import connectRedis from "connect-redis";
import { nanoid } from "nanoid";
import { Redis } from "./redis";
import cors, { CorsOptions } from "cors";
import { ILoginContextReuqest } from "./module/users/types";
import { customAuthChecker } from "./module/users/AuthChecker";

async function bootStrap() {
  await createConnection();

  interface ContextType extends ILoginContextReuqest {}

  const schema = await buildSchema({
    resolvers: [__dirname + "/module/users/resolvers/**/*.ts"],
    // dateScalarMode: "timestamp",
    // nullableByDefault:
    // validate:
    authChecker: customAuthChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: ILoginContextReuqest) => ({ req, res }),
  });

  await server.start();
  const app: Express = express();
  const RedisStore = connectRedis(expressSession as any);

  const corOptions: CorsOptions = {
    methods: ["POST"],
    origin: "https://studio.apollographql.com",
    credentials: true,
  };
  app.use(cors(corOptions));
  app.use(cors());
  app.use(
    expressSession({
      name: "QID",
      store: new RedisStore({ client: Redis }) as any,
      secret: "abcdef",
      resave: false,
      saveUninitialized: false,
      genid(req: Request) {
        return nanoid();
      },
      cookie: {
        secure: true,
        sameSite: "none",
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      },
    })
  );

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, "localhost", async () => {
    console.log("Server Ready at http://localhost:4000");
  });
}

bootStrap();
