/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  logoutUser,
  registerRider,
  loginRider,
} from "@/services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/user-login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useRiderRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerRider,
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/rider-login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useRiderLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginRider,
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    logoutUser();
    queryClient.clear();
    toast.success("Logged out successfully!");
  };
};
