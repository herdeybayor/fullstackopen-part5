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

  const resetUser = () => {
    window.localStorage.removeItem("user");
    blogService.setToken(null);
    setUser(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    resetUser();
  };

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      const newBlogWithUser = {
        ...savedBlog,
        user: {
          username: user.username,
          name: user.name,
          id: savedBlog.user,
        },
        likes: savedBlog.likes,
      };
      console.log(newBlogWithUser);
      setBlogs([...blogs, newBlogWithUser]);
      createNotification("success", `a new blog ${savedBlog.title} added`);
    } catch (exception) {
      console.log(exception.response.data.error);
      createNotification("error", exception.response.data.error);
    }
  };

  const likeBlog = async (id, blogUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogUpdate);
      const blogsFilter = blogs.filter((blog) => blog.id !== updatedBlog.id);
      const oldBlog = blogs.find((blog) => blog.id === updatedBlog.id);
      setBlogs([...blogsFilter, { ...oldBlog, likes: updatedBlog.likes }]);
    } catch (exception) {
      console.log(exception.response.data.error);
      createNotification("error", exception.response.data.error);
    }
  };

  const removeBlog = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id);
      await blogService.remove(id);
      const blogsFilter = blogs.filter((blog) => blog.id !== id);
      setBlogs(blogsFilter);
      createNotification("success", `${blog.title} by ${blog.title} removed`);
    } catch (exception) {
      if (exception.response.status === 401) {
        console.log(exception);
        createNotification("error", exception.response.data.error);
      } else {
        console.log(exception);
        createNotification("error", exception.response.data.error);
      }
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
        <BlogForm addBlog={addBlog} />
      </Toggleable>

      {blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))
        .sort((a, b) => b.props.blog.likes - a.props.blog.likes)}
    </div>
  );
};

export default App;
