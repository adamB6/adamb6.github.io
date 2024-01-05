const menuToggle = document.querySelector('.toggle')
const showcase = document.querySelector('.showcase')

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active')
    showcase.classList.toggle('active')
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
})

document.getElementById('menuToggle').addEventListener('click', function() {
    var video = document.getElementById('nebulaVideo');
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});