var currentTabIndex = 0;

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

