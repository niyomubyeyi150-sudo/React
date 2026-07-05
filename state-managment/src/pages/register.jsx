// src/pages/register.jsx
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; // 🚀 FIX 1: Added missing import
import { getRegister } from "../API/auth2.js"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // 🚀 FIX 2: Added missing state hook
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Execute the API handler
      const data = await getRegister(email, password);
      console.log("Server response on success:", data);
      
      setLoading(false);
      setIsSuccess(true); // Flips state to confirm Step 1 works!
      
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Your Account</h2>
      
      {error && <p style={{ color: "red", backgroundColor: "#ffebee", padding: "10px", borderRadius: "4px" }}>{error}</p>}
      
      {/* 🚀 FIX 3: Conditional layout display so user knows step 1 succeeded */}
      {isSuccess ? (
        <div style={{ backgroundColor: "#e8f5e9", color: "#2e7d32", padding: "15px", borderRadius: "4px", textAlign: "center" }}>
          <strong>Registration submitted successfully!</strong> <br />
          Check your email inbox for the verification OTP code.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
