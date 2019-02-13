// JavaScript source code for the Sign-up and Log-in forms

var logSignContainer = document.getElementById('logSignContainer').style;
var logInBox = document.getElementById('logInBox').style;
var signUpBox = document.getElementById('signUpBox').style;

function toggleContainer() {
    if (logSignContainer.display == 'none') {
        logSignContainer.display = 'block';
        document.getElementById('logSignContainer').animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ],
            { duration: 200 }
        )
    }
    else
        logSignContainer.display = 'none';
}
function toggleLogIn() {
    logInBox.display = (logInBox.display == 'none') ? 'block' : 'none';
}
function toggleSignUp() {
    signUpBox.display = (signUpBox.display == 'none') ? 'block' : 'none';
}