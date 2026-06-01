const contentDiv = document.getElementById('app-content');
const navLinks = document.querySelectorAll('.nav-link');

const applyTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');
};
applyTheme();

async function loadPage(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Помилка');
        const html = await response.text();
        contentDiv.innerHTML = html;
        
    
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.checked = document.body.classList.contains('dark-mode');
            themeToggle.addEventListener('change', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
            });
        }
    } catch (e) {
        contentDiv.innerHTML = '<h2>Сторінку не знайдено</h2>';
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        loadPage(link.getAttribute('href'));
    });
});

loadPage('pages/profile.html');