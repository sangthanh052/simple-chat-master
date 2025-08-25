import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}
