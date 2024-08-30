import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getUsers = () => api.get("/users");
export const getUserById = (id: string) => api.get(`/users/${id}`);

// Modifications are faked on JSONPlaceholder, hence the functions below are mock
export const createUser = (data: {
  name: string;
  email: string;
  phone: string;
}) => api.post("/users", data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);