import axios from "axios";
import { API_URL } from "@/constants";

export const login = async (email: string, password: string) => {
  return axios.post(`${API_URL}/users/login`, { email, password });
};

export const signup = async (name: string, email: string, password: string) => {
  return axios.post(`${API_URL}/users`, { name, email, password });
};

export const forgotPassword = async (email: string) => {
  return axios.post(`${API_URL}/users/forgot-password`, { email });
};
