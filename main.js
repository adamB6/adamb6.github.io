var currentTabIndex = 0;

// Click effect
document.addEventListener('click', function(e) {
    let span = document.createElement("span");
    span.classList.add("click_effect");
    span.style.top = `${e.pageY}px`;
    span.style.left = `${e.pageX}px`;
    document.body.appendChild(span);

    setTimeout(() => {
        span.remove();
    }, 600);
});

/* -------------------- This is for tab selection ------------------------------ */
function openTab(evt, tabName) {
    var text = document.getElementsByClassName("text");
    var tablinks = document.getElementsByClassName("tablinks");
    var previousTabIndex = currentTabIndex; // Store the previous index

    // Update currentTabIndex to the new tab's index
    for (var i = 0; i < tablinks.length; i++) {
        // Remove green text class from all tabs
        tablinks[i].classList.remove("last-clicked");

        // Check if this tab is the one being activated
        if (tablinks[i].getAttribute('data-tab') === tabName) {
            currentTabIndex = i;
            // Add green text class to the active tab
            tablinks[i].classList.add("last-clicked");
            console.log(tablinks[i].classList);
        }
    }

    // Apply animations based on the index comparison
    for (var i = 0; i < text.length; i++) {
        var isCurrentTab = text[i].id === tabName;
        if (isCurrentTab) {
            if (previousTabIndex > currentTabIndex) {
                // Slide in from left if previous index was higher
                text[i].classList.add("slide-in-left");
                text[previousTabIndex].classList.add("slide-out-right");
                text[i].classList.remove("slide-in-right", "slide-out-left", "slide-out-right");
            } else {
                // Slide in from right if previous index was lower or the same
                text[i].classList.add("slide-in-right");
                text[previousTabIndex].classList.add("slide-out-left");
                text[i].classList.remove("slide-in-left", "slide-out-left", "slide-out-right");
            }
        } else {
            text[i].classList.remove("slide-in-left", "slide-in-right");
        }
    }

    // Update the active class for the tab links
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.toggle("active", tablinks[i].getAttribute('data-tab') === tabName);
    }
}


// Initialize with Home
document.addEventListener('DOMContentLoaded', (event) => {
    openTab(event, 'Home');
});

/*----------------- This is for mouse sliding (laptops) ------------------------- */
const slider = document.getElementById('slider');
let isDragging = false;
let startX;

// When the mouse is pressed down on the slider
slider.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    isDragging = true;
});

// When the mouse is moved while dragging
slider.addEventListener('mousemove', function(e) {
    if (!isDragging) return;

    const currentX = e.pageX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > 20) { // Threshold for detecting a slide
        // Determine the direction of the slide
        if (deltaX > 0) {
            // Slide Right
            switchTab('right');
        } else {
            // Slide Left
            switchTab('left');
        }
        // Reset dragging state and startX
        isDragging = false;
        startX = currentX;
    }
});

// When the mouse button is released
slider.addEventListener('mouseup', function(e) {
    isDragging = false;
});

// Function to switch tabs based on slide direction
function switchTab(direction) {
    var tablinks = document.getElementsByClassName("tablinks");

    if (direction === 'right') {
        // Move to the next tab, if possible
        if (currentTabIndex < tablinks.length - 1) {
            openTab(event, tablinks[currentTabIndex + 1].getAttribute('data-tab'));
        }
    } else {
        // Move to the previous tab, if possible
        if (currentTabIndex > 0) {
            openTab(event, tablinks[currentTabIndex - 1].getAttribute('data-tab'));
        }
    }
}

/* ---------------------- This is for thumb sliding (phones) ----------------------------------- */

let isTouching = false;
let startTouchX;

// When a touch starts on the slider
slider.addEventListener('touchstart', function(e) {
    startTouchX = e.touches[0].pageX;
    isTouching = true;
});

// When a touch moves on the slider
slider.addEventListener('touchmove', function(e) {
    if (!isTouching) return;

    const currentTouchX = e.touches[0].pageX;
    const deltaTouchX = currentTouchX - startTouchX;

    if (Math.abs(deltaTouchX) > 20) { // Threshold for detecting a slide
        // Determine the direction of the slide
        if (deltaTouchX > 0) {
            // Slide Right
            switchTab('right');
        } else {
            // Slide Left
            switchTab('left');
        }
        // Reset touching state and startTouchX
        isTouching = false;
        startTouchX = currentTouchX;
    }
});

// When the touch ends
slider.addEventListener('touchend', function(e) {
    isTouching = false;
});