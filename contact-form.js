document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var formData = new FormData(this);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Use .text() to log the raw response
        .then(data => {
            console.log('Raw response:', data); // Log the raw response
            var formMessage = document.getElementById('form-message');
            try {
                var jsonData = JSON.parse(data); // Parse the JSON
                if (jsonData.error) {
                    formMessage.textContent = jsonData.error;
                    formMessage.style.color = 'red';
                    console.error('Error:', jsonData.error);
                } else {
                    formMessage.textContent = jsonData.message;
                    formMessage.style.color = 'green';
                    document.getElementById("contact-form").reset();
                }
            } catch (e) {
                formMessage.textContent = 'An error occurred. Please try again later.';
                formMessage.style.color = 'red';
                console.error('JSON parse error:', e);
                console.error('Data received:', data);
            }
        })
        .catch(error => {
            document.getElementById('form-message').textContent = 'An error occurred. Please try again later.';
            document.getElementById('form-message').style.color = 'red';
            console.error('Fetch error:', error);
        });
    });
});
