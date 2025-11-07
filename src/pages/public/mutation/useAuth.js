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
  const { setPending, setSuccess, setError, clearMutation } = useBoundStore();

  ////API
  const register = async (data) => {
    const response = await handleRequest(() =>
      API.post("/api/auth/register", data)
    );
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

  const forgotPassword = async (payload) => {
    const { data } = await API.post("api/auth/password/forgot", payload);
    return data;
  };

  const resetPassword = async (payload) => {
    const { data } = await API.post("api/auth/password/reset", payload);
    return data;
  };

  ////Mutations
  const logoutMutation = useMutation({
    mutationFn: () => logoutApi,
    onSuccess: () => {
      setSuccess({ message: "Logout successful." });
      logout();
    },
    onError: (error) => {
      console.error("Logout failed:", error.response?.data || error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setSuccess({ message: "Registration successful." });
    },
    onError: (error) => {
      setError(error.response.data);
    },
    onSettled: () => setPending(false),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onMutate: () => {
      setPending(true);
    },
    onSuccess: (data) => {
      setSuccess({ message: "Login successfully." });
      setUserAndToken({
        user: data.user,
        token: data.token,
      });
      setPermissions(data?.permissions);
      navigate("/home");
    },
    onError: (error) =>
      setError({ message: error.response.data.errors.email[0] }),
    onSettled: () => setPending(false),
  });

  const forgotPassMutation = useMutation({
    mutationFn: forgotPassword,
  });
  const resetPassMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setSuccess({ message: "Password reset successful." });
    },
  });

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
    forgotPassMutation,
    resetPassMutation,
  };
}

export default useAuth;
