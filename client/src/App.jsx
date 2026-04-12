import { useEffect, useState } from 'react';
import { getPosts, createPost, deletePost } from './api';
import './index.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError('Unable to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      return;
    }

    try {
      const newPost = await createPost({ title, body });
      setPosts((prev) => [newPost, ...prev]);
      setTitle('');
      setBody('');
      setError('');
    } catch (err) {
      setError('Unable to save post');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      setError('Unable to delete post');
    }
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Simple MERN Blog</h1>
        <p>Write, publish, and manage posts using a Node/Express API with MongoDB.</p>
      </header>

      <section className="post-form">
        <h2>Create a Post</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
            />
          </label>
          <label>
            Body
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your blog content..."
            />
          </label>
          <button type="submit">Publish</button>
        </form>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="post-list">
        <h2>Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. Create one above.</p>
        ) : (
          posts.map((post) => (
            <article key={post._id} className="post-card">
              <div className="post-head">
                <h3>{post.title}</h3>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
              <p>{post.body}</p>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
