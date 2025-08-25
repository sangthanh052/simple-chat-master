import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useGetChat } from "../../hooks/useGetChat";
import { useGetMessages } from "../../hooks/useGetMessages";

const Chat = () => {
  const params = useParams();
  const chatId = params._id!;
  const [message, $message] = useState("");
  const [createMessage] = useCreateMessage();
  const { data: chat } = useGetChat({ _id: chatId });
  const { data: messages } = useGetMessages({
    chatId,
  });
  const location = useLocation();
  const divRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    $message("");
    scrollToBottom();
  }, [location, messages]);

  const handleSubmit = async () => {
    if (!message.length) return;
    await createMessage({
      variables: {
        createMessageInput: {
          chatId,
          content: message,
        },
      },
    });
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{chat?.chat.name}</h1>

      <Box sx={{ maxHeight: "70vh", overflow: "auto " }}>
        {messages?.messages &&
          [...messages.messages]
            .sort(
              (prev, next) =>
                new Date(prev.createdAt).getTime() -
                new Date(next.createdAt).getTime()
            )
            .map((e) => (
              <Grid container alignItems={"center"} marginBottom={"1rem"}>
                <Grid item style={{ width: "68px" }}>
                  <Avatar src="" sx={{ width: 52, height: 52 }} />
                </Grid>
                <Grid item xs>
                  <Stack>
                    <Paper sx={{ width: "fit-content" }}>
                      <Typography sx={{ padding: "0.5rem" }}>
                        {e.content}
                      </Typography>
                    </Paper>
                    <Typography variant="caption" sx={{ margin: "0.25rem" }}>
                      {new Date(e.createdAt).toLocaleTimeString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            ))}
        <div ref={divRef} />
      </Box>

      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Send a message ..."
          value={message}
          onChange={(event) => $message(event.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleSubmit();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          disabled={!message.length}
          color="primary"
          sx={{ p: "10px" }}
          onClick={handleSubmit}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
