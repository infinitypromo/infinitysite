import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

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
const db = getFirestore(app);

document.getElementById("btnCadastrar").onclick = async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmarSenha").value;
    const username = document.getElementById("username").value;

    const emailError = document.getElementById("emailError");
    const senhaError = document.getElementById("senhaError");
    const confirmarError = document.getElementById("confirmarError");
    const usernameError = document.getElementById("usernameError");

    emailError.innerText = "";
    senhaError.innerText = "";
    confirmarError.innerText = "";
    usernameError.innerText = "";

    if (!username) { usernameError.innerText = "Digite um nome de usuário"; return; }
    if (!email) { emailError.innerText = "Digite seu email"; return; }
    if (!senha) { senhaError.innerText = "Digite sua senha"; return; }
    if (senha.length < 6) { senhaError.innerText = "Mínimo 6 caracteres"; return; }
    if (senha !== confirmar) { confirmarError.innerText = "As senhas não coincidem"; return; }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        
        await setDoc(doc(db, "usuarios", user.uid), {
            username: username,
            email: email,
            bio: "",
            fotoPerfil: "",
            dataCadastro: new Date().toISOString()
        });

        await sendEmailVerification(user);
        alert("Conta criada! Verifique seu email para ativar a conta.");
        window.location.href = "login.html";
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            emailError.innerText = "Este email já está cadastrado";
        } else {
            emailError.innerText = "Erro ao cadastrar, tente novamente";
        }
    }
};