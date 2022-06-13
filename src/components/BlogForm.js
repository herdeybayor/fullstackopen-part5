import React from "react";

function BlogForm({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
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
  );
}

export default BlogForm;
