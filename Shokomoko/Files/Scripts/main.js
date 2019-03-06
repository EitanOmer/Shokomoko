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

            // '@' is not the first character
            if (atIndex > 1)
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
    if (element.length == 12)
        return true;
    return false;
}
function idCheck(IDnum = "") {
    var id = IDnum;

    if (id.length >= 5 && id.length <= 9 && !isNaN(id)) {
        while (id.length < 9)
            id = '0' + id;


        var sum = 0;
        for (var i = 0, j = 1; i < id.length; i++) {
            var curNum = parseInt(id[i], 10);
            var m = (curNum * j).toString();


            for (var k = 0; k < m.length; k++)
                sum += parseInt(m[k]);

            j = (j == 1) ? 2 : 1;
        }

        if (sum % 10 == 0)
            return true;
    }
    return false;
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

            if (element.value == element2.value && element.value.length >= 6) {
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

        case 'id':
            if (idCheck(element.value)) {
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


function completePhoneNum() {
    var keynum = event.keyCode || event.charCode;

    if (keynum != 8 && keynum != 46) {
        var phoneN = document.getElementById('phone').value;
        if (phoneN.length == 3 || phoneN.length == 7) {
            document.getElementById('phone').value += '-';
        }
    }
}
function deleteChars() {
    var phoneN = document.getElementById('phone').value;
    var sliceAt = -1;

    var i = phoneN.length > 12 ? 12 : phoneN.length;
    while (i >= 0) {
        if (!(phoneN[i] >= '0' && phoneN[i] <= '9') && i != 3 && i != 7)
            sliceAt = i;
        --i;
    }

    if (sliceAt < 0)
        sliceAt = 12;
    else
        sliceAt += (sliceAt == 3 || sliceAt == 7) ? 1 : 0;
    document.getElementById('phone').value = phoneN.slice(0, sliceAt);
}