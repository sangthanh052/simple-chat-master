import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { Chat } from "../../../gql/graphql";
import route from "../../Routes";

interface ChatListItemProps {
  chat: Chat;
  selected: boolean;
}

const ChatListItem = ({ chat, selected }: ChatListItemProps) => {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          alignItems="flex-start"
          onClick={() => route.navigate(`/chats/${chat._id}`)}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chat.latestMessage?.user.username || "Username"}
                </Typography>
                {" - "}
                {chat.latestMessage?.content ||
                  "The conversation has been created"}
              </>
            }
          />
        </ListItemButton>
      </ListItem>

      <Divider />
    </>
  );
};

export default ChatListItem;
