import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000" }); // ajuste se necessário

export const fetchPosts = () => API.get("/posts/");
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (data) => API.post("/posts/", data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);

export const fetchUsers = () => API.get("/users/");
export const fetchUser = (id) => API.get(`/users/${id}`);
export const createUser = (data) => API.post("/users/", data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data); 