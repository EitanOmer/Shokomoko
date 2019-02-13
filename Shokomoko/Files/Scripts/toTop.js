// JavaScript source code for the back to top button

var element = document.getElementById('backToTop').style;
element.opacity = 0;
var toTopDisplayed = false;

window.onscroll = function () {
    if (window.pageYOffset >= 500) {
        element.display = 'block';
        if (!toTopDisplayed) {
            document.getElementById('backToTop').animate(
                [
                    { opacity: 0 },
                    { opacity: 0.95 },
                ],
                { duration: 650 }
            );
            toTopDisplayed = true;
            element.opacity = 0.95;
        }
    }
    else if (window.pageYOffset <= 300 && toTopDisplayed) {
        document.getElementById('backToTop').animate(
            [
                { opacity: 0.95 },
                { opacity: 0 },
            ],
            { duration: 600 }
        );
        element.opacity = 0;
        toTopDisplayed = false;
    }
}
