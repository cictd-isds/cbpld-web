import React from "react";
import { useMutation } from "@tanstack/react-query";
import API from "../../../utils/api";
import { useBoundStore } from "../../../store/store";

function useAuth() {
  const csrf = async () => {
    await API.get("/sanctum/csrf-cookie");
  };

  const setToken = useBoundStore((state) => state.setToken);
  const setUser = useBoundStore((state) => state.setUser);

  const register = async (data) => {
    await csrf();
    const response = await API.post("/api/register", data);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };
  const registerMutation = useMutation({
    mutationFn: register,
  });

  const login = async (data) => {
    await csrf();
    const response = await API.post("/api/login", data);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };
  const loginMutation = useMutation({
    mutationFn: login,
  });
  return { registerMutation, loginMutation };
}

export default useAuth;
