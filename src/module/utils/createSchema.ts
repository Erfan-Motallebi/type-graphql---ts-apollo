import { UserLogoutResolver } from "./../users/resolvers/UserLogout";
import { ChangePasswordResolver } from "./../users/resolvers/UserChangePassword";
import { UserForgotPasswordResolver } from "./../users/resolvers/UserForgotPassword";
import { RegisterResolver } from "./../users/resolvers/Register";
import { LoginResolver } from "./../users/resolvers/Login";
import path from "path/posix";
import { buildSchema } from "type-graphql";
import { customAuthChecker } from "../users/AuthChecker";
import { UserConfirmResolver } from "./../users/resolvers/ConfirmUser";

const resolverPath =
  path.join(__dirname, "..", "users", "resolvers") + "/**/*.ts";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [
      UserConfirmResolver,
      LoginResolver,
      RegisterResolver,
      UserForgotPasswordResolver,
      ChangePasswordResolver,
      UserLogoutResolver,
    ],
    authChecker: customAuthChecker,
  });
};
