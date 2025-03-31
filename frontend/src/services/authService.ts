import { RegisterRiderType } from "@/pages/RiderSignupPage";
import axios from "axios";

export const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const registerUser = async (data: {
  fullname: { firstname: string; lastname?: string };
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/users/register`, data);
  return response.data;
};

export const registerRider = async (data: RegisterRiderType) => {
  const finalData = {
    fullname: {
      firstname: data.firstname,
      lastname: data.lastname,
    },
    email: data.email,
    password: data.password,
    vehicle: {
      color: data.vehicleColor,
      plate: data.vehiclePlate,
      capacity: data.vehicleCapacity,
      vehicleType: data.vehicleType,
    },
  };
  const response = await axios.post(`${API_URL}/riders/register`, finalData);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/users/login`, data);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const loginRider = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/riders/login`, data);
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
