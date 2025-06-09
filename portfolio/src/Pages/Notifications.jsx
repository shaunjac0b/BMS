import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Mail, MessageSquare, Smartphone, DollarSign, CreditCard, Lock, CalendarCheck } from "lucide-react"; // Updated icons

const NotificationPreferences = () => { // Renamed component for clarity
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    // Communication Channels
    emailNotificationsEnabled: true, // Renamed for clarity
    pushNotificationsEnabled: true,  // Renamed for clarity, often default true for critical alerts
    smsNotificationsEnabled: false,  // Renamed for clarity

    // Financial Transaction Alerts
    depositAlerts: true,
    withdrawalAlerts: true,
    largeTransactionAlerts: true, // New: for transactions above a certain threshold
    lowBalanceAlerts: false,

    // Security & Account Alerts
    securityAlertsEnabled: true, // Renamed and emphasized as critical
    loginAlerts: true,           // Explicit login alerts
    passwordChangeAlerts: true,  // New: Specific for password changes
    newDeviceLoginAlerts: true,  // New: Specific for new device logins

    // Account Updates
    statementReadyAlerts: true,  // New: For monthly statements
    billPaymentReminders: false, // New: For upcoming bills/payments
    accountUpdatesEnabled: true, // General account updates

    // Marketing & Promotions
    marketingOffers: false, // Renamed for clarity
  });

  const handleToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleSave = () => {
    console.log("Saving banking notification preferences:", notifications);
    // In a real banking app, send these settings to a backend API
    // and handle success/error messages, possibly showing a confirmation.
    alert("Your notification preferences have been updated!");
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
          <h2 className="settings-heading" style={{ margin: 0 }}>Notification Preferences</h2> {/* Updated heading */}
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
            />

            <ToggleSwitch
              checked={notifications.pushNotificationsEnabled}
              onChange={() => handleToggle('pushNotificationsEnabled')}
              label="In-App & Push Notifications"
              description="Get real-time alerts directly on your device."
            />

            <ToggleSwitch
              checked={notifications.smsNotificationsEnabled}
              onChange={() => handleToggle('smsNotificationsEnabled')}
              label="SMS Text Alerts"
              description="Receive important notifications via text message (standard rates may apply)."
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
            />

            <ToggleSwitch
              checked={notifications.withdrawalAlerts}
              onChange={() => handleToggle('withdrawalAlerts')}
              label="Withdrawals & Payments"
              description="Notify me of funds withdrawn or payments made from my account."
            />

            <ToggleSwitch
              checked={notifications.largeTransactionAlerts}
              onChange={() => handleToggle('largeTransactionAlerts')}
              label="Large Transaction Alert"
              // description="Receive an alert for any single transaction over $500." {/* Example threshold */}
            />

            <ToggleSwitch
              checked={notifications.lowBalanceAlerts}
              onChange={() => handleToggle('lowBalanceAlerts')}
              label="Low Balance Alert"
              description="Notify me when my account balance falls below a set amount."
            />
            {/* Could add a numeric input for the low balance amount here */}
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
            />
            <p style={{ fontSize: "12px", color: "#888", margin: "5px 0 15px 0" }}>
              (These alerts cannot be disabled for your protection.)
            </p> {/* Important banking note */}

            <ToggleSwitch
              checked={notifications.loginAlerts}
              onChange={() => handleToggle('loginAlerts')}
              label="Login Activity Alerts"
              description="Get notified of successful and failed login attempts."
            />

            <ToggleSwitch
              checked={notifications.passwordChangeAlerts}
              onChange={() => handleToggle('passwordChangeAlerts')}
              label="Password Change Alert"
              description="Receive an alert when your password is changed."
            />

            <ToggleSwitch
              checked={notifications.newDeviceLoginAlerts}
              onChange={() => handleToggle('newDeviceLoginAlerts')}
              label="New Device Login Alert"
              description="Get notified when your account is accessed from a new device."
            />
            
            <ToggleSwitch
              checked={notifications.statementReadyAlerts}
              onChange={() => handleToggle('statementReadyAlerts')}
              label="Statement Ready Notifications"
              description="Alert me when my monthly account statement is available."
            />
            
            <ToggleSwitch
              checked={notifications.billPaymentReminders}
              onChange={() => handleToggle('billPaymentReminders')}
              label="Upcoming Payment Reminders"
              description="Reminders for scheduled bill payments or transfers."
            />
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

export default NotificationPreferences; // Exporting the renamed component