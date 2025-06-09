import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  ArrowLeft,
  Bell,
  Mail,
  MessageSquare, // Keeping for general "message" context, but less prominent
  Smartphone,
  DollarSign,
  CreditCard, // Re-added for potential card specific alerts
  Lock,
  CalendarCheck,
  Zap, // New Icon for Smart Anomaly
  Gauge, // New Icon for Threshold
  Moon, // New Icon for Quiet Hours
  History, // New Icon for Notification History
  MessageCircleMore // New Icon for Test Alert
} from "lucide-react";
import "../index.css";

const NotificationPreferences = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    // Communication Channels
    emailNotificationsEnabled: true,
    pushNotificationsEnabled: true,
    smsNotificationsEnabled: false,

    // Financial Transaction Alerts
    depositAlerts: true,
    withdrawalAlerts: true,
    largeTransactionAlerts: true,
    largeTransactionThreshold: 500, // New: Default threshold
    lowBalanceAlerts: false,
    lowBalanceAmount: 100, // New: Default low balance amount
    anomalyDetectionEnabled: true, // New: Smart Anomaly Detection

    // Security & Account Alerts
    securityAlertsEnabled: true,
    loginAlerts: true,
    passwordChangeAlerts: true,
    newDeviceLoginAlerts: true,
    statementReadyAlerts: true,
    billPaymentReminders: false,
    accountUpdatesEnabled: true,

    // Marketing & Promotions
    marketingOffers: false,

    // New states for "above and beyond" features
    quietHoursEnabled: false,
    quietHoursStart: "22:00", // 10 PM
    quietHoursEnd: "07:00",   // 7 AM
  });

  const handleToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleNumericInputChange = (e) => {
    const { name, value } = e.target;
    setNotifications({
      ...notifications,
      [name]: parseFloat(value) || 0 // Ensure it's a number
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setNotifications({
      ...notifications,
      [name]: value
    });
  };

  const handleSave = () => {
    console.log("Saving banking notification preferences:", notifications);
    alert("Your notification preferences have been updated!");
  };

  const handleTestAlert = (alertType) => {
    alert(`Sending a test "${alertType}" notification to your enabled channels.`);
    console.log(`Test alert triggered for: ${alertType}`);
    // In a real app, this would trigger an API call to send a dummy notification
  };

  const ToggleSwitch = ({ checked, onChange, label, description, onTestClick, testLabel }) => (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 0",
      borderBottom: "1px solid #eee",
      flexWrap: "wrap" // Allow wrapping for test button
    }}>
      <div style={{ flexBasis: "calc(100% - 60px)" }}> {/* Adjust width for toggle and potential test button */}
        <div style={{ fontWeight: "500", marginBottom: "4px" }}>{label}</div>
        <div style={{ fontSize: "14px", color: "#666" }}>{description}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {onTestClick && (
          <button
            onClick={onTestClick}
            style={{
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              minWidth: "60px",
              justifyContent: "center"
            }}
            title={`Send a test ${testLabel || label} alert`}
          >
            <MessageCircleMore size={14} />
          </button>
        )}
        <div
          onClick={onChange}
          style={{
            width: "50px",
            height: "26px",
            backgroundColor: checked ? "#007bff" : "#ccc",
            borderRadius: "13px",
            position: "relative",
            cursor: "pointer",
            transition: "background-color 0.2s",
            flexShrink: 0
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
          <h2 className="settings-heading" style={{ margin: 0 }}>Notification Preferences</h2>
        </div>

        <div className="settings-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Delivery Channels Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Bell size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Delivery Channels</h3>
            </div>

            <ToggleSwitch
              checked={notifications.emailNotificationsEnabled}
              onChange={() => handleToggle('emailNotificationsEnabled')}
              label="Email Notifications"
              description="Receive alerts and updates via email."
              onTestClick={() => handleTestAlert('email channel')}
              testLabel="Email"
            />

            <ToggleSwitch
              checked={notifications.pushNotificationsEnabled}
              onChange={() => handleToggle('pushNotificationsEnabled')}
              label="In-App & Push Notifications"
              description="Get real-time alerts directly on your device."
              onTestClick={() => handleTestAlert('push channel')}
              testLabel="Push"
            />

            <ToggleSwitch
              checked={notifications.smsNotificationsEnabled}
              onChange={() => handleToggle('smsNotificationsEnabled')}
              label="SMS Text Alerts"
              description="Receive important notifications via text message (standard rates may apply)."
              onTestClick={() => handleTestAlert('SMS channel')}
              testLabel="SMS"
            />
          </div>

          {/* Transactional Alerts Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <DollarSign size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Transactional Alerts</h3>
            </div>

            <ToggleSwitch
              checked={notifications.depositAlerts}
              onChange={() => handleToggle('depositAlerts')}
              label="Deposits Received"
              description="Notify me when funds are deposited into my account."
              onTestClick={() => handleTestAlert('deposit')}
            />

            <ToggleSwitch
              checked={notifications.withdrawalAlerts}
              onChange={() => handleToggle('withdrawalAlerts')}
              label="Withdrawals & Payments"
              description="Notify me of funds withdrawn or payments made from my account."
              onTestClick={() => handleTestAlert('withdrawal')}
            />

            {/* New: Smart Anomaly Detection & Threshold */}
            <ToggleSwitch
              checked={notifications.anomalyDetectionEnabled}
              onChange={() => handleToggle('anomalyDetectionEnabled')}
              label="Smart Anomaly Detection"
              description="Get alerts for unusual spending patterns or suspicious transactions."
              onTestClick={() => handleTestAlert('anomaly detection')}
            />

            <ToggleSwitch
              checked={notifications.largeTransactionAlerts}
              onChange={() => handleToggle('largeTransactionAlerts')}
              label="Large Transaction Alert"
              description="Receive an alert for any single transaction above your set threshold."
              onTestClick={() => handleTestAlert('large transaction')}
            />
            {notifications.largeTransactionAlerts && (
              <div style={{ marginBottom: "15px", padding: "10px 0 0 0", borderTop: "1px dashed #eee" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                  <Gauge size={16} style={{ marginRight: "5px", verticalAlign: "middle" }} />
                  Threshold Amount ($)
                </label>
                <input
                  type="number"
                  name="largeTransactionThreshold"
                  value={notifications.largeTransactionThreshold}
                  onChange={handleNumericInputChange}
                  min="0"
                  step="50"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px"
                  }}
                />
              </div>
            )}

            <ToggleSwitch
              checked={notifications.lowBalanceAlerts}
              onChange={() => handleToggle('lowBalanceAlerts')}
              label="Low Balance Alert"
              description="Notify me when my account balance falls below a set amount."
              onTestClick={() => handleTestAlert('low balance')}
            />
            {notifications.lowBalanceAlerts && (
              <div style={{ marginBottom: "15px", padding: "10px 0 0 0", borderTop: "1px dashed #eee" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                  <Gauge size={16} style={{ marginRight: "5px", verticalAlign: "middle" }} />
                  Low Balance Amount ($)
                </label>
                <input
                  type="number"
                  name="lowBalanceAmount"
                  value={notifications.lowBalanceAmount}
                  onChange={handleNumericInputChange}
                  min="0"
                  step="10"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px"
                  }}
                />
              </div>
            )}
          </div>

          {/* Security & Account Alerts Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Lock size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Security & Account Updates</h3>
            </div>

            <ToggleSwitch
              checked={notifications.securityAlertsEnabled}
              onChange={() => handleToggle('securityAlertsEnabled')}
              label="Critical Security Alerts"
              description="Mandatory notifications for suspicious activity, fraud, or data breaches."
              onTestClick={() => handleTestAlert('critical security')}
            />
            <p style={{ fontSize: "12px", color: "#888", margin: "5px 0 15px 0" }}>
              (These alerts cannot be disabled for your protection.)
            </p>

            <ToggleSwitch
              checked={notifications.loginAlerts}
              onChange={() => handleToggle('loginAlerts')}
              label="Login Activity Alerts"
              description="Get notified of successful and failed login attempts."
              onTestClick={() => handleTestAlert('login activity')}
            />

            <ToggleSwitch
              checked={notifications.passwordChangeAlerts}
              onChange={() => handleToggle('passwordChangeAlerts')}
              label="Password Change Alert"
              description="Receive an alert when your password is changed."
              onTestClick={() => handleTestAlert('password change')}
            />

            <ToggleSwitch
              checked={notifications.newDeviceLoginAlerts}
              onChange={() => handleToggle('newDeviceLoginAlerts')}
              label="New Device Login Alert"
              description="Get notified when your account is accessed from a new device."
              onTestClick={() => handleTestAlert('new device login')}
            />

            <ToggleSwitch
              checked={notifications.statementReadyAlerts}
              onChange={() => handleToggle('statementReadyAlerts')}
              label="Statement Ready Notifications"
              description="Alert me when my monthly account statement is available."
              onTestClick={() => handleTestAlert('statement ready')}
            />

            <ToggleSwitch
              checked={notifications.billPaymentReminders}
              onChange={() => handleToggle('billPaymentReminders')}
              label="Upcoming Payment Reminders"
              description="Reminders for scheduled bill payments or transfers."
              onTestClick={() => handleTestAlert('payment reminder')}
            />
          </div>

          {/* New: Quiet Hours / Do Not Disturb */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Moon size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Quiet Hours (Do Not Disturb)</h3>
            </div>
            <ToggleSwitch
              checked={notifications.quietHoursEnabled}
              onChange={() => handleToggle('quietHoursEnabled')}
              label="Enable Quiet Hours"
              description="Suppress non-critical notifications during specified times."
            />
            {notifications.quietHoursEnabled && (
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "15px", paddingTop: "15px", borderTop: "1px dashed #eee" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Start Time</label>
                  <input
                    type="time"
                    name="quietHoursStart"
                    value={notifications.quietHoursStart}
                    onChange={handleTimeChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>End Time</label>
                  <input
                    type="time"
                    name="quietHoursEnd"
                    value={notifications.quietHoursEnd}
                    onChange={handleTimeChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px"
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Marketing Communications Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <Mail size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Marketing & Promotional</h3>
            </div>

            <ToggleSwitch
              checked={notifications.marketingOffers}
              onChange={() => handleToggle('marketingOffers')}
              label="Promotional Offers"
              description="Receive news and special offers on products and services."
              onTestClick={() => handleTestAlert('marketing offer')}
            />
          </div>

          {/* New: Notification History & Performance */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <History size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Notification History & Analytics</h3>
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
              Review past alerts and see how you interact with them.
            </p>
            <button
              onClick={() => alert("Navigate to Notification History & Analytics page.")}
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
              <History size={18} style={{ marginRight: "8px" }} />
              View History & Stats
            </button>
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

export default NotificationPreferences;