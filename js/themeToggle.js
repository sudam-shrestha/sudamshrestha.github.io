
// Theme toggle
window.onload = () => {
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }

    const savedTheme = localStorage.getItem('theme');
    const toggleCheckbox = document.getElementById('toggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleCheckbox.checked = false;
    } else {
        document.body.classList.remove('dark-theme');
        toggleCheckbox.checked = true;
    }
};

document.getElementById('toggle').addEventListener('change', function () {
    toggleTheme();
});

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}