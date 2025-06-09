import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Home,
  FileText,
  Lock,
  Key,
  Sparkles, // New Icon for Pronouns
  UploadCloud, // New Icon for Document Upload
  ScrollText, // New Icon for Estate Planning
  MapPin as MapPinIcon // Alias to avoid conflict with existing MapPin
} from "lucide-react";

const ProfileSettings = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    addressLine1: "123 Bank St",
    addressLine2: "Apt 4B",
    city: "Plano",
    state: "TX",
    zipCode: "75024",
    pronouns: "prefer_not_say", // New state for pronouns
  });

  // New state for document upload/verification status
  const [identityVerificationStatus, setIdentityVerificationStatus] = useState("verified"); // 'verified', 'pending_review', 'action_required'

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Attempting to save account profile changes:", formData);
    alert("Changes saved! (In a real app, some changes might require further verification.)");
  };

  const handleVerifyAddress = () => {
    alert("Initiating address verification... (This would trigger an API call and potentially show a map view for confirmation)");
    // In a real app, this would involve a geocoding API and user confirmation
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
          <h2 className="settings-heading" style={{ margin: 0 }}>Account Profile</h2>
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
                    backgroundColor: "#f9f9f9"
                  }}
                  readOnly
                  title="To change your legal name, please contact customer support and provide documentation."
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
                  readOnly
                  title="To change your legal name, please contact customer support and provide documentation."
                />
              </div>
            </div>

            {/* New: Pronoun Preferences */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                <Sparkles size={16} style={{ marginRight: "5px", verticalAlign: "middle" }} />
                Preferred Pronouns
              </label>
              <select
                name="pronouns"
                value={formData.pronouns}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              >
                <option value="prefer_not_say">Prefer not to say</option>
                <option value="she/her">She/Her</option>
                <option value="he/him">He/Him</option>
                <option value="they/them">They/Them</option>
                <option value="other">Other</option>
              </select>
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
                Primary Address
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
              {/* New: Address Verification Tool */}
              <button
                onClick={handleVerifyAddress}
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  border: "1px solid #007bff",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  color: "#007bff",
                  cursor: "pointer",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <MapPinIcon size={16} style={{ marginRight: "5px" }} />
                Verify Address
              </button>
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

          {/* New: Self-Serve Document Upload & Verification Status */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <UploadCloud size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Identity Verification & Documents</h3>
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
              Verification Status: <span style={{ fontWeight: "bold", color:
                identityVerificationStatus === "verified" ? "#28a745" :
                identityVerificationStatus === "pending_review" ? "#ffc107" : "#dc3545"
              }}>
                {identityVerificationStatus.replace(/_/g, ' ').toUpperCase()}
              </span>
            </p>
            {identityVerificationStatus !== "verified" && (
              <div style={{ marginBottom: "15px", padding: "15px", backgroundColor: "#fff3cd", borderRadius: "4px", border: "1px solid #ffeaa7" }}>
                <p style={{ margin: 0, fontSize: "14px", color: "#856404" }}>
                  Action required: Please upload proof of identity to complete verification.
                </p>
                <button
                  onClick={() => alert("Navigate to document upload interface.")}
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    border: "1px solid #856404",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    color: "#856404",
                    cursor: "pointer",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <UploadCloud size={16} style={{ marginRight: "5px" }} />
                  Upload Documents
                </button>
              </div>
            )}
            <div style={{ padding: "15px 0", borderTop: "1px solid #eee", cursor: "pointer" }}
                 onClick={() => alert("Navigate to document history page.")}>
                <div style={{ fontWeight: "500", marginBottom: "4px" }}>View Document History</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Review documents submitted for verification.</div>
            </div>
          </div>


          {/* New: Digital Estate Planning */}
          <div className="Setting" style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <ScrollText size={24} style={{ marginRight: "10px", color: "#555" }} />
              <h3 style={{ margin: 0 }}>Digital Estate Planning</h3>
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
              Securely designate beneficiaries and trusted contacts for your accounts.
            </p>
            <button
              onClick={() => alert("Navigate to Digital Estate Planning section.")}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <User size={16} style={{ marginRight: "8px" }} />
              Manage Beneficiaries
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

export default ProfileSettings;