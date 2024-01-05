function openTab(evt, tabName) {
    var text = document.getElementsByClassName("text");
    var tablinks = document.getElementsByClassName("tablinks");

    for (var i = 0; i < text.length; i++) {
        text[i].classList.toggle("is-visible", text[i].id === tabName);
        text[i].classList.toggle("slide-in", text[i].id === tabName);
        text[i].classList.toggle("slide-out", text[i].id !== tabName);
    }

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

