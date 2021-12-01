import { IsEmail, MaxLength, MinLength } from "class-validator";
// import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Field()

  @Column()
  first_name: string;

  // @Field()
  @Column()
  last_name: string;

  // @Field()
  @Column({ nullable: false, unique: true, type: "text" })
  email: string;

  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmity: boolean;

  // @Field()
  @CreateDateColumn()
  created_at: Date;

  // @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
