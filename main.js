import BlogPost from './models/BlogPost.js';

let currentTabIndex = 0;
const tablinks = document.getElementsByClassName("tablinks");
const textElements = document.getElementsByClassName("text");
const slider = document.getElementById('slider');

// Click effect
document.addEventListener('click', function (e) {
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

document.addEventListener('DOMContentLoaded', () => {
    const tablinks = document.querySelectorAll('.tablinks');

    tablinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default action
            const tabName = this.getAttribute('data-tab');
            openTab(e, tabName);
        });
    });

    // Initialize with Home or another default tab if needed
    openTab(null, 'Home');

    // Load newest posts
    loadNewestPosts();

    // Load projects
    loadProjects();

    // Handle contact form submission
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(responseText => {
            document.getElementById('form-message').textContent = responseText;
            form.reset();
        })
        .catch(error => {
            document.getElementById('form-message').textContent = 'Oops! There was a problem with your submission.';
            console.error('Error:', error);
        });
    });
});

// Mouse sliding
let isDragging = false;
let startX;

slider.addEventListener('mousedown', e => {
    startX = e.pageX;
    isDragging = true;
});
slider.addEventListener('mousemove', e => handleSlide(e.pageX, () => isDragging));
slider.addEventListener('mouseup', () => isDragging = false);

// Thumb sliding
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
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadNewestPosts();
    loadProjects();
});

let blogPosts = []; // Array to store BlogPost instances

function loadNewestPosts() {
    fetch('./blog.php?action=newest')
        .then(response => response.json())
        .then(posts => {
            blogPosts = posts.map(post => new BlogPost(post.id, post.title, post.content, post.created_on)); // Assuming 'created_on' field is returned
            const container = document.getElementById('Blog');
            container.innerHTML = '<h3>Blog</h3>'; // Clear existing content
            blogPosts.forEach(blogPost => {
                const postElement = document.createElement('div');
                postElement.className = 'blog-post';
                postElement.innerHTML = blogPost.getSummaryHTML();
                container.appendChild(postElement);

                const readMoreLink = postElement.querySelector('.read-more');
                readMoreLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    loadPost(blogPost.id);
                });
            });
        })
        .catch(error => console.error('Error loading posts:', error));
}

function loadPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        const postView = document.getElementById('PostView');
        postView.innerHTML = post.getFullHTML();
        postView.style.display = 'block';
        // Optionally, switch to the PostView tab programmatically
        openTab(null, 'PostView');
    } else {
        console.error('Post not found');
    }
}

// Function to load projects
function loadProjects() {
    fetch('./projects.php?action=getProjects')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('Projects');
            container.innerHTML = '<h3>Projects</h3>'; // Clear existing content
            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'project';
                projectElement.innerHTML = `
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                `;
                container.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
}
