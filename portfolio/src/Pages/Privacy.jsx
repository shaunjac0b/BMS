import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  ArrowLeft,
  EyeOff,    // Icon for hiding balances / visibility
  Mail,      // Icon for marketing emails
  MapPin,    // Icon for location data usage
  BarChart2, // Icon for data dashboard
  ShieldOff // Or similar, for data privacy
} from "lucide-react";
import "../index.css";

const PrivacySettings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    hideAccountBalances: false,
    locationSecurity: true, // Renamed from locationTracking, but its placement here is more about privacy of data
    dataAnalyticsConsent: false,
    marketingEmails: false, // Keeping it here, though it was in Notifications too
  });

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const handleSave = () => {
    console.log("Saving banking privacy settings:", settings);
    alert("Privacy settings saved!");
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 0",
      borderBottom: "1px solid #eee"
    }}>
      <div>
        <div style={{ fontWeight: "500", marginBottom: "4px" }}>{label}</div>
        <div style={{ fontSize: "14px", color: "#666" }}>{description}</div>
      </div>
      <div
        onClick={onChange}
        style={{
          width: "50px",
          height: "26px",
          backgroundColor: checked ? "#007bff" : "#ccc",
          borderRadius: "13px",
          position: "relative",
          cursor: "pointer",
          transition: "background-color 0.2s"
        }}
      >
        <div
          style={{
            width: "22px",
            height: "22px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            position: "absolute",
            top: "2px",
            left: checked ? "26px" : "2px",
            transition: "left 0.2s"
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="Settings" style={{ marginTop: "20px", maxWidth: "600px", margin: "20px auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
          <ArrowLeft
            size={24}
            style={{ cursor: "pointer", marginRight: "15px", color: "#555" }}
            onClick={() => navigate("/settings")}
          />
          <h2 className="settings-heading" style={{ margin: 0 }}>Privacy Settings</h2>
        </div>

        <div className="settings-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Data & Privacy Control Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <ShieldOff size={24} style={{ marginRight: "10px", color: "#555" }} /> {/* Changed icon for data privacy */}
              <h3 style={{ margin: 0 }}>Data & Privacy Control</h3>
            </div>

            <ToggleSwitch
              checked={settings.hideAccountBalances}
              onChange={() => handleToggle('hideAccountBalances')}
              label="Hide Account Balances"
              description="Conceal balances on the home screen for privacy."
            />

            <ToggleSwitch
              checked={settings.locationSecurity}
              onChange={() => handleToggle('locationSecurity')}
              label="Location Data Usage"
              description="Allow us to use your location for personalized offers and services (not for fraud detection)."
            />
             <p style={{ fontSize: "12px", color: "#888", margin: "5px 0 15px 0" }}>
              (Location for security purposes is managed under Security Settings.)
            </p>

            <ToggleSwitch
              checked={settings.dataAnalyticsConsent}
              onChange={() => handleToggle('dataAnalyticsConsent')}
              label="Anonymous Data for Analytics"
              description="Allow us to use anonymized data to improve our services and features (your personal data is never shared)."
            />

            <ToggleSwitch
              checked={settings.marketingEmails}
              onChange={() => handleToggle('marketingEmails')}
              label="Marketing Communications"
              description="Receive emails about new products, services, and promotional offers."
            />

            {/* Above and Beyond: Detailed Data Usage Dashboard Link */}
            <div style={{ padding: "15px 0", borderTop: "1px solid #eee", marginTop: "20px", cursor: "pointer" }}
              onClick={() => alert("Navigate to a detailed data usage dashboard showing collected data categories and their purpose.")}>
              <div style={{ fontWeight: "500", marginBottom: "4px", display: "flex", alignItems: "center" }}>
                <BarChart2 size={18} style={{ marginRight: "8px" }} />
                View Detailed Data Usage
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>See how your data contributes to service improvements with full transparency.</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
            <button
              onClick={() => navigate("/settings")}
              style={{
                padding: "10px 20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#fff",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacySettings;