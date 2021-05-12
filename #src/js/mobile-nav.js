(() => {
    const burgerBtnRef = document.querySelector('[data-nav-btn]');
    const mobileMenuRef = document.querySelector('[data-mobile-navigation]');
    const body = document.querySelector('body');

    burgerBtnRef.addEventListener("click", (event) => {
        const expanded =
            burgerBtnRef.getAttribute("aria-expanded") === "true" || false;

        burgerBtnRef.classList.toggle("is-open");
        burgerBtnRef.setAttribute("aria-expanded", !expanded);
        mobileMenuRef.classList.toggle("is-open");
        if(mobileMenuRef.classList.contains("is-open")) {
            body.style.overflow = 'hidden';
        } else ( body.style.overflow = "auto" )
    });

    mobileMenuRef.addEventListener('click', (event) => {
        const expanded = burgerBtnRef.getAttribute("aria-expanded") === "true" || false;
        
     if(event.target.classList.contains('mobile-nav__overlay') || event.target.tagName === 'A') {
        mobileMenuRef.classList.toggle("is-open");
        burgerBtnRef.classList.toggle("is-open");
        burgerBtnRef.setAttribute("aria-expanded", !expanded);
         
        body.style.overflow = "auto"
     }
        // console.dir(event.target.tagName === 'A')
        // if (event.target.tagName === 'A') {
            
        // }
    }) 

})();