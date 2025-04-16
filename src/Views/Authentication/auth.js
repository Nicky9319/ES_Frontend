console.log("Auth.js is loaded and running!");

// Import Firebase modules - updated for Firebase v10.7.1
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiD4jRC0vKLvGAmAUrBECVXASniy2SB6w",
    authDomain: "guide-co.firebaseapp.com",
    projectId: "guide-co",
    storageBucket: "guide-co.appspot.com",
    messagingSenderId: "973274032129",
    appId: "1:973274032129:web:169cf67aa1efabbd393800",
    measurementId: "G-BH601T1ZZ1"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


async function signInWithGoogle() {
    console.log("signInWithGoogle function called");
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const idToken = await user.getIdToken(); // Get Firebase JWT
        // Display user info
        document.getElementById("userInfo").innerText = `Signed in as: ${user.displayName}`;
        console.log("JWT Token:", idToken);
        // Send JWT to backend
        sendTokenToBackend(idToken);
    } catch (error) {
        console.error("Error during sign-in:", error.message);
    }
}

async function sendTokenToBackend(token) {
    try {
        const response = await fetch("https://your-backend.com/api/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: token })
        });
        const data = await response.json();
        console.log("Backend Response:", data);
    } catch (error) {
        console.error("Error sending token to backend:", error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    const signInButton = document.getElementById("googleSignInButton");
    if (signInButton) {
        console.log("Sign-in button found");
        signInButton.addEventListener("click", signInWithGoogle);
    } else {
        console.error("Sign-in button not found in the DOM");
    }
});