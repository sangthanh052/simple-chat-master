import { Field, ObjectType } from '@nestjs/graphql';

import { Message } from '../messages/entities/message.entity';
import { AbstractEntity } from './../../common/database/abstract.entity';

@ObjectType()
export class Chat extends AbstractEntity {
  @Field()
  name: string;

  @Field(() => Message, { nullable: true })
  latestMessage?: Message;
}
