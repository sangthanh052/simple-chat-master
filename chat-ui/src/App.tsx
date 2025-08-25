import { ApolloProvider } from "@apollo/client";
import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";

import Guard from "./components/auth/Guard";
import ChatList from "./components/chat-list/ChatList";
import Header from "./components/header/Header";
import route from "./components/Routes";
import Snackbar from "./components/snackbar/Snackbar";
import client from "./constants/apollo-client";
import { usePath } from "./hooks/usePath";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const { path } = usePath();

  const isShowingChatList = path === "/" || path.includes("chats");

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          <Container maxWidth="lg" sx={{ marginTop: "1rem" }}>
            {isShowingChatList ? (
              <Grid container spacing={5}>
                <Grid item xs={12} md={5} lg={4} xl={3}>
                  <ChatList />
                </Grid>

                <Grid item xs={12} md={7} lg={8} xl={9}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>

        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const Routes = () => {
  return <RouterProvider router={route} />;
};

export default App;
