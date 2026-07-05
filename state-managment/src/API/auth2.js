// src/API/auth2.js

const BASE_URL = "https://sms-express-app-1-production-a843.up.railway.app"; 


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
      throw new Error(data.message || "Registration failed");
    }

    return data; 
  } catch (error) {
    // 🚀 FIXED: Fixed the misplaced syntax formatting here
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
      // Note: Based on your Swagger layout, it needs both email and the otp code
      body: JSON.stringify({ email, otp }), 
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid or expired verification code");
    }

    // This data usually contains your real accessToken login keys!
    return data; 
  } catch (error) {
    console.error("API Error at verification line:", error);
    throw error;
  }
}
