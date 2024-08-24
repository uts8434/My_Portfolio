document.addEventListener("DOMContentLoaded", function () {
    const nameElement = document.querySelector('.name');
    const cursor = document.querySelector('.cursor');
    const nameText = "I'm Utsav Kumar Singh"; // Your text here
    let i = 0;
    let isTyping = true; // To track typing or pausing state

    function typeWriter() {
        if (isTyping) {
            if (i < nameText.length) {
                nameElement.style.opacity = 1; // Show the name element
                nameElement.textContent += nameText.charAt(i);
                i++;
                setTimeout(typeWriter, 200); // Adjust typing speed here
            } else {
                isTyping = false; // Start pausing
                cursor.style.visibility = 'hidden'; // Hide cursor during pause
                setTimeout(() => {
                    // Pause for 2 seconds before restarting
                    isTyping = true;
                    cursor.style.visibility = 'visible'; // Show cursor again
                    i = 0; // Reset index
                    nameElement.textContent = ''; // Clear the text
                    typeWriter();
                }, 2000); // Pause duration
            }
        }
    }

    typeWriter(); // Start the typing effect once
});


document.addEventListener("DOMContentLoaded", () => {
    const skillBars = document.querySelectorAll('.progress span');

    skillBars.forEach(skillBar => {
        const percent = parseInt(skillBar.textContent);
        skillBar.style.width = percent + '%';
    });
});


document.addEventListener("scroll", function () {
    var goTopButton = document.getElementById("go-top");

    if (window.scrollY > 100) { // Change '100' to any value depending on when you want the button to appear
        goTopButton.style.display = "flex";
    } else {
        goTopButton.style.display = "none";
    }
});



function togglebars() {
    const bars = document.querySelector(".fa-bars");
    const xmark = document.querySelector(".fa-xmark");
    const nav = document.querySelector(".main-navigation");

    if (bars.style.display !== "none") {
        nav.style.display = "flex";
        xmark.style.display = "block";
        bars.style.display = "none";
    } else {
        nav.style.display = "none";
        xmark.style.display = "none";
        bars.style.display = "block";
    }
};
document.querySelector(".toggle").addEventListener("click", () => {

});


document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Display loader
    const submitLoader = document.getElementById('submit-loader');
    const messageWarning = document.getElementById('message-warning');
    const messageSuccess = document.getElementById('message-success');
    submitLoader.style.display = 'block';
    messageWarning.style.display = 'none';
    messageSuccess.style.display = 'none';

    // Send form data
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(new FormData(this))
    })
        .then(response => response.json())
        .then(data => {
            submitLoader.style.display = 'none'; // Hide loader
            if (data.success) {
                messageSuccess.style.display = 'block'; // Show success message
                this.reset(); // Reset form fields
            } else {
                messageWarning.textContent = data.message || 'Something went wrong.';
                messageWarning.style.display = 'block'; // Show warning message
            }
        })
        .catch(error => {
            submitLoader.style.display = 'none'; // Hide loader
            messageWarning.textContent = 'An error occurred while sending the email.';
            messageWarning.style.display = 'block'; // Show warning message
        });
});













