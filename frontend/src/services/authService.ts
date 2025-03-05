import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

export const registerUser = async (data: {
  fullname: { firstname: string; lastname?: string };
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, data);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
