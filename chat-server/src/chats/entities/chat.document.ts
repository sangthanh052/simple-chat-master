import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { MessageDocument } from '../messages/entities/message.document';
import { AbstractEntity } from './../../common/database/abstract.entity';

@Schema()
export class ChatDocument extends AbstractEntity {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  messages: MessageDocument[];
}

export const ChatSchema = SchemaFactory.createForClass(ChatDocument);
