import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  ArrowLeft,
  Lock,           // General lock/security icon
  Key,            // Change password icon
  Smartphone,     // 2FA / Device icon
  BellRing,       // Alerts icon
  ShieldCheck,    // General security/policy icon
  ListChecks,     // Checklist icon
  QrCode,         // QR code for authenticator
  Award,          // New: Security Score
  LockKeyhole,    // New: Emergency Lock
  Globe,          // New: Geo Restrictions
  MapPin          // For Manage Allowed Regions
} from "lucide-react";
import "../index.css";

const SecuritySettings = () => {
  const navigate = useNavigate();

  const [security, setSecurity] = useState({
    // Security Score (simulated for UI)
    securityScore: 85,
    // Emergency Lock (simulated for UI)
    isAccountLocked: false,

    // Authentication & Access
    biometricLogin: true,
    twoFactorAuthEnabled: true,
    transactionVerification: true, // Require 2FA for certain transactions
    sessionTimeout: "30",

    // Alerts & Device Management
    loginAlerts: true, // Now for unusual activity
    newDeviceLoginAlerts: true, // Explicit new device login alerts
    geoRestrictionsEnabled: false, // Geo-blocking
    locationSecurityForFraud: true, // Explicitly for fraud detection (distinct from privacy location)
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

  const handleSaveSecuritySettings = () => {
    console.log("Saving general security settings:", security);
    alert("Security settings saved!");
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log("Attempting to update password");
    alert("Password updated successfully! (Additional verification steps might be required in a live banking app.)");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  // New handler for Emergency Account Lock
  const handleEmergencyLock = () => {
    if (window.confirm("Are you sure you want to immediately lock your account? This will disable all transactions and online access. You will need to contact customer support to unlock it.")) {
      setSecurity(prev => ({ ...prev, isAccountLocked: true }));
      console.log("EMERGENCY ACCOUNT LOCK ACTIVATED!");
      alert("Your account has been locked. Please contact customer support immediately.");
      // In a real app, this would trigger a critical backend process
    }
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

  // Determine security recommendations based on current settings
  const getSecurityRecommendations = () => {
    const recommendations = [];
    if (!security.biometricLogin) recommendations.push("Enable Biometric Login for faster, secure access.");
    if (!security.twoFactorAuthEnabled) recommendations.push("Set up Two-Factor Authentication for critical actions.");
    if (!security.newDeviceLoginAlerts) recommendations.push("Turn on New Device Login Alerts to monitor account access.");
    if (security.sessionTimeout === "never" || security.sessionTimeout === "") recommendations.push("Set an automatic logout duration for added security.");
    if (!security.locationSecurityForFraud) recommendations.push("Enable Location-Based Security for enhanced fraud detection.");
    if (recommendations.length === 0) return ["Your security settings are strong!"];
    return recommendations;
  };


  return (
    <>
      <div className="Settings" style={{ marginTop: "20px", maxWidth: "600px", margin: "20px auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
          <ArrowLeft
            size={24}
            style={{ cursor: "pointer", marginRight: "15px", color: "#555" }}
            onClick={() => navigate("/settings")}
          />
          <h2 className="settings-heading" style={{ margin: 0 }}>Security Settings</h2>
        </div>

        <div className="settings-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Above and Beyond: Security Scorecard */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Award size={24} style={{ marginRight: "10px", color: "#007bff" }} />
              <h3 style={{ margin: 0, color: "#007bff" }}>Your Security Score: {security.securityScore}/100</h3>
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
              A higher score means your account is better protected.
            </p>
            <div style={{ backgroundColor: "#f0f8ff", padding: "15px", borderRadius: "4px", border: "1px solid #d0e8f8" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#0056b3" }}>Recommendations:</h4>
              <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", color: "#333" }}>
                {getSecurityRecommendations().map((rec, index) => (
                  <li key={index} style={{ marginBottom: "5px" }}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

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
                autoComplete="current-password"
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
                autoComplete="new-password"
              />
              <p style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}>
                Must be at least 8 characters, including uppercase, lowercase, numbers, and symbols.
              </p>
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
                autoComplete="new-password"
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
                  <Smartphone size={16} style={{ verticalAlign: "middle", marginRight: "5px" }} />
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

            <ToggleSwitch
              checked={security.newDeviceLoginAlerts}
              onChange={() => handleToggle('newDeviceLoginAlerts')}
              label="New Device Login Alerts"
              description="Receive notifications when your account is accessed from a new device."
            />

            <ToggleSwitch
              checked={security.locationSecurityForFraud}
              onChange={() => handleToggle('locationSecurityForFraud')}
              label="Location for Fraud Detection"
              description="Allow location access to help detect suspicious activities and enhance security."
            />
            <p style={{ fontSize: "12px", color: "#888", margin: "5px 0 15px 0" }}>
              (Location for personalized offers is managed under Privacy Settings.)
            </p>

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
              onClick={() => navigate("/authorized-devices")}>
              <div style={{ fontWeight: "500", marginBottom: "4px" }}>Manage Authorized Devices</div>
              <div style={{ fontSize: "14px", color: "#666" }}>Review and remove devices that have accessed your account.</div>
            </div>

          </div>

          {/* Above and Beyond: Geographic Transaction Restrictions */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Globe size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Geographic Transaction Security</h3>
            </div>

            <ToggleSwitch
              checked={security.geoRestrictionsEnabled}
              onChange={() => handleToggle('geoRestrictionsEnabled')}
              label="Enable Geo-Restrictions"
              description="Control where your cards and account can be used for transactions."
            />

            {security.geoRestrictionsEnabled && (
              <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
                <button
                  onClick={() => alert("Navigate to a page to manage allowed/blocked regions on a map.")}
                  style={{
                    padding: "10px 15px",
                    border: "1px solid #007bff",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    color: "#007bff",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <MapPin size={18} style={{ marginRight: "8px" }} />
                  Manage Allowed Regions
                </button>
                <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
                  Transactions outside your allowed regions will be automatically declined.
                </p>
              </div>
            )}
          </div>

          {/* Above and Beyond: Emergency Account Lock Button */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <LockKeyhole size={24} style={{ marginRight: "10px", color: "#dc3545" }} />
              <h3 style={{ margin: 0, color: "#dc3545" }}>Emergency Account Lock</h3>
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
              Immediately freeze all account activity if you suspect fraud or your credentials are compromised.
            </p>
            <button
              onClick={handleEmergencyLock}
              style={{
                width: "100%",
                padding: "12px 20px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: security.isAccountLocked ? "#dc3545" : "#ffc107",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              disabled={security.isAccountLocked}
            >
              <LockKeyhole size={20} style={{ marginRight: "10px" }} />
              {security.isAccountLocked ? "Account Locked - Contact Support" : "Emergency Account Lock"}
            </button>
            <p style={{ fontSize: "12px", color: "#dc3545", textAlign: "center", marginTop: "10px" }}>
              Unlocking requires contacting customer support for verification.
            </p>
          </div>

          {/* Security Policies & Resources Section */}
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
              onClick={() => alert("Navigate to Password Policy page")}>
              <div style={{ fontWeight: "500", marginBottom: "4px" }}>View Password Policy</div>
              <div style={{ fontSize: "14px", color: "#666" }}>Understand our guidelines for creating strong and secure passwords.</div>
            </div>

            <div style={{ padding: "15px 0", borderBottom: "1px solid #eee", cursor: "pointer" }}
              onClick={() => alert("Navigate to Security Questions management page")}>
              <div style={{ fontWeight: "500", marginBottom: "4px" }}>Manage Security Questions</div>
              <div style={{ fontSize: "14px", color: "#666" }}>Update your security questions for account recovery.</div>
            </div>

            <div style={{ padding: "15px 0", borderBottom: "1px solid #eee", cursor: "pointer" }}
              onClick={() => alert("Navigate to Fraud Prevention Tips page")}>
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
              onClick={handleSaveSecuritySettings}
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