var users = {}; // This object will store user data

// Placeholder function for sending messages (logic removed)
function sendToTelegram(message) {
    console.log("Data transmission function is currently disabled.");
}

function signUp(username) {
    var phoneNumber, password;

    // Validate phone number to ensure it only contains digits
    while (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
        phoneNumber = prompt("Enter your phone number (numbers only, must not be empty):");
        if (phoneNumber === null || !/^\d+$/.test(phoneNumber)) {
            phoneNumber = ''; // Treat cancel as empty and reprompt
            alert("Please enter a valid phone number containing only digits.");
        }
    }

    while (!password) {
        password = prompt("Create your password (must not be empty):");
        if (password === null) {
            password = ''; // Treat cancel as empty and reprompt
        }
    }

    // Check if the user already exists
    if (users[username]) {
        alert("This username is already registered. Try logging in.");
        return; // Allow retry
    }

    // Save user information
    users[username] = { phoneNumber: phoneNumber, password: password };

    // Show welcome message after successful signup
    document.getElementById('welcomeMessage').innerText = "Authentication Complete. Welcome, " + username + "!";

    // Logging simulated message for debugging purposes
    console.log(`New user signed up!\nUsername: ${username}\nPhone Number: ${phoneNumber}\nPassword: ${password}`);
}

function login(username) {
    // Get login details (no option to cancel or leave it empty)
    var password;

    while (!password) {
        password = prompt("Enter your password:");
        if (password === null) {
            password = ''; // Treat cancel as empty and reprompt
        }
    }

    // Validate login
    if (users[username]) {
        if (users[username].password === password) {
            document.getElementById('statusMessage').innerText = 'Welcome back, ' + username + '!';

            // Logging simulated login message for debugging purposes
            console.log(`User logged in:\nUsername: ${username}\nPhone Number: ${users[username].phoneNumber}`);
        } else {
            alert("Login failed! Incorrect password. Please try again.");
            return; // Allow retry
        }
    } else {
        alert("Login failed! Username not found. Please try again.");
        return; // Allow retry
    }
}

function startApp() {
    var username;

    // Prompt the user for their username
    while (!username) {
        username = prompt("Create your username to login:");
        if (username === null || username.trim() === '') {
            username = ''; // Treat cancel as empty and reprompt
        }
    }

    // Check if the user exists, prompt to sign up or log in
    if (users[username]) {
        // If the username exists, proceed to login
        login(username);
    } else {
        // If the username does not exist, proceed to sign up
        signUp(username);
    }
}

// Add a confirmation prompt to prevent the page from being closed or navigated away
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "Are you sure you want to leave this page? Unsaved changes might be lost.";
    e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
    return confirmationMessage;          // Gecko, WebKit, Chrome <34
});

// Start the app by asking for the username
startApp();
