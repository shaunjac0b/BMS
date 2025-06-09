import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; // Assuming Navbar is still relevant for general layout
import { ArrowLeft, Fingerprint, Bell, EyeOff, Mail, MapPin, Tablet } from "lucide-react"; // Replaced icons
import "../index.css";

const PrivacySecuritySettings = () => { // Renamed component
  const navigate = useNavigate();

  const [settings, setSettings] = useState({ // Renamed state variable
    biometricLogin: true,
    transactionAlerts: true,
    hideAccountBalances: false,
    marketingEmails: true,
    locationSecurity: true,
    dataAnalyticsConsent: false, // For internal, anonymized data
    deviceManagementAlerts: true,
  });

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const handleSave = () => {
    console.log("Saving banking privacy and security settings:", settings);
    // In a real application, you would send these settings to a backend API
    // and handle success/failure, maybe show a toast notification.
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
          <h2 className="settings-heading" style={{ margin: 0 }}>Privacy & Security</h2> {/* Updated heading */}
        </div>

        <div className="settings-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Account Security Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Fingerprint size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Account Security</h3>
            </div>

            <ToggleSwitch
              checked={settings.biometricLogin}
              onChange={() => handleToggle('biometricLogin')}
              label="Biometric Login"
              description="Enable Fingerprint or Face ID for quick and secure login."
            />

            <ToggleSwitch
              checked={settings.deviceManagementAlerts}
              onChange={() => handleToggle('deviceManagementAlerts')}
              label="New Device Alerts"
              description="Receive notifications when your account is accessed from a new device."
            />
             <div style={{ padding: "15px 0", borderBottom: "1px solid #eee", cursor: "pointer" }}
                  onClick={() => navigate("/authorized-devices")}> {/* Example of a new navigation */}
                  <div style={{ fontWeight: "500", marginBottom: "4px" }}>Manage Authorized Devices</div>
                  <div style={{ fontSize: "14px", color: "#666" }}>View and remove devices connected to your account.</div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Bell size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Notifications</h3>
            </div>

            <ToggleSwitch
              checked={settings.transactionAlerts}
              onChange={() => handleToggle('transactionAlerts')}
              label="Transaction Alerts"
              description="Get real-time notifications for all account activities."
            />

            {/* You could add more granular notification settings here, e.g., type of alerts */}
            <div style={{ padding: "15px 0", borderBottom: "1px solid #eee", cursor: "pointer" }}
                 onClick={() => navigate("/notification-preferences")}>
                <div style={{ fontWeight: "500", marginBottom: "4px" }}>Notification Preferences</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Customize alert types and delivery methods.</div>
            </div>
          </div>

          {/* Data & Privacy Control Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <EyeOff size={24} style={{ marginRight: "10px", color: "#555" }} /> {/* Changed icon */}
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
              label="Location-Based Security"
              description="Allow location access to help detect suspicious activities and enhance security."
            />

            <ToggleSwitch
              checked={settings.dataAnalyticsConsent}
              onChange={() => handleToggle('dataAnalyticsConsent')}
              label="Anonymous Data for Analytics"
              description="Allow us to use anonymized data to improve our services (your personal data is never shared)."
            />

            <ToggleSwitch
              checked={settings.marketingEmails}
              onChange={() => handleToggle('marketingEmails')}
              label="Marketing Communications"
              description="Receive emails about new products, services, and offers."
            />
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

export default PrivacySecuritySettings; // Exporting the renamed component