import { MiddlewareFn, NextFn } from "type-graphql";
import { ILoginContextReuqest } from "./types";
import { UserInputError } from "apollo-server-express";
import { Redis } from "../../redis";

export const AuthMiddleware: MiddlewareFn<ILoginContextReuqest> = async (
  { context: { req }, args, info, root },
  next: NextFn
) => {
  const userId = await Redis.get("cookie");
  if (req.session!.userId || userId) {
    return true;
  }
  if (!req.session!.userId) {
    throw new UserInputError("Not Authorized yet! try again later.");
  }
  return next();
};
