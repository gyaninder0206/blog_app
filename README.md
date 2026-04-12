# MERN Blog App

A basic full stack blog application built with MongoDB, Express, React, and Node.js.

## Setup

1. Install dependencies:
   ```bash
   npm run install-all
   ```

2. Create a `.env` file in `server/` with:
   ```bash
   MONGO_URI=mongodb://127.0.0.1:27017/blog_app
   PORT=5000
   ```

3. Start both server and client:
   ```bash
   npm run dev
   ```

4. Open the app at `http://localhost:5173`.

## Features

- Create blog posts
- List blog posts
- Delete blog posts
- Simple API with Express and MongoDB
