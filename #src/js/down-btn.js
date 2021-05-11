const btn = document.querySelector('[data-hero-btn]');

btn.addEventListener('click', (e) => 
  window.scrollTo({
    behavior: 'smooth',
    top: document.documentElement.clientHeight
 })
)