document.getElementById("btnEntrar").onclick = () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    const emailError = document.getElementById("emailError");
    const senhaError = document.getElementById("senhaError");

    emailError.innerText = "";
    senhaError.innerText = "";

    if (!email) {
        emailError.innerText = "Digite seu email";
        return;
    }
    if (!senha) {
        senhaError.innerText = "Digite sua senha";
        return;
    }

    window.location.href = "index.html";
};