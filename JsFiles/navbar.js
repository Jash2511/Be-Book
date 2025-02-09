//Handle Right NavBar

const homei = document.querySelector('.fa-house');
const bookmarki = document.querySelector('.fa-bookmark');
const documenti = document.querySelector('.fa-exclamaation');

homei.addEventListener('click', (e) => {
    const t = document.querySelector('html').getBoundingClientRect().height;
    window.scrollBy(0, -t);
})
bookmarki.addEventListener('click', (e) => {
    const t = document.querySelector('.bookmarked').getBoundingClientRect().height;
    window.scrollBy(0,t);
})

