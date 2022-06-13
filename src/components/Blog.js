import { useState } from "react";

const Blog = ({ blog: { title, author, url, likes } }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevValue) => !prevValue);
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
            likes {likes} <button>like</button>
          </p>
          <p>{author}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
