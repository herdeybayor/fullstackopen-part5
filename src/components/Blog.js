import { useState } from "react";

const Blog = ({ blog: { id, user, title, author, url, likes }, likeBlog }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevValue) => !prevValue);
  };

  const handleBlogLike = async () => {
    const blogToUpdate = { likes: likes + 1 };
    await likeBlog(id, blogToUpdate);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <p>
        {title}{" "}
        <button onClick={toggleVisibility}>
          {isVisible ? "hide" : "view"}
        </button>
      </p>
      {isVisible && (
        <>
          <p>{url}</p>
          <p>
            likes {likes} <button onClick={handleBlogLike}>like</button>
          </p>
          <p>{author}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
