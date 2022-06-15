import React from "react";
import PropTypes from "prop-types";
import Notification from "./Notification";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
  notification,
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      {notification && <Notification notification={notification} />}
      <form onSubmit={onSubmit}>
        <label htmlFor="username">username: </label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
          placeholder="Enter username"
          value={username}
          required
        />
        <br />
        <label htmlFor="password">password: </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          required
        />
        <br />
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  notification: PropTypes.string,
};

export default LoginForm;
