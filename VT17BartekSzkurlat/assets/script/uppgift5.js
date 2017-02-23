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
var validatePersonalNumber = function(input) {
    var input = document.getElementById('personnummer').value;

    // Check valid length & form
    if (!input) return false;

    if (input.indexOf('-') == -1) {
        if (input.length === 10) {
            input = input.slice(0, 6) + "-" + input.slice(6);
        } else {
            input = input.slice(0, 8) + "-" + input.slice(8);
        }
    }
    if (!input.match(/^(\d{2})(\d{2})(\d{2})\-(\d{4})|(\d{4})(\d{2})(\d{2})\-(\d{4})$/)) return false;

    // Clean input
    input = input.replace('-', '');
    if (input.length == 12) {
        input = input.substring(2);
    }

    // Declare variables
    var d = new Date(((!!RegExp.$1) ? RegExp.$1 : RegExp.$5), (((!!RegExp.$2) ? RegExp.$2 : RegExp.$6)-1), ((!!RegExp.$3) ? RegExp.$3 : RegExp.$7)),
        sum = 0,
        numdigits = input.length,
        parity = numdigits % 2,
        i,
        digit;

    // Check valid date
    if (Object.prototype.toString.call(d) !== "[object Date]" || isNaN(d.getTime())) return false;

    // Check luhn algorithm
    for (i = 0; i < numdigits; i = i + 1) {
        digit = parseInt(input.charAt(i))
        if (i % 2 == parity) digit *= 2;
        if (digit > 9) digit -= 9;
        sum += digit;
    }
    alert((sum % 10) == 0);
    return (sum % 10) == 0;

}

var valideraSkottar = function(input) {
    var input = document.getElementById('skottar').value;
    if (!input) {
        alert(false);
    }
    if (input % 400 == 0) {
        alert(true);
    }
    else if( input % 100 == 0) {
        alert(false);
    }
    else if (input % 4 == 0) {
        alert(true);
    }
    else {
        alert(false);
    }
}

var valideraSiffersumma = function(input) {
    var input = document.getElementById('siffersumma').value;
    var sum = 0;

    for(i = 0; i < input.length; i++) {
        sum += parseInt(input[i]);
    }

    alert(sum);

}