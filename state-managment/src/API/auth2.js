// src/API/auth2.js

// ❌ REMOVE THIS BROKEN LINE:
// const BASE_URL = "https://railway.app"; 

// ✅ PASTE THIS CORRECT LINE:
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
    console.error({ "message": "password must be at least 6 characters long" }
);
    throw error; 
  }
}
