console.log("Auth.js is loaded and running!");

// Import Firebase modules - updated for Firebase v10.7.1
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDXG97XhRCgx-MAuMYF0Xw_Lp54nAUDUWM",
  authDomain: "esports-b4d92.firebaseapp.com",
  projectId: "esports-b4d92",
  storageBucket: "esports-b4d92.firebasestorage.app",
  messagingSenderId: "516022937121",
  appId: "1:516022937121:web:585265e5c64b2d8d31e560",
  measurementId: "G-RFZZ919J79",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signInWithGoogle() {
  console.log("signInWithGoogle function called");
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) {
      throw new Error("No user data available");
    }

    const idToken = await user.getIdToken();
    const displayName = user.displayName || "Anonymous";

    // Store both user data and token
    localStorage.setItem(
      "user",
      JSON.stringify({
        displayName: displayName,
        email: user.email,
        uid: user.uid,
      })
    );
    localStorage.setItem("token", idToken); // Add this line to store the token

    // Try to send to backend, but don't block signin if it fails
    try {
      await sendTokenToBackend(idToken);
    } catch (backendError) {
      console.warn(
        "Backend sync failed, continuing with local authentication:",
        backendError
      );
    }

    return user;
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    throw error;
  }
}

async function sendTokenToBackend(token) {
  try {
    const response = await fetch("http://localhost:8000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    if (!response.ok) {
      throw new Error(`Backend response error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes("CONNECTION_REFUSED")) {
      throw new Error(
        "Backend server is not running. Please start the server."
      );
    }
    throw error;
  }
}

export { app, auth };
