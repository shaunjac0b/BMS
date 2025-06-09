import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Key, Smartphone, Phone, BellRing, ShieldCheck, ListChecks, QrCode } from "lucide-react"; // Updated icons

const SecuritySettings = () => {
  const navigate = useNavigate();

  const [security, setSecurity] = useState({
    twoFactorAuthEnabled: false, // Renamed for clarity
    transactionVerification: true, // New: Require 2FA for certain transactions
    loginAlerts: true,
    sessionTimeout: "30",
    // passwordExpiry removed - focus on strong password policies instead
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleToggle = (key) => {
    setSecurity({
      ...security,
      [key]: !security[key]
    });
  };

  const handleSelectChange = (key, value) => {
    setSecurity({
      ...security,
      [key]: value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveSecuritySettings = () => { // Renamed for clarity
    console.log("Saving general security settings:", security);
    // In a real app, send these settings to backend API
    alert("Security settings saved!");
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // In a real banking app:
    // 1. Validate current password against backend
    // 2. Enforce strong password requirements (min length, special chars, etc.)
    // 3. Hash and store new password securely
    // 4. Potentially prompt for an OTP for verification before changing password
    console.log("Attempting to update password");
    alert("Password updated successfully! (Additional verification steps might be required in a live banking app.)");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
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
          <h2 className="settings-heading" style={{ margin: 0 }}>Security Settings</h2> {/* Consistent heading */}
        </div>

        <div className="settings-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Change Password Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Key size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Change Your Password</h3>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
                autoComplete="current-password" // For better browser autofill management
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
                autoComplete="new-password" // For better browser autofill management
              />
              <p style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}>
                Must be at least 8 characters, including uppercase, lowercase, numbers, and symbols.
              </p> {/* Added password requirements */}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
                autoComplete="new-password" // For better browser autofill management
              />
            </div>

            <button
              onClick={handlePasswordUpdate}
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
              Update Password
            </button>
          </div>

          {/* Two-Factor Authentication Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Smartphone size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Two-Factor Authentication (2FA)</h3>
            </div>

            <ToggleSwitch
              checked={security.twoFactorAuthEnabled}
              onChange={() => handleToggle('twoFactorAuthEnabled')}
              label="Enable 2FA"
              description="Add an extra layer of security requiring a code from your device."
            />

            {security.twoFactorAuthEnabled && (
              <div style={{
                marginTop: "15px",
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
                border: "1px solid #e9ecef"
              }}>
                <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
                  Choose your preferred 2FA method: Authenticator App or SMS (if configured).
                </p>
                <button
                  onClick={() => alert("Navigate to Authenticator setup page")}
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #007bff",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    color: "#007bff",
                    cursor: "pointer",
                    fontSize: "14px",
                    marginRight: "10px"
                  }}
                >
                  <QrCode size={16} style={{ verticalAlign: "middle", marginRight: "5px" }} />
                  Setup Authenticator App
                </button>
                <button
                  onClick={() => alert("Navigate to SMS 2FA setup/manage page")}
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #007bff",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    color: "#007bff",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  <Phone size={16} style={{ verticalAlign: "middle", marginRight: "5px" }} />
                  Manage SMS 2FA
                </button>
              </div>
            )}

            <ToggleSwitch
              checked={security.transactionVerification}
              onChange={() => handleToggle('transactionVerification')}
              label="Verify Sensitive Transactions"
              description="Require a 2FA code for transfers, bill payments, and other high-value actions."
            />

          </div>

          {/* Account Activity & Device Management Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <BellRing size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Account Activity & Device Management</h3>
            </div>

            <ToggleSwitch
              checked={security.loginAlerts}
              onChange={() => handleToggle('loginAlerts')}
              label="Unusual Activity Alerts"
              description="Get notifications for suspicious login attempts or unusual account activity."
            />

            <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "500" }}>
                Automatic Logout
              </label>
              <select
                value={security.sessionTimeout}
                onChange={(e) => handleSelectChange('sessionTimeout', e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              >
                <option value="15">15 minutes of inactivity</option>
                <option value="30">30 minutes of inactivity</option>
                <option value="60">1 hour of inactivity</option>
              </select>
              <p style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}>
                For your security, you'll be automatically logged out after this period of inactivity.
              </p>
            </div>

            <div style={{ padding: "15px 0", borderBottom: "1px solid #eee", cursor: "pointer" }}
                 onClick={() => navigate("/authorized-devices")}> {/* Added navigation */}
                <div style={{ fontWeight: "500", marginBottom: "4px" }}>Manage Authorized Devices</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Review and remove devices that have accessed your account.</div>
            </div>

          </div>

          {/* Security Recommendations & Policies Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <ShieldCheck size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Security Policies & Resources</h3>
            </div>

            <div style={{ padding: "15px 0", borderBottom: "1px solid #eee", cursor: "pointer" }}
                 onClick={() => alert("Navigate to Password Policy page")}> {/* Added navigation */}
                <div style={{ fontWeight: "500", marginBottom: "4px" }}>View Password Policy</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Understand our guidelines for creating strong and secure passwords.</div>
            </div>

            <div style={{ padding: "15px 0", borderBottom: "1px solid #eee", cursor: "pointer" }}
                 onClick={() => alert("Navigate to Fraud Prevention Tips page")}> {/* Added navigation */}
                <div style={{ fontWeight: "500", marginBottom: "4px" }}>Fraud Prevention Tips</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Learn how to protect yourself from common scams and fraud.</div>
            </div>

            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#e6f7ff", borderRadius: "4px", border: "1px solid #a6e0ff" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <ListChecks size={16} style={{ marginRight: "8px", color: "#0056b3" }} />
                <strong style={{ color: "#0056b3", fontSize: "14px" }}>Your Security Checklist</strong>
              </div>
              <p style={{ margin: 0, fontSize: "14px", color: "#0056b3" }}>
                Always enable 2FA, keep your password unique, and monitor your account activity.
              </p>
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
              onClick={handleSaveSecuritySettings} // Changed to the general save handler
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
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecuritySettings;