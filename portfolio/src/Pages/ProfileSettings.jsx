import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Home, FileText, Lock, Key } from "lucide-react"; // Replaced icons

const ProfileSettings = () => { // Renamed component for banking context
  const navigate = useNavigate();

  // In a real banking app, initial data would be fetched from an API
  const [formData, setFormData] = useState({
    firstName: "John", // Example data
    lastName: "Doe",   // Example data
    email: "john.doe@example.com", // Example data
    phone: "123-456-7890",         // Example data
    addressLine1: "123 Bank St",    // Added address fields
    addressLine2: "Apt 4B",
    city: "Plano",
    state: "TX",
    zipCode: "75024",
    // Date of Birth and SSN/Tax ID are highly sensitive and usually not directly editable via a simple form
    // They often require document submission or customer service contact for changes.
    // For display purposes, they might be here as read-only.
    // dateOfBirth: "1985-06-15",
    // ssnLast4: "1234", // Last 4 digits for display, never editable directly here
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // In a real banking app:
    // 1. Client-side validation
    // 2. Potentially confirm changes with user (e.g., "Are you sure you want to update your phone number?")
    // 3. Send data to a secure backend API.
    // 4. For highly sensitive changes (like email, phone, address), often a secondary verification step (e.g., OTP to old number/email, or call to confirm) is required.
    // 5. Handle success/error messages.
    console.log("Attempting to save account profile changes:", formData);
    alert("Changes saved! (In a real app, some changes might require further verification.)");
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
          <h2 className="settings-heading" style={{ margin: 0 }}>Profile Settings</h2> {/* Updated heading */}
        </div>

        <div className="settings-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Personal Information Section */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <User size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Personal Information</h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    backgroundColor: "#f9f9f9" // Often read-only or special process for name changes
                  }}
                  readOnly // Name changes often require documentation
                  title="To change your name, please contact customer support."
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    backgroundColor: "#f9f9f9"
                  }}
                  readOnly // Name changes often require documentation
                  title="To change your name, please contact customer support."
                />
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                <Mail size={16} style={{ marginRight: "5px", verticalAlign: "middle" }} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                <Phone size={16} style={{ marginRight: "5px", verticalAlign: "middle" }} />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              />
            </div>

            {/* Address Information */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                <Home size={16} style={{ marginRight: "5px", verticalAlign: "middle" }} />
                Address
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                placeholder="Address Line 1"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", marginBottom: "8px" }}
              />
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                placeholder="Address Line 2 (Optional)"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", marginBottom: "8px" }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" }}
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  maxLength="2"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" }}
                />
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Zip Code"
                  maxLength="10"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Read-only sensitive information example */}
            <div style={{ marginBottom: "15px", padding: "15px", backgroundColor: "#f0f8ff", border: "1px solid #e0eaf5", borderRadius: "4px" }}>
              <div style={{ fontWeight: "500", marginBottom: "5px" }}>
                <FileText size={16} style={{ marginRight: "5px", verticalAlign: "middle" }} />
                Identity & Tax Information
              </div>
              <p style={{ fontSize: "14px", color: "#666", margin: "0" }}>
                Social Security Number: XXX-XX-1234
                <br />
                Date of Birth: June 15, 1985
                <br />
                <span style={{ fontSize: "12px", color: "#888" }}>
                  To update this information, please contact customer support or visit a branch.
                </span>
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

export default ProfileSettings; // Exporting the renamed component