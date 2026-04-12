import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const createPost = async (post) => {
  const response = await api.post('/posts', post);
  return response.data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};
