import { useState } from "react";

const Blog = ({
  blog: { id, user, title, author, url, likes },
  likeBlog,
  removeBlog,
  user: loggedUser,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevValue) => !prevValue);
  };

  const handleBlogLike = async () => {
    const blogToUpdate = { likes: likes + 1 };
    await likeBlog(id, blogToUpdate);
  };

  const handleBlogRemove = async () => {
    const confirmation = window.confirm(`Remove ${title} by ${author}`);
    if (confirmation) {
      return await removeBlog(id);
    } else {
      return;
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <p id="blog-title">
        {title}{" "}
        <button onClick={toggleVisibility}>
          {isVisible ? "hide" : "view"}
        </button>
      </p>
      {isVisible && (
        <>
          <p id="blog-url">{url}</p>
          <p id="blog-likes">
            likes {likes} <button onClick={handleBlogLike}>like</button>
          </p>
          <p id="blog-author">{author}</p>
          {loggedUser.username === user.username && (
            <button onClick={handleBlogRemove}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
