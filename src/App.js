import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createNotification = async (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception.response.data.error);
      createNotification("error", exception.response.data.error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("user");
    blogService.setToken(null);
    setUser(null);
  };

  const handleBlogPost = async (e) => {
    e.preventDefault();
    try {
      const newBlog = { title, author, url };
      const savedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      console.log(savedBlog);
      setBlogs([...blogs, savedBlog]);
      createNotification("success", `a new blog ${savedBlog.title} added`);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      console.log(exception.response.data.error);
      createNotification("error", exception.response.data.error);
    }
  };

  if (!user)
    return (
      <LoginForm
        notification={notification}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onSubmit={handleLogin}
      />
    );

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification notification={notification} />}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          onSubmit={handleBlogPost}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
      </Toggleable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
