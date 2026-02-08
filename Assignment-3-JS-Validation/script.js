const form = document.getElementById("contactForm");

const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let valid = true;

  // Name validation
  if (nameField.value.trim() === "") {
    showError(nameField, "Name is required");
    valid = false;
  } else {
    clearError(nameField);
  }

  // Email validation
  if (emailField.value.trim() === "") {
    showError(emailField, "Email is required");
    valid = false;
  } else if (!validateEmail(emailField.value)) {
    showError(emailField, "Invalid email format");
    valid = false;
  } else {
    clearError(emailField);
  }

  // Password validation
  if (passwordField.value.length < 6) {
    showError(passwordField, "Password must be at least 6 characters");
    valid = false;
  } else {
    clearError(passwordField);
  }

  if (valid) {
    alert("Form submitted successfully!");
    form.reset();
  }
});

function showError(input, message) {
  input.nextElementSibling.innerText = message;
}

function clearError(input) {
  input.nextElementSibling.innerText = "";
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
