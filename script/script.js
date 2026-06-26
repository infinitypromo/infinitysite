// usuário "cadastrado" fixo
const usuarios = [
    { email: "infinitypromo@gmail.com", senha: "1234" }
];

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

    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuarioEncontrado) {
        senhaError.innerText = "Email ou senha incorretos";
        return;
    }

    window.location.href = "index.html";
};