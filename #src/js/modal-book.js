(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-open-modal-book]"),
    closeModalBtn: document.querySelector("[data-close-modal-book]"),
    backdrop: document.querySelector("[data-modal-backdrop]"),
  };

  refs.openModalBtn.addEventListener("click", onOpenModal);
  refs.closeModalBtn.addEventListener("click", onCloseModal);
  refs.backdrop.addEventListener("click", onBackdrop);

  function onOpenModal() {
  refs.backdrop.classList.add("is-open");
}

  function onCloseModal(e) {
    refs.backdrop.classList.remove("is-open");
  
    if (refs.backdrop.classList.contains("is-open")) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }

  function onBackdrop(e) {
    if (e.target !== refs.backdrop) {
      return;
    }
    refs.backdrop.classList.remove("is-open");
  }

})();
