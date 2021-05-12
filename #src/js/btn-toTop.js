const btnTop = document.querySelector('[data-top-btn]');

btnTop.addEventListener('click', (e) =>   
  window.scrollTo({
    behavior: "smooth",
    top,
 })
)