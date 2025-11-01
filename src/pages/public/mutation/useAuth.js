import { useMutation } from "@tanstack/react-query";
import API from "../../../utils/api/apiClient";
import { handleRequest } from "../../../utils/api/handleRequest";
import { useNavigate } from "react-router";
import { useBoundStore } from "../../../store/store";

function useAuth() {
  const navigate = useNavigate();
  const setUserAndToken = useBoundStore((state) => state.setUserAndToken);
  const logout = useBoundStore((state) => state.logout);
  const setPermissions = useBoundStore((state) => state.setPermissions);

  const register = async (data) => {
    const response = handleRequest(() => API.post("/api/auth/register", data));
    return response.data;
  };

  const login = async (data) => {
    const response = await handleRequest(() =>
      API.post("/api/auth/login", data)
    );
    return response.data;
  };

  const logoutApi = async () => {
    const response = await API.post("api/auth/logout");
    return response.data;
  };

  const logoutMutation = useMutation({
    mutationFn: () => logoutApi,
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      console.error("Logout failed:", error.response?.data || error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
  });
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUserAndToken({
        user: data.user,
        token: data.token,
      });
      setPermissions(data?.permissions);
      navigate("/home");
    },
  });
  return { registerMutation, loginMutation, logoutMutation };
}

export default useAuth;
