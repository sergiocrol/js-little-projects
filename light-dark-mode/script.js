const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// Check Local Storage For Theme
const theme = localStorage.getItem('theme');
theme 
    ? (document.documentElement.setAttribute('data-theme', theme), changeTheme(theme === 'dark'), toggleSwitch.checked = theme === 'dark' )
    : localStorage.setItem('theme', 'light');


function changeTheme(isDark) {
    const theme = isDark ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = `${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`;
    toggleIcon.children[1].classList.replace(isDark ? 'fa-sun' : 'fa-moon', isDark ? 'fa-moon' : 'fa-sun');
    image1.src = `img/undraw_proud_coder_${theme}.svg`;
    image2.src = `img/undraw_feeling_proud_${theme}.svg`;
    image3.src = `img/undraw_conceptual_idea_${theme}.svg`;
}

// Event Listener
toggleSwitch.addEventListener('change', (event) => changeTheme(event.target.checked));

