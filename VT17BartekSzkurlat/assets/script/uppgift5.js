window.onload= function () {
    if(window.addEventListener) {
        document.getElementById('personnummer').addEventListener('change', validatePersonalNumber, false);
        document.getElementById('skottar').addEventListener('change', valideraSkottar, false);
        document.getElementById('siffersumma').addEventListener('change', valideraSiffersumma, false);
    } else if (window.attachEvent){
        document.getElementById('personnummer').attachEvent("onchange", validatePersonalNumber);
        document.getElementById('skottar').attachEvent("onchange", valideraSkottar);
        document.getElementById('siffersumma').attachEvent("onchange", valideraSiffersumma);
    }

}
function showInfo(info, elementNr, color) {

    if(color == "green") {
        document.getElementsByClassName("show_info")[elementNr].style.color = "green";
    }
    else {
        document.getElementsByClassName("show_info")[elementNr].style.color = "red";
    }
    var node = document.createTextNode(info);
    var div = document.createElement('div');
    div.appendChild(node);
    document.getElementsByClassName("show_info")[elementNr].appendChild(div);
}

function removeInfoChildren(elementNr) {
    // Remove any child nodes (in first show_info div)
    var show_info = document.getElementsByClassName("show_info")[elementNr];
    while (show_info.firstChild) {
        show_info.removeChild(show_info.firstChild);
    }
}

var validatePersonalNumber = function() {

    //Remove ShowInfo-childs
    removeInfoChildren(0);

    //Get input
    var input = document.getElementById('personnummer').value;

    if (!input) {
        alert("Skriv personnummer");
    }

    if (input.length == 10) {
        var myRegex = /^(\d{2})(\d{2})(\d{2})(\d{4})$/;
        var match = input.match(myRegex);
    }
    if (input.length == 12) {
        var myRegex = /^(\d{4})(\d{2})(\d{2})(\d{4})$/;
        var match = input.match(myRegex);
    }
    // Check if input is valid (10 or 12 digits)
    if (!match) {
        showInfo("Felaktigt format", 0);
        return false;
    }
    else {

        var validDate = true;

        var year = parseInt(match[1]);
        var month = parseInt(match[2]);
        var day = parseInt(match[3]);
        var last4 = match[4];

        console.log("Year: " + year);
        console.log("Month: " + month);
        console.log("Day: " + day);
        console.log("Last4: " + last4);

        // Check if date is valid
        if(day > 31 || day < 1) {
            showInfo("Felaktig dag", 0);
            console.log("Felaktig dag");
            validDate = false;
        }
        if(month > 12 || month < 1) {
            showInfo("Felaktig månad", 0);
            console.log("Felaktig månad");
            validDate = false;
        }
        if (input.length == 12 && year > 2017) {
            showInfo("Felaktigt årtal", 0);
            console.log("Felaktig årtal");
            validDate = false;
        }
        else if(validDate) {
            // Luhn algoritm
            if(input.length === 12) {
                input = input.substring(2);
            }
            var sum = 0;
            var numdigits = input.length;
            var parity = numdigits % 2;
            var i;
            var digit;

            for (i = 0; i < numdigits; i = i + 1) {
                digit = parseInt(input.charAt(i))
                if (i % 2 == parity) digit *= 2;
                if (digit > 9) digit -= 9;
                sum += digit;
            }
            if ((sum % 10) == 0) {
                showInfo("Korrekt personnummer", 0, "green");
            }
            else {
                showInfo("Felaktigt personummer", 0);
            }
        }
    }
}



var valideraSkottar = function() {

    //Remove showInfo-children
    removeInfoChildren(1);

    //Get input
    var input = document.getElementById('skottar').value;
    if (!input) {
        alert("Skriv in år");
    }
    if (input % 400 == 0) {
        showInfo("År " + input + " ÄR ett skottår", 1, "green");
    }
    else if( input % 100 == 0) {
        showInfo("År " + input + " ÄR INTE ett skottår", 1, "red");
    }
    else if (input % 4 == 0) {
        showInfo("År " + input + " ÄR ett skottår", 1, "green");
    }
    else {
        showInfo("År " + input + " ÄR INTE ett skottår", 1, "red");
    }
}

var valideraSiffersumma = function() {

    // Remove showInfo-children
    removeInfoChildren(2);

    //Get input
    var input = document.getElementById('siffersumma').value;
    var sum = 0;

    for(i = 0; i < input.length; i++) {
        sum += parseInt(input[i]);
    }

    showInfo("Siffersumma är " + sum, 2, "green");

}