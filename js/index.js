// next & prev page turn
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.contact-me');
const projectBtn = document.querySelector('.projects');
const navigationButtons = document.querySelectorAll('.navigation-btn');

pageTurnBtn.forEach((e, index) => {
    e.onclick = () => {
        const pageTurnId = e.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');

            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index
            }, 500)
        } else {
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index
            }, 500)
        }
    }
})

// contact page turn 
contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add('turn');

            setTimeout(() => {
                page.style.zIndex = 20 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    })
}

projectBtn.onclick = () => {
    pages.forEach((page, index) => {
        if (index !== 2) {
            setTimeout(() => {
                page.classList.add('turn');

                setTimeout(() => {
                    page.style.zIndex = 20 + index;
                }, 500)
            }, (index) * 200 + 100)
        }
    })
}

// create reverse index function
let totalPages = pages.length;

let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

// back to profile
const backProfileBtn = document.querySelector('.back-profile');
backProfileBtn.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex()
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex()
                pages[pageNumber].style.zIndex = 10 + index
            }, 500)
        }, (index + 1) * 200 + 100)
    })
}

// opening animation
const coverRight = document.querySelector('.cover.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');

// cover page
setTimeout(() => {
    coverRight.classList.add('turn');
}, 2100)

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800)

// profile page
setTimeout(() => {
    pageLeft.style.zIndex = 20;
}, 3200)

// all page
pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex()
        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
            reverseIndex()
            pages[pageNumber].style.zIndex = 10 + index
        }, 500)
    }, (index + 1) * 200 + 2100)
})
