import axios from "axios";
import { queryClient } from "../queryClient";

export const handleRequest = async (requestFn, invalidateKeys = []) => {
  console.log("requesting...");

  const response = await requestFn();

  for (const key of invalidateKeys) {
    const queryKey = Array.isArray(key) ? key : [key];
    queryClient.invalidateQueries({ queryKey });
  }

  return response;
};
