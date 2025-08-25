import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetMe } from "../../hooks/useGetMe";

interface Props {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  extraFields?: React.ReactNode[];
  error?: string;
}

const Auth: React.FC<Props> = ({
  submitLabel,
  onSubmit,
  children,
  extraFields,
  error,
}) => {
  const [email, $email] = useState("");
  const [password, $password] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: "360px",
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={({ target: { value } }) => $email(value)}
        error={!!error}
        helperText={error}
      />
      {extraFields}
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={({ target: { value } }) => $password(value)}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>

      {children}
    </Stack>
  );
};

export default Auth;
