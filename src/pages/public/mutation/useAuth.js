import { useMutation } from "@tanstack/react-query";
import API from "../../../utils/api/apiClient";
import { handleRequest } from "../../../utils/api/handleRequest";
import { useNavigate } from "react-router";
import { useBoundStore } from "../../../store/store";
import { useSnackbarStore } from "../../../store/snackbarStore";

function useAuth() {
  const navigate = useNavigate();
  const setUserAndToken = useBoundStore((state) => state.setUserAndToken);
  const logout = useBoundStore((state) => state.logout);
  const setPermissions = useBoundStore((state) => state.setPermissions);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

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

  const fakeForgotPasswordRequest = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, firstName, lastName, birthday } = data;

        if (
          email === "123@example.com" &&
          firstName === "123" &&
          lastName === "123" &&
          birthday === "123"
        ) {
          resolve({ message: "Password reset successful!" });
        } else {
          reject(new Error("Invalid user information. Please try again."));
        }
      }, 1500);
    });
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
    onSuccess: (data) => {
      showSnackbar("success", "Registration successful!");
    },
    onError: (error) => {
      if (error.status === 422) {
        showSnackbar(
          "error",
          error.response.data.message || "Registration failed!"
        );
        return;
      }
      showSnackbar("error", error.message || "Registration failed!");
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUserAndToken({
        user: data.user,
        token: data.token,
      });
      setPermissions(data?.permissions);
      showSnackbar("success", "Login successful!");
      navigate("/home");
    },
    onError: (error) => {
      if (error.status === 422) {
        showSnackbar("error", error.response.data.message || "Login failed!");
        return;
      }
      showSnackbar("error", error.message || "Login failed!");
    },
  });

  const forgotPassMutation = useMutation({
    mutationFn: forgotPassword,
  });
  const resetPassMutation = useMutation({
    mutationFn: resetPassword,
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
