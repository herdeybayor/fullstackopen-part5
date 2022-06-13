import React, { useState } from "react";

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogPost = async (e) => {
    e.preventDefault();
    const newBlog = { title, author, url };
    await addBlog(newBlog);

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogPost}>
        <label htmlFor="title">title: </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          value={title}
          required
        />
        <br />
        <label htmlFor="author">author: </label>
        <input
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          id="author"
          value={author}
          required
        />
        <br />
        <label htmlFor="url">url: </label>
        <input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          id="url"
          value={url}
          required
        />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default BlogForm;
