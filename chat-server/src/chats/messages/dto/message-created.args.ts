import { IsArray, IsNotEmpty } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class MessageCreatedArgs {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ each: true })
  chatIds: string[];
}
