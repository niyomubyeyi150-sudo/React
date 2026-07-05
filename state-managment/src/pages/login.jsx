// src/pages/login.jsx
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { getLogin } from "../API/auth2.js"; // Import the function we just made

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Send inputs to your live Railway login endpoint
      const data = await getLogin(email, password);
      console.log("Login Success Data:", data);
      
      // 2. Save tokens to localStorage so your route guards allow entry
      if (data && data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }
      }
      
      setLoading(false);
      // 3. Take user directly to your stories page dashboard view
      navigate("/home"); 
      
    } catch (err) {
      setLoading(false);
      // Display wrong password or email errors straight from the server
      setError(err.message || "Invalid email or password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Student Login</h2>
      
      {error && <p style={{ color: "red", backgroundColor: "#ffebee", padding: "10px", borderRadius: "4px" }}>{error}</p>}
      
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
            placeholder="Enter your password" 
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
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
  // Place this right underneath your closing </form> tag inside the login form layout container
<div style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
  Don't have an account yet?{" "}
  <span 
    onClick={() => navigate("/register")} 
    style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
  >
    Register here
  </span>
</div>

}
