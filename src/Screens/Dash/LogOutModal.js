import React from "react";

const LogOutModal = ({ open, onClose, handleLogout, handleClose }) => {
  const modalStyle = {
    display: open ? "block" : "none",
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  };

  const modalContentStyle = {
    backgroundColor: "#fefefe",
    margin: "15% auto",
    padding: "20px",
    border: "1px solid #888",
    width: "300px",
  };

  const buttonStyle = {
    marginBottom: "10px",
    marginRight: "10px",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ccc",
    color: "black",
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>Logout Confirmation</h2>
        <p>Are you sure you want to logout?</p>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </button>
        <button style={cancelButtonStyle} onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
