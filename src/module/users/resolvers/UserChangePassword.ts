import bcryptJS from "bcryptjs";
import { Args, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entities/User";
import { ChangePasswordInput, ILoginContextReuqest, UserType } from "../types";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => UserType)
  async changePassword(
    @Args() { email, oldPassword, password }: ChangePasswordInput,
    @Ctx() { req, res }: ILoginContextReuqest
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isMatched = await bcryptJS.compare(oldPassword, user.password);
    if (!isMatched) {
      return null;
    }

    const newHashPassword = await bcryptJS.hash(password, 12);

    user.password = newHashPassword;
    await user.save();

    // Cookie Registration
    req.session!.userId = user.id;

    return user;
  }
}
