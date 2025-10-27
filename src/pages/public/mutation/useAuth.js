import React from "react";
import { useMutation } from "@tanstack/react-query";
import API from "../../../utils/api/apiClient";
import { useUserActions } from "../../../store/UserSlice";

function useAuth() {
  const { setUserAndToken } = useUserActions();

  const csrf = async () => {
    await API.get("/sanctum/csrf-cookie");
  };

  const register = async (data) => {
    await csrf();
    const response = await API.post("/api/auth/login", data);
    setUserAndToken({
      user: response.data.user,
      token: response.data.token,
    });
    return response.data;
  };

  const login = async (data) => {
    await csrf();
    const response = await API.post("/api/login", data);
    setUserAndToken({
      user: response.data.user,
      token: response.data.token,
    });
    return response.data;
  };

  const registerMutation = useMutation({
    mutationFn: register,
  });
  const loginMutation = useMutation({
    mutationFn: login,
  });
  return { registerMutation, loginMutation };
}

export default useAuth;
