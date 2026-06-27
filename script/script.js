import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAjob3asnTK4WIf8-KfXR6vPgb2T1kLOvY",
    authDomain: "site-infinity-aaa62.firebaseapp.com",
    projectId: "site-infinity-aaa62",
    storageBucket: "site-infinity-aaa62.firebasestorage.app",
    messagingSenderId: "720669948356",
    appId: "1:720669948356:web:61dfcdf303dc72e6b7cc91"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("btnEntrar").onclick = async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    const emailError = document.getElementById("emailError");
    const senhaError = document.getElementById("senhaError");

    emailError.innerText = "";
    senhaError.innerText = "";

    if (!email) { emailError.innerText = "Digite seu email"; return; }
    if (!senha) { senhaError.innerText = "Digite sua senha"; return; }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        if (!user.emailVerified) {
            senhaError.innerText = "Verifique seu email antes de entrar.";
            // Manda outro email caso não tenha recebido
            await sendEmailVerification(user);
            alert("Email de verificação reenviado! Verifique sua caixa de entrada.");
            return;
        }

        window.location.href = "index.html";
    } catch (error) {
        senhaError.innerText = "Email ou senha incorretos";
    }
};

document.getElementById("btnEsqueci").onclick = async () => {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");

    emailError.innerText = "";

    if (!email) { emailError.innerText = "Digite seu email primeiro"; return; }

    try {
        await sendPasswordResetEmail(auth, email);
        alert("Email de redefinição enviado! Verifique sua caixa de entrada.");
    } catch (error) {
        emailError.innerText = "Email não encontrado";
    }
};