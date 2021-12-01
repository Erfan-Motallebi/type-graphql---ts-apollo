import { AuthChecker } from "type-graphql";
import { Redis } from "../../redis";
import { ILoginContextReuqest } from "./types";

export const customAuthChecker: AuthChecker<ILoginContextReuqest> = (
  { args, context: { req, res } },
  role
) => {
  const cookie = Redis.get("cookie");
  if (req.session!.userId || cookie) {
    return true;
  } else {
    return false;
  }
};
