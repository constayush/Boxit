
import api from "../api/api";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const res = await api.post("/auth/register", data);
  return res.data; 
};


export const loginUser = async (data: RegisterData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const fetchMe = async () => {
  const res = await api.get("/auth/me", { withCredentials: true }); 
  console.log("Fetched user:", res.data);
  return res.data; 
};

export const logoutUser = async () => {
  await api.post("/auth/logout", {}, { withCredentials: true });
};