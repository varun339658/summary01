import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAO7GdIQS9s9yw5vQ2-sfIHNrgjSPa6yBg",
  authDomain: "loginform-54dd9.firebaseapp.com",
  projectId: "loginform-54dd9",
  storageBucket: "loginform-54dd9.appspot.com",
  messagingSenderId: "619855148461",
  appId: "1:619855148461:web:a1aa4198e580e22eb71d24"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('submit').addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        alert("Account created successfully!");
        console.log("User:", userCredential.user);
        window.location.href = "1.html"; // Redirect after successful signup
    })
    .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
            // If email already exists, try logging in
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Logged in successfully!");
                console.log("User:", userCredential.user);
                window.location.href = "1.html"; // Redirect after successful login
            })
            .catch((loginError) => {
                alert(loginError.message);
                console.error("Login Error:", loginError.code, loginError.message);
            });
        } else {
            alert(error.message);
            console.error("Signup Error:", error.code, error.message);
        }
    });
});
