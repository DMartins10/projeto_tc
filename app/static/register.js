var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm(currentTab)) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm(currentTab) {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    var validacao_nome = /^[a-zA-Z]{2,}$/g
    var validacao_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
    var validacao_telemovel = /^(\d{9})|(\d{3} \d{3} \d{3})|(\d{3}-\d{3}-\d{3})$/g
    var validacao_dia = /^\d{1,2}$/g
    var validacao_mes = /^\d{1,2}$/g
    var validacao_ano = /^\d{4}$/g
    var validacao_user = /^.+$/g
    var validacao_psw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/g


    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    if (currentTab == 0) {
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (!y[i].value.match(validacao_nome)) {
                // add an "invalid" class to the field:
                y[i].className += " invalid";
                // and set the current valid status to false
                valid = false;
            }
        }
    }
    if (currentTab == 1) {
        for (i = 0; i < y.length; i++) {
            if (i == 0) {
                if (!y[i].value.match(validacao_email)) {
                    y[i].className += " invalid";
                    valid = false;
                }
            } else if (i == 1) {
                if (!y[i].value.match(validacao_telemovel)) {
                    y[i].className += " invalid";
                    valid = false;
                }
            }
        }
    }
    if (currentTab == 2) {
        for (i = 0; i < y.length; i++) {
            if (i == 0) {
                var a = parseInt(y[i].value)
                if (!y[i].value.match(validacao_dia) || a < 1 || a > 31){
                    y[i].className += " invalid";
                    valid = false;
                }
            } else if (i == 1) {
                var b = parseInt(y[i].value)
                if (!y[i].value.match(validacao_mes) || b < 1 || b > 12){
                        y[i].className += " invalid";
                        valid = false;
                }
            } else if (i == 2) {
                var c = parseInt(y[i].value)
                if (!y[i].value.match(validacao_ano) || c < 1900 || c > 2020){
                        y[i].className += " invalid";
                        valid = false;
                }
            }
        }
    }
    if (currentTab == 3) {
        for (i = 0; i < y.length; i++) {
            if (i == 0) {
                if (!y[i].value.match(validacao_user) || registos.includes(y[i].value)) {
                    y[i].className += " invalid";
                    valid = false;
                }
            } else if (i == 1) {
                if (!y[i].value.match(validacao_psw)) {
                    y[i].className += " invalid";
                    valid = false;
                }
            }
        }
    }
    
    // for (i = 0; i < y.length; i++) {
    //     // If a field is empty...
    //     if (!y[i].value.match(validacao)) {
    //         // add an "invalid" class to the field:
    //         y[i].className += " invalid";
    //         // and set the current valid status to false
    //         valid = false;
    //     }
    // }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
    document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(myInput.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}