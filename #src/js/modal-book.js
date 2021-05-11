(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-open-modal-book]"),
    closeModalBtn: document.querySelector("[data-close-modal-book]"),
    backdrop: document.querySelector("[data-modal-backdrop]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.backdrop.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.backdrop.classList.toggle("is-open");

    if (refs.backdrop.classList.contains("is-open")) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }

})();
