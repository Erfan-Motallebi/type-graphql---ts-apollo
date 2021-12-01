import bcryptJS from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entities/User";
import { Redis } from "../../../redis";
import { userUrlMaker } from "../../utils/userURLMaker";
import { UserConfirmityInputType, UserType } from "../types";

@Resolver()
export class UserConfirmResolver {
  @Mutation(() => UserType)
  async userConfirmation(
    @Arg("confirmData") { email, token }: UserConfirmityInputType
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const tokenAlready = await Redis.get("token");
    if (token !== tokenAlready) {
      throw new Error("Token failed to go");
    }
    await Redis.del("token");
    return user;
  }
}
