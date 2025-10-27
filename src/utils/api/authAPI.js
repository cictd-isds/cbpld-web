import API from "./apiClient";

export const loginApi = async (data) => {
  // Laravel Sanctum CSRF setup (optional if enabled)
  await API.get("/sanctum/csrf-cookie").catch(() => {});
  const response = await API.post("api/auth/login", data);
  return response.data;
};

export const registerApi = async (data) => {
  await API.get("/sanctum/csrf-cookie").catch(() => {});
  const response = await API.post("api/auth/register", data);
  return response.data;
};

export const logoutApi = async (token) => {
  const response = await API.post("api/auth/logout");
  return response.data;
};
