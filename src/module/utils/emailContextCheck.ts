import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "LastNameLengthValidation", async: false })
export class CustomTextLength implements ValidatorConstraintInterface {
  validate(email: string, { value }: ValidationArguments) {
    return value.length > 5;
  }
  defaultMessage(args: ValidationArguments) {
    return "Email ($value) is too short or too long!";
  }
}
