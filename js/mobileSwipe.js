
// Mobile navigation with swipe support
const mobilePagesContainer = document.querySelector('.mobile-pages');
const mobilePages = document.querySelectorAll('.mobile-page');
const mobileNextBtn = document.querySelectorAll('.mobile-next-btn');
const mobilePrevBtn = document.querySelectorAll('.mobile-prev-btn');
const mobileNavigationButtons = document.querySelectorAll('.mobile-navigation-btn');

let currentMobilePage = 0;
let touchStartX = 0;
let touchEndX = 0;
let touchCurrentX = 0;
let isSwiping = false;

function updateMobilePage() {
    mobilePagesContainer.style.transition = 'transform 0.5s ease';
    mobilePagesContainer.style.transform = `translateX(-${currentMobilePage * 100}%)`;
}

function handleSwipe() {
    const swipeDistance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance && currentMobilePage < mobilePages.length - 1) {
        currentMobilePage++;
    } else if (swipeDistance < -minSwipeDistance && currentMobilePage > 0) {
        currentMobilePage--;
    }
    updateMobilePage();
}

// Touch events for swipe
mobilePagesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchCurrentX = touchStartX;
    isSwiping = true;
});

mobilePagesContainer.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    touchCurrentX = e.touches[0].clientX;
    const translateX = (touchCurrentX - touchStartX) - (currentMobilePage * 100 * window.innerWidth / 100);

    // Limit the swipe movement to one page width
    const maxTranslate = window.innerWidth;
    const boundedTranslate = Math.max(-maxTranslate, Math.min(maxTranslate, translateX));

    mobilePagesContainer.style.transform = `translateX(calc(-${currentMobilePage * 100}% + ${boundedTranslate}px))`;
    e.preventDefault(); // Prevent scrolling while swiping
}, { passive: false });

mobilePagesContainer.addEventListener('touchend', (e) => {
    if (!isSwiping) return;

    touchEndX = touchCurrentX;
    isSwiping = false;
    handleSwipe();
});

// Button navigation
mobileNavigationButtons.forEach((btn) => {
    btn.onclick = () => {
        currentMobilePage = parseInt(btn.getAttribute('data-page'));
        updateMobilePage();
    };
});

mobileNextBtn.forEach((btn) => {
    btn.onclick = () => {
        const nextPage = parseInt(btn.getAttribute('data-page'));
        if (nextPage <= mobilePages.length - 1) {
            currentMobilePage = nextPage;
            updateMobilePage();
        }
    };
});

mobilePrevBtn.forEach((btn) => {
    btn.onclick = () => {
        const prevPage = parseInt(btn.getAttribute('data-page'));
        if (prevPage >= 0) {
            currentMobilePage = prevPage;
            updateMobilePage();
        }
    };
});

