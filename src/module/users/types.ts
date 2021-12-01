import { IsEmail, Length, MinLength, Validate } from "class-validator";
import { Request, Response } from "express";
import {
  ArgsType,
  Field,
  ID,
  InputType,
  InterfaceType,
  ObjectType,
} from "type-graphql";
import { User } from "../../entities/User";
import { CustomTextLength } from "../utils/emailContextCheck";

@InterfaceType()
abstract class SharedUserInterface {
  @Field()
  @IsEmail(null, { message: "Email must be valid." })
  email: string;

  @Field()
  password: string;
}
@ArgsType()
class SharedUserArgsType {
  @Field()
  @IsEmail(null, { message: "Email must be valid." })
  email: string;

  @MinLength(5, { message: "Minimum password length is 5 letters." })
  @Field()
  password: string;
}

@ObjectType({ description: "Input for a new user registration" })
export class UserType implements Partial<User> {
  @Field(() => ID)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  // @Field()
  // fullName(@Root() parent: User): string {
  //   return `FullName would be: ${parent.first_name} -  ${parent.last_name}`;
  // }

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

@ArgsType()
export class UserInputType extends SharedUserArgsType {
  @Length(5, 100, { message: "Must be between 10 - 100 letters" })
  @Field()
  first_name: string;

  @Validate(CustomTextLength)
  @Field()
  last_name: string;
}

@InputType()
export class LoginInput {
  @Length(5, 100, { message: "Not correct to go!" })
  @Field()
  username: string;

  @Field()
  @IsEmail(null, { message: "Email must be valid." })
  email: string;

  @MinLength(5, { message: "Minimum password length is 5 letters." })
  @Field()
  password: string;
}

export interface ILoginContextReuqest {
  req: Request;
  res: Response;
}

export interface IUserUrlMaker {
  userId: number | string;
}

@InputType()
export class UserConfirmityInputType {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  token: string;
}

@ArgsType()
export class ChangePasswordInput extends SharedUserArgsType {
  @Field()
  oldPassword: string;
}
