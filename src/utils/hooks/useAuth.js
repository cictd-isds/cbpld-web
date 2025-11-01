// import { useMutation } from "@tanstack/react-query";
// import { useGetUserToken, useUserActions } from "../../store/UserSlice";
// import { loginApi, logoutApi, registerApi } from "../api/authAPI";
// import { useNavigate } from "react-router";

// export function useAuth() {
//   const { setUserAndToken, logout } = useUserActions();
//   const token = useGetUserToken();
//   const navigate = useNavigate();
//   // LOGIN
//   const loginMutation = useMutation({
//     mutationFn: loginApi,
//     onSuccess: (data) => {
//       setUserAndToken({
//         user: data.user,
//         token: data.token,
//       });
//       navigate("/home");
//     },
//     onError: (error) => {
//       console.error("Login failed:", error.response?.data || error.message);
//     },
//   });

//   // REGISTER
//   const registerMutation = useMutation({
//     mutationFn: registerApi,
//     onSuccess: () => {
//       alert("Registration successful! You can now log in.");
//     },
//     onError: (error) => {
//       console.error(
//         "Registration failed:",
//         error.response?.data || error.message
//       );
//     },
//   });

//   // LOGOUT
//   const logoutMutation = useMutation({
//     mutationFn: () => logoutApi(token),
//     onSuccess: () => {
//       logout();
//     },
//     onError: (error) => {
//       console.error("Logout failed:", error.response?.data || error.message);
//     },
//   });

//   return { loginMutation, registerMutation, logoutMutation };
// }
