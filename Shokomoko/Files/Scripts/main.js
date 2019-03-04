/*--------------------------------------FORMS--------------------------------------*/
function isName(element = "") {
    if (element == "" || element.length < 2)    // not blank or has names smaller than 2 letters (e.g 'им')
        return false;
    else {
        var legalChars = new RegExp("^[a-zA-Z\-\u0590-\u05FF ']+$");
        return legalChars.test(element);
    }
}
function isEmail(element = "") {
    var valid = false;

    var atIndex, dotIndex;

    for (var i = 0; i < element.length && !valid; i++) {
        // has '@'
        if (element[i] == '@') {
            atIndex = i;

            while (++i < element.length) {
                // has '.' after '@' with at least 1 character in between (for '@gmail'/ '@walla' etc.)
                if (element[i] == '.') {
                    dotIndex = i;

                    if (dotIndex - atIndex > 1)
                        while (++i < element.length) {
                            // has at least 3 characters after '.' (for '.com'/ '.co.il' etc.)
                            if (element.length - i >= 3) 
                                valid = true;
                        }
                }
            }
        }
    }
    for (var i = 0; i < element.length && valid; i++) {
        var legalChars = new RegExp("^[a-zA-Z0-9@.']+$");   // only numbers, English letters, '.', '@'
        valid = legalChars.test(element);
    }

    return valid;
}
function isPass(element = "") {
    if (element.length >= 6 && element.length <= 16) {
        var numbers = 0;
        var letters = 0;
        var others = 0;

        for (var i = 0; i < element.length; i++) {
            if (element[i] >= '0' && element[i] <= '9')
                ++numbers;
            else if ((element[i] <= 'z' && element[i] >= 'a') ||
                (element[i] <= 'Z' && element[i] >= 'A'))
                ++letters;
            else
                ++others;
        }

        if (numbers > 0 && letters > 0 && others == 0)
            return true;
    }
    return false;
}
function isPhone(element = "") {
    var phoneNumber = "";

    for (var i = 0; i < element.length; i++) {
        if (!isNaN(element[i]))
            phoneNumber += element[i];
    }
    if (phoneNumber.length != 7)
        return false;

    return true;
}
function blank(element = "", minLength) {
    if (element.length < minLength)
        return true;
    return false;
}


function validField(checkType = "", id = "") {
    var element;

    if (id == "")
        element = document.getElementById(checkType);
    else
        element = document.getElementById(id);

    switch (checkType) {
        case 'name':
            if (isName(element.value)) {
                element.style.borderColor = "rgb(50,205,50)";
                element.style.borderWidth = "3px";
            }
            else {
                element.style.borderColor = "rgb(255, 72, 0)";
                element.style.borderWidth = "5px";
            }

            break;

        case 'email':
            if (isEmail(element.value)) {
                element.style.borderColor = "rgb(50,205,50)";
                element.style.borderWidth = "3px";
            }
            else {
                element.style.borderColor = "rgb(255, 72, 0)";
                element.style.borderWidth = "5px";
            }

            break;

        case 'pass':
            if (isPass(element.value)) {
                element.style.borderColor = "rgb(50,205,50)";
                element.style.borderWidth = "3px";
            }
            else {
                element.style.borderColor = "rgb(255, 72, 0)";
                element.style.borderWidth = "5px";
            }

            break;

        case 'passVar':
            var element2 = document.getElementById("signPass");

            if (element.value == element2.value) {
                element.style.borderColor = "rgb(50,205,50)";
                element.style.borderWidth = "3px";
            }
            else {
                element.style.borderColor = "rgb(255, 72, 0)";
                element.style.borderWidth = "5px";
            }

            break;

        case 'phone':
            if (isPhone(element.value)) {
                element.style.borderColor = "rgb(50,205,50)";
                element.style.borderWidth = "3px";
            }
            else {
                element.style.borderColor = "rgb(255, 72, 0)";
                element.style.borderWidth = "5px";
            }

            break;

        default:
            var minLength;
            if (checkType == 'subject')
                minLength = 5;
            else if (checkType == 'message')
                minLength = 25;

            if (!blank(element.value, minLength)) {
                element.style.borderColor = "rgb(50,205,50)";
                element.style.borderWidth = "3px";
            }
            else {
                element.style.borderColor = "rgb(255, 72, 0)";
                element.style.borderWidth = "5px";
            }

            break;
    }
}
function formValid(formId) {
    var formLength = document.getElementById(formId).length;
    var errorMessage = document.getElementById("errorMessage");
    var successMessage = document.getElementById("successMessage");

    // check if all inputs are valid
    for (var i = 0; i < formLength; ++i) {
        var element = document.getElementById(formId).elements[i];

        if (element.style.borderWidth > "3px" || element.value == "") {
            successMessage.style.display = "none";

            errorMessage.style.display = "inherit";
            errorMessage.style.fontSize = "23px";
            errorMessage.style.fontWeight = "bold";
            errorMessage.style.textDecoration = "underline";
            errorMessage.style.textShadow = "2px 2px 1px rgba(0,0,0,0.7)";
            errorMessage.style.color = "rgb(255, 72, 0)";

            return false;
        }
    }

    // reset form
    if (formId == "contactForm")
        resetContactForm(formId);


    errorMessage.style.display = "none";

    successMessage.style.display = "inherit";
    successMessage.style.fontSize = "23px";
    successMessage.style.fontWeight = "bold";
    successMessage.style.textShadow = "2px 2px 1px rgba(0,0,0,0.7)";
    successMessage.style.color = "rgb(50, 205, 50)";

    return true;
}

function resetContactForm(formId) {
    var formLength = document.getElementById(formId).length;

    for (var i = 0; i < formLength; ++i) {
        var element = document.getElementById(formId).elements[i];

        if (element.style.borderWidth == "3px") {
            if (element.tagName == "TEXTAREA")
                element.style.borderColor = "lightgrey";
            else
                element.style.borderColor = "white";
            element.value = "";
        }
    }
}