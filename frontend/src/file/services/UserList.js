import axios from "axios";

export const getOneUser = async (username) =>
{
  const res = await axios.get(`http://localhost:3000/users/${username}`);
  return res.data;
};

export const getAllUsers = async () =>
{
  const res = await axios.get(`http://localhost:3000/users`);
  return res.data;
};

export const newUser = async (name) =>
{
  let user = {name: name}
  let res = await axios.post(`http://localhost:3000/users`, user);
  return res.data;
};

export const deleteOneUser = async (username) => 
{
  const res = await axios.delete(`http://localhost:3000/users/${username}`);
  return res.data;
};

export const newComment = async (username,comments) =>
{
  let commentaire = { comments:comments};
  const res = await axios.put(`http://localhost:3000/users/${username}`, commentaire);
  return res.data;
};