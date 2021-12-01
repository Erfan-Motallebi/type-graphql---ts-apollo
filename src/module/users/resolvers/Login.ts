import bcryptJS from "bcryptjs";
import { User } from "../../../entities/User";
import { IsEmail, Length, MinLength } from "class-validator";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { ILoginContextReuqest, UserType } from "../types";
import { Redis } from "../../../redis";

@InputType()
class LoginInput {
  @Length(5, 100, { message: "Not correct to go!" })
  @Field()
  username: string;

  @IsEmail({}, { message: "Email not correct to go!" })
  @Field()
  email: string;

  @MinLength(5, { message: "Minimum password length is 5 letters." })
  @Field()
  password: string;
}

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
