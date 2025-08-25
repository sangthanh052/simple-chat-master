import { Module } from '@nestjs/common';

import { DatabaseModule } from './../common/database/database.module';
import { ChatsRepository } from './chats.repository';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';
import { ChatSchema } from './entities/chat.document';
import { Chat } from './entities/chat.entity';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MessagesModule,
  ],
  providers: [ChatsResolver, ChatsService, ChatsRepository],
  exports: [ChatsRepository],
})
export class ChatsModule {}
