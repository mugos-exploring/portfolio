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
        statusBox.textContent = "Form submitted successfully!";
        statusBox.className = "status-alert success";
    } else {
        statusBox.textContent = "Please correct the errors above.";
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

//GitHub API
const githubURL =
"https://api.github.com/users/mugos-exploring/repos";
const ghProjectsContainer = document.getElementById("GH-projects");

console.log("Container element found:", ghProjectsContainer);

if (ghProjectsContainer) {
    console.log("Starting fetch...");
    ghProjectsContainer.innerHTML = "<h3>GitHub Repositories</h3><p>Loading Projects coming soon..</p>";

fetch(githubURL)
   .then(response=> {
   console.log("Response received:", response.status); 
    if (!response.ok) {
        throw new Error('HTTP error! Status: ${response.status}');
    }
    return response.json();
  })
  .then(data => {
  console.log("fetched data:", data);
    ghProjectsContainer.innerHTML = "<H3>GitHub Repositories</h3>";

    if (data.length === 0) {
        ghProjectsContainer.innerHTML += "<p>No public repositories found.</p>";
        return;
    }

    data.forEach(repo => {
        const repoDIV = document.createElement("div");
        repoDIV.className = "project-list"; 

        repoDIV.innerHTML = `<p><strong>repo-name</strong> - <a href="${repo.html_url}" target="_blank" class="link">GITHUB REPO</a></p> `;

        ghProjectsContainer.appendChild(repoDIV);
    });
  })
  .catch(error => {
    console.error("Error fetching GitHub data:", error);
    ghProjectsContainer.innerHTML = '<h3>GitHub Repositories </h3> <p class="error">Unable to load GitHub repositories at this time.</p> ';
    });
 } else {
   console.log("Error: Element with ID 'GH-projects' was not found on this page.");
}  
