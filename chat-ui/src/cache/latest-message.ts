import { ApolloCache } from "@apollo/client";

import { Message } from "../gql/graphql";
import { getChatsDocument } from "../hooks/useGetChats";

export const updateLatestMessages = (
  cache: ApolloCache<any>,
  message: Message
) => {
  const chats = [
    ...(cache.readQuery({ query: getChatsDocument })?.chats || []),
  ];
  const cachedChatIdx = chats.findIndex((chat) => chat._id === message.chatId);
  if (cachedChatIdx === -1) {
    return;
  }
  const cachedChat = chats[cachedChatIdx];
  const _cachedChat = { ...cachedChat };
  _cachedChat.latestMessage = message;
  chats[cachedChatIdx] = _cachedChat;
  cache.writeQuery({
    query: getChatsDocument,
    data: {
      chats,
    },
  });
};
