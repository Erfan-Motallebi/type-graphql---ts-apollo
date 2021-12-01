import bcryptJS from "bcryptjs";
import { User } from "../../../entities/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { ILoginContextReuqest, LoginInput, UserType } from "../types";
import { Redis } from "../../../redis";

@Resolver()
export class LoginResolver {
  @Mutation(() => UserType, {
    description: "User Login Mutation",
    nullable: true,
  })
  async login(
    @Arg("loginData") { username, email, password }: LoginInput,
    @Ctx() { req, res }: ILoginContextReuqest
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email, first_name: username } });
    if (!user) {
      return null;
    }

    const isMatched = await bcryptJS.compare(password, user.password);

    if (!isMatched) {
      return null;
    }

    if (user.confirmity) {
      return null;
    }
    req.session!.userId = user.id;
    // For more applicable use of Cookie - Redis Store [ In-Memory Cache]
    Redis.set("cookie", user.id, "ex", 60 * 60);

    return user;
  }
}
