import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";
import Auth from "./Auth";

const Login = () => {
  const { login, error } = useLogin();

  return (
    <Auth submitLabel="Login" onSubmit={login} error={error}>
      <Link to="/signup" style={{ alignSelf: "center" }}>
        <MUILink>Signup</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
