let currentTabIndex = 0;
const tablinks = document.getElementsByClassName("tablinks");
const textElements = document.getElementsByClassName("text");
const slider = document.getElementById('slider');

// Click effect
document.addEventListener('click', function(e) {
    let span = document.createElement("span");
    span.className = "click_effect";
    span.style.top = `${e.pageY}px`;
    span.style.left = `${e.pageX}px`;
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 600);
});

// Tab selection
function openTab(evt, tabName) {
    let previousTabIndex = currentTabIndex;

    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("last-clicked");
        if (tablinks[i].getAttribute('data-tab') === tabName) {
            currentTabIndex = i;
            tablinks[i].classList.add("last-clicked");
        }
        tablinks[i].classList.toggle("active", tablinks[i].getAttribute('data-tab') === tabName);
    }

    applyTabAnimations(tabName, previousTabIndex);
}

// Initialize with Home
document.addEventListener('DOMContentLoaded', (event) => {
    openTab(event, 'Home');
});

// Mouse sliding on laptops
let isDragging = false;
let startX;

slider.addEventListener('mousedown', e => {
    startX = e.pageX;
    isDragging = true;
});
slider.addEventListener('mousemove', e => handleSlide(e.pageX, e => isDragging));
slider.addEventListener('mouseup', () => isDragging = false);

// Thumb sliding on phones
let isTouching = false;
let startTouchX;

slider.addEventListener('touchstart', e => {
    startTouchX = e.touches[0].pageX;
    isTouching = true;
});
slider.addEventListener('touchmove', e => handleSlide(e.touches[0].pageX, () => isTouching));
slider.addEventListener('touchend', () => isTouching = false);

// Handle slide movement
function handleSlide(currentPosition, isSliding) {
    if (!isSliding()) return;
    const delta = currentPosition - (isDragging ? startX : startTouchX);
    if (Math.abs(delta) > 20) {
        console.log(delta)
        switchTab(delta > 0 ? 'right' : 'left');
        if (isDragging) {
            startX = currentPosition;
        } else {
            startTouchX = currentPosition;
        }
        isDragging = isTouching = false;
    }
}

// Switch tabs based on slide direction
function switchTab(direction) {
    // Adjust the tab switching logic
    if (direction === 'left' && currentTabIndex < tablinks.length - 1) {
        openTab(null, tablinks[currentTabIndex + 1].getAttribute('data-tab'));
    } else if (direction === 'right' && currentTabIndex > 0) {
        openTab(null, tablinks[currentTabIndex - 1].getAttribute('data-tab'));
    }
}


// Apply animations
function applyTabAnimations(tabName, previousTabIndex) {
    for (let i = 0; i < textElements.length; i++) {
        const isCurrentTab = textElements[i].id === tabName;
        textElements[i].classList.remove("slide-in-left", "slide-in-right", "slide-out-left", "slide-out-right");
        
        if (isCurrentTab) {
            const animationClass = previousTabIndex > currentTabIndex ? "slide-in-left" : "slide-in-right";
            textElements[i].classList.add(animationClass);
        }

        if (previousTabIndex !== currentTabIndex && previousTabIndex >= 0 && previousTabIndex < textElements.length) {
            const animationClass = previousTabIndex > currentTabIndex ? "slide-out-right" : "slide-out-left";
            textElements[previousTabIndex].classList.add(animationClass);
            console.log(textElements)
        }
    }
}




// window.onpopstate = function() {
//     alert("clicked back button");
//  }; history.pushState({}, '');