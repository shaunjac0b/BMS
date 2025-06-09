import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { User, Bell, Shield, Lock } from "lucide-react";
import "../index.css";

const Settings = () => {
  const navigate = useNavigate();

  const settingsOptions = [
    { id: 1, title: "Profile Settings", icon: <User size={32} />, route: "/profile-settings" },
    { id: 2, title: "Notifications", icon: <Bell size={32} />, route: "/notifications" },
    { id: 3, title: "Privacy", icon: <Shield size={32} />, route: "/privacy" },
    { id: 4, title: "Security", icon: <Lock size={32} />, route: "/security" },
  ];

  return (
    <>
      <div id="settings" className="Settings" style={{ marginTop: "20px" }}>
        <h2 className="settings-heading">Settings</h2>

        <div className="settings-container">
          {settingsOptions.map((option) => (
            <div
              key={option.id}
              className="Setting"
              onClick={() => navigate(option.route)}
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px",
                textAlign: "center",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ marginBottom: "10px", color: "#555" }}>{option.icon}</div>
              <h4>{option.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Settings;