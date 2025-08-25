import { forwardRef, Module } from '@nestjs/common';

import { ChatsModule } from '../chats.module';
import { UsersModule } from './../../users/users.module';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';

@Module({
  imports: [forwardRef(() => ChatsModule), UsersModule],
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
