import { randomUUID } from "crypto";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entities/User";
import { Redis } from "../../../redis";
import { sendEmailConfirmation } from "../../utils/userEmailConfirm";
import { userUrlMaker } from "../../utils/userURLMaker";

@Resolver()
export class UserForgotPasswordResolver {
  @Mutation(() => Boolean)
  async changePassword(@Arg("email") email: string): Promise<boolean | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }
    const token = randomUUID();
    // Email Send Process
    await Redis.set("token", token, "ex", 60 * 60);
    const url = `http://localhost/change-password/${token}`;
    await sendEmailConfirmation(email, url);
    user.confirmity = true;
    await user.save();
    return true;
  }
}
