import { Redis } from "./../../redis";
import { AuthenticationError } from "apollo-server-errors";
import { randomUUID } from "crypto";
import { User } from "../../entities/User";
import { IUserUrlMaker } from "../users/types";

export async function userUrlMaker({ userId }: IUserUrlMaker) {
  const token = randomUUID();
  await Redis.set("token", token, "ex", 60 * 60);
  await User.update({ id: +userId }, { confirmity: true });
  return `http://localhost/confirmity/${token}`;
}
