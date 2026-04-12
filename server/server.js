const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
