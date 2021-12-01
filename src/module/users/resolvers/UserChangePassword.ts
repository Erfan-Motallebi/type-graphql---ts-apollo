import bcryptJS from "bcryptjs";
import { Args, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entities/User";
import { ChangePasswordInput, UserType } from "../types";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => UserType)
  async changePassword(
    @Args() { email, oldPassword, newPassword }: ChangePasswordInput
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isMatched = await bcryptJS.compare(oldPassword, user.password);
    if (!isMatched) {
      return null;
    }

    const newHashPassword = await bcryptJS.hash(newPassword, 12);

    user.password = newHashPassword;
    await user.save();
    return user;
  }
}
