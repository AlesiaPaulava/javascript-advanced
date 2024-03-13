window.addEventListener('scroll', () => {
  const scrollBtn = document.getElementById('scrollBtn');
  if (window.scrollY > 100) { //если скролл страницы вниз более 100px
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
}, { passive: true });


//клик по кнопке "Назад"
const scrollBtn = document.getElementById('scrollBtn');
scrollBtn.addEventListener('click', () => {
  window.scrollTo ({
    top: 0,
    behavior: 'smooth'
  });
})

