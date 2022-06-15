import React from "react";

function Notification({ notification: { message, type } }) {
  const notificationStyle = {
    borderStyle: "solid",
    borderColor: type === "success" ? "green" : "red",
    color: type === "success" ? "green" : "red",
    borderWidth: "3px",
    padding: "10px 5px",
    textAlign: "center",
    borderRadius: "20px",
    background: "#d3d3d3",
    fontSize: "20px",
    fontWeight: "medium",
    position: "fixed",
    top: 5,
    left: "50%",
    transform: "translateX(-50%)",
  };
  return (
    <p className="notification" style={notificationStyle}>
      {message}
    </p>
  );
}

export default Notification;
