function loginForm() {
    let loginForm = document.getElementById('loginForm')
    if (loginForm) {
        let emailInput = document.getElementById('email')
        let passwordInput = document.getElementById('password')

        let emailError = document.getElementById('emailError');
        let senhaError = document.getElementById('senhaError');

        function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    }
}
