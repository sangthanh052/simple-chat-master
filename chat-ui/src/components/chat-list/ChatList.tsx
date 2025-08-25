import { Divider, Stack } from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useState } from "react";

import { useGetChats } from "../../hooks/useGetChats";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { usePath } from "../../hooks/usePath";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListItem from "./chat-list-item/ChatListItem";

const ChatList = () => {
  const [isChatListAddModalVisible, $isChatListAddModalVisible] =
    useState(false);
  const { data } = useGetChats();
  const [selectedChatId, $selectedChatId] = useState("");
  const { path } = usePath();

  useMessageCreated({ chatIds: data?.chats.map((e) => e._id) || [] });

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      $selectedChatId(pathSplit[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={isChatListAddModalVisible}
        onClose={() => {
          $isChatListAddModalVisible(false);
        }}
      />
      <Stack>
        <ChatListHeader
          onAddChat={() => {
            $isChatListAddModalVisible(true);
          }}
        />

        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats &&
            [...data.chats]
              .sort((prev, next) => {
                if (!prev.latestMessage) {
                  return -1;
                }
                return (
                  new Date(prev.latestMessage?.createdAt).getTime() -
                  new Date(next.latestMessage?.createdAt).getTime()
                );
              })
              .map((chat) => (
                <ChatListItem
                  chat={chat}
                  selected={chat._id === selectedChatId}
                />
              ))
              .reverse()}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
