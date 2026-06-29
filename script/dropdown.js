function toggleMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu.classList.contains('mostrar')) {
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            menu.classList.remove('mostrar');
            menu.style.display = 'none';
        }, 300);
    } else {
        menu.style.display = 'block';
        menu.classList.add('mostrar');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                menu.style.opacity = '1';
                menu.style.transform = 'translateY(0)';
            });
        });
    }
}

function simularLogin() {
    document.getElementById('secaoLogado').style.display = 'block';
    document.getElementById('secaoDeslogado').style.display = 'none';
    toggleMenu();
}

function simularLogout() {
    document.getElementById('secaoLogado').style.display = 'none';
    document.getElementById('secaoDeslogado').style.display = 'block';
    toggleMenu();
}

document.addEventListener('click', function(e) {
    const container = document.querySelector('.profile-container');
    const menu = document.getElementById('profileMenu');
    if (container && !container.contains(e.target) && menu.classList.contains('mostrar')) {
        toggleMenu();
    }
});
