function toggleMenu() {
    const menuItems = document.querySelector('.menu-items.mobile');

    if (menuItems.style.maxHeight) {
        // Chiudere il menu
        menuItems.style.maxHeight = null; // Rimuovi l'altezza per consentire la chiusura
        setTimeout(() => {
            menuItems.style.display = "none"; // Nascondi il menu
        }, 700); // Aspetta la durata della transizione
    } else {
        // Aprire il menu
        menuItems.style.display = "flex"; // Mostra il menu

        // Utilizza requestAnimationFrame per ottenere l'altezza totale
        requestAnimationFrame(() => {
            menuItems.style.maxHeight = menuItems.scrollHeight + 1000 + "px"; // Imposta l'altezza massima per l'animazione
        });
    }
}

function checkWindowSize() {
    const menuItems = document.querySelector('.menu-items.mobile');
    if (window.innerWidth > 768) {
        menuItems.style.display = 'none';
    }
    else {
        menuItems.style.display = 'flex';
    }
}

window.addEventListener('resize', checkWindowSize);