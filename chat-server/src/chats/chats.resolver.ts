import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from './../auth/current-user.decorator';
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { TokenPayload } from './../auth/token-payload.interface';
import { ChatsService } from './chats.service';
import { CreateChatInput } from './dto/create-chat.input';
import { Chat } from './entities/chat.entity';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Chat)
  createChat(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @CurrentUser() user: TokenPayload,
  ): Promise<Chat> {
    return this.chatsService.create(createChatInput, user._id);
  }

  @Query(() => [Chat], { name: 'chats' })
  @UseGuards(GqlAuthGuard)
  findAll(): Promise<Chat[]> {
    return this.chatsService.findMany();
  }

  @Query(() => Chat, { name: 'chat' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('_id') _id: string): Promise<Chat> {
    return this.chatsService.findOne(_id);
  }
}
