// src/pages/register.jsx
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { getRegister, verifyEmail } from "../API/auth2.js"; // 🚀 FIX 1: Imported verifyEmail

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 
  
  const navigate = useNavigate(); 

  // Handler for Phase 1: Registration Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await getRegister(email, password);
      setLoading(false);
      setIsSuccess(true); 
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed. Try again.");
    }
  };

  // Handler for Phase 2: OTP Verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // 🚀 FIX 2: Replaced simulator with the actual live backend API request call
      const data = await verifyEmail(email, otp);
      console.log("Verification successful from server:", data);
      
      // Save tokens to browser storage if your backend sends them upon verification success
      if (data && data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }
      }
      
      setLoading(false);
      navigate("/home"); // Sends verified users to the stories dashboard layout
      
    } catch (err) {
      setLoading(false);
      setError(err.message || "Invalid or expired OTP code.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", fontFamily: "sans-serif" }}>
      
      {error && <p style={{ color: "red", backgroundColor: "#ffebee", padding: "10px", borderRadius: "4px" }}>{error}</p>}
      
      {isSuccess ? (
        <form onSubmit={handleOtpSubmit}>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Verify Email</h2>
          <p style={{ fontSize: "14px", color: "#666", textAlign: "center", marginBottom: "20px" }}>
            An activation code was sent to <strong>{email}</strong>. Please enter it below.
          </p>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Enter OTP Code</label>
            <input 
              type="text" 
              placeholder="e.g., 123456" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              required 
              style={{ width: "100%", padding: "12px", boxSizing: "border-box", textAlign: "center", fontSize: "18px", letterSpacing: "2px" }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
          >
            {loading ? "Verifying..." : "Confirm & Activate"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Your Account</h2>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
            <input 
              type="password" 
              placeholder="Create a password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      )}
    </div>
  );
}
