import { Ctx, Mutation, Resolver } from "type-graphql";
import { Redis } from "../../../redis";
import { ILoginContextReuqest } from "../types";

@Resolver()
export class UserLogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: ILoginContextReuqest): Promise<boolean> {
    // Redis Cookie Deletion
    await Redis.del("cookie");

    // Session Cookie destory
    // req.session?.destroy((err: any) => {
    //   if (err) {
    //     throw new Error("Failed to log out");
    //   }
    // });

    // For a specific user
    req.session!.userId = null;

    return true;
  }
}
