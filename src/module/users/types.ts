import { IsEmail, Length, Validate } from "class-validator";
import { Request, Response } from "express";
import { ArgsType, Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "../../entities/User";
import { CustomTextLength } from "../utils/emailContextCheck";

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
@InputType()
export class UserInputType {
  @Length(5, 100, { message: "Must be between 10 - 100 letters" })
  @Field()
  first_name: string;

  @Validate(CustomTextLength)
  @Field()
  last_name: string;

  @IsEmail({}, { message: "Must be a real email" })
  @Field()
  email: string;

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
@InputType()
export class ChangePasswordInput {
  @Field()
  @IsEmail(null, { message: "Email must be a valid one" })
  email: string;

  @Field()
  newPassword: string;

  @Field()
  oldPassword: string;
}
