document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Field node mappings
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    //Message validation node containers
    const messageError = document.getElementById("messageError");
    const statusBox = document.getElementById("statusBox");

    let formIsValid = true;

    // 1. Validate Email using regex pattern matches
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
        toggleError(emailField, document.getElementById("emailError"), true);
        formIsValid = false;
    } else {
        toggleError(emailField, document.getElementById("emailError"), false);
    }

    // 3. If form is valid, submit it
    if (formIsValid) {
        // Here you would typically send the form data to a server
        statusBox.innerHTML = "Form submitted successfully!";
        statusBox.className = "status-alert success";
    } else {
        statusBox.innerHTML = "Please correct the errors above.";
        statusBox.className = "status-alert error";
    }
});

// Helper utility function to clean state presentation toggles
function toggleError(inputEl, errorEl, show) {
    const parent = inputEl.parentElement;
    if (show) {
        errorEl.style.display = "block";
        parent.classList.add("invalid");
    } else {
        errorEl.style.display = "none";
        parent.classList.remove("invalid");
    }
}        