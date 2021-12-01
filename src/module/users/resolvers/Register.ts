import {
  Args,
  // Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import bcryptJS from "bcryptjs";
import { UserInputType, UserType } from "../types";
import { AuthMiddleware } from "../userMiddlewares";
import { User } from "../../../entities/User";
import { userUrlMaker } from "../../utils/userURLMaker";
import { sendEmailConfirmation } from "../../utils/userEmailConfirm";

@Resolver((of) => UserType)
export class RegisterResolver {
  @Query(() => String, {
    name: "Greeing",
    description: "Hello World to Developers",
  })
  // @Authorized()
  @UseMiddleware(AuthMiddleware)
  async hello() {
    return "Hello World";
  }

  @FieldResolver()
  fullName(@Root() parent: UserType): string {
    return `FullName would be: ${parent.first_name} -  ${parent.last_name}`;
  }

  @Mutation(() => UserType)
  async addUser(
    @Args({ validate: { validationError: { target: false } } })
    { first_name, last_name, email, password }: UserInputType
  ): // @Arg("data") { email, first_name, last_name, password }: UserInputType
  Promise<User> {
    const hashedPassword = await bcryptJS.hash(password, 12);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    }).save();

    // User Email Confirmation
    await sendEmailConfirmation(email, await userUrlMaker({ userId: user.id }));

    return user;
  }
}
