// src/API/auth2.js

const BASE_URL = "https://sms-express-app-1-production-a843.up.railway.app"; 

/**
 * Step 1: Submit email and password to receive an OTP code
 */
export async function getRegister(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // 🚀 FIX: Swapped data.message for data.error to match your real Railway backend format
      throw new Error(data.error || "Registration failed");
    }

    return data; 
  } catch (error) {
    console.error("API Error at fetch line:", error);
    throw error; 
  }
}

/**
 * Step 2: Submit the OTP code sent to your email to activate your account
 */
export async function verifyEmail(email, otp) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }), 
    });

    const data = await response.json();

    if (!response.ok) {
      //  FIX: Fallback to data.error if data.message doesn't exist
      throw new Error(data.error || data.message || "Invalid or expired verification code");
    }

    return data; 
  } catch (error) {
    console.error("API Error at verification line:", error);
    throw error;
  }
}

/**
 * Step 3: Log in an existing user with email and password
 */
export async function getLogin(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // 🚀 FIX: Swapped data.message for data.error to catch "Invalid password" or user errors
      throw new Error(data.error || "Login failed. Please check your credentials.");
    }

    return data; 
  } catch (error) {
    console.error("API Error at login line:", error);
    throw error;
  }
}
