import { useState } from "react";

import client from "../constants/apollo-client";
import { API_URL } from "../constants/urls";

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, $error] = useState("");

  const login = async (request: LoginRequest) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (!res.ok) {
      if (res.status === 401) {
        $error("Credentials are not valid");
      } else {
        $error("Unknown error occurred");
      }
      return;
    }
    $error("");
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useLogin };
