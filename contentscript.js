import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  import { getDatabase, ref, push, set, update, remove, get , onValue} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
  
const firebaseConfig = {
    apiKey: "AIzaSyAJCIdAoCMcwZzcjaACxAFcOtEZFeUFQ5s",
    authDomain: "mobile-programming-f074e.firebaseapp.com",
    databaseURL: "https://mobile-programming-f074e-default-rtdb.firebaseio.com",
    projectId: "mobile-programming-f074e",
    storageBucket: "mobile-programming-f074e.firebasestorage.app",
    messagingSenderId: "314260979172",
    appId: "1:314260979172:web:886f5c77ed4cbc3f60dbf1",
    measurementId: "G-P8YGX4E6WG"
};

let db = null;
let firebaseInitialized = false;

console.log("✓ content.js loaded");
console.log("Waiting for Firebase SDK to load...");

// Wait for Firebase SDK to be available
function initializeFirebase() {
    if (typeof firebase === 'undefined') {
        console.warn("Firebase SDK not yet loaded, retrying in 100ms...");
        setTimeout(initializeFirebase, 100);
        return;
    }

    try {
        const app = firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        firebaseInitialized = true;
        console.log("✓ Firebase Realtime Database initialized successfully");
        console.log("✓ Database reference obtained:", db.ref().toString());
    } catch (error) {
        console.error("✗ Firebase initialization error:", error);
    }
}

// Start initialization
initializeFirebase();

async function sendMessage() {
    console.log("=== SEND MESSAGE CALLED ===");
    
    if (!firebaseInitialized || !db) {
        console.error("Firebase state - Initialized:", firebaseInitialized, "DB:", db);
        alert("Firebase is not initialized. Please refresh the page and try again.");
        return;
    }

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    if (!nameInput || !emailInput || !phoneInput || !messageInput) {
        console.error("Form elements missing");
        alert("Form elements not found. Please refresh the page.");
        return;
    }

    const name = (nameInput.value || "").trim();
    const email = (emailInput.value || "").trim();
    const phone = (phoneInput.value || "").trim();
    const message = (messageInput.value || "").trim();

    console.log("Form data:", { name, email, phone, message });

    // Basic validation
    if (!name || !email || !phone || !message) {
        console.warn("Validation failed: empty fields");
        alert("❌ Please fill all fields");
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        console.warn("Invalid email format:", email);
        alert("❌ Please enter a valid email address");
        return;
    }

    // Phone validation (10 digits)
    if (!/^\d{10}$/.test(phone)) {
        console.warn("Invalid phone format:", phone);
        alert("❌ Please enter a valid 10-digit phone number");
        return;
    }

    console.log("✓ All validations passed");

    try {
        console.log("Saving to Realtime Database...");
        const ref = db.ref('WomenSafety_Contact');
        const newRef = ref.push();
        await newRef.set({
            name: name,
            email: email,
            phone: phone,
            message: message,
            timestamp: new Date().toISOString()
        });

        console.log("✓ Message sent successfully with key:", newRef.key);
        alert("✓ Message sent successfully! We will contact you soon.");

        // Clear form
        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        messageInput.value = "";

    } catch (error) {
        console.error("✗ Firestore Error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        alert("❌ Error sending message: " + error.message);
    }
}

// Attach event listener when DOM is ready
function attachListener() {
    console.log("Attempting to attach event listener...");
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
        sendBtn.addEventListener("click", sendMessage);
        console.log("✓ Send button listener attached");
    } else {
        console.error("✗ Send button not found");
    }
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachListener);
    console.log("DOM still loading, waiting for DOMContentLoaded event");
} else {
    attachListener();
    console.log("DOM already loaded, attaching listeners immediately");
}
AI Reply
