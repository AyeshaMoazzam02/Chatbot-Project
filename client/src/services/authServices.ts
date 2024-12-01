import axios from "axios";
import { API_URL } from "@/constants";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/signin`, {
    email,
    password,
  });
  return response.data;
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/signup`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async (
  token: string | null,
  new_password: string
) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, {
    token,
    new_password,
  });
  return response.data;
};

export const uploadFiles = async (formData: FormData) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error in uploadFiles:", error.response || error.message);
    throw error;
  }
};

export const userProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (token: string | null, data: any) => {
  try {
    const response = await axios.patch(`${API_URL}/profile/me`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const uploadProfilePicture = async (
  token: string | null,
  file: File
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${API_URL}/profile/upload-profile-picture`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
