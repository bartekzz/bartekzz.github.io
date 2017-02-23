window.onload= function () {
    if(window.addEventListener) {
        var number = document.getElementsByClassName('calc__number');
        for (var i = 0; i < number.length; i++) {
            number[i].addEventListener('click', getNumber, false);
        }
        var sign = document.getElementsByClassName('calc__sign');
        for (var i = 0; i < sign.length; i++) {
            sign[i].addEventListener('click', getSign, false);
        }
    } else if (window.attachEvent){
        var number = document.getElementsByClassName('calc__number');
        for (var i = 0; i < number.length; i++) {
            number[i].attachEvent('onclick', getNumber);
        }
        var sign = document.getElementsByClassName('calc__sign');
        for (var i = 0; i < sign.length; i++) {
            sign[i].attachEvent('onclick', getSign);
        }
    }

}
var digits = [];

var displayDigits = function() {
    var output_digits = "";
    for(i = 0; i < digits.length; i++) {
        output_digits += digits[i];
    }
    document.getElementById('result').innerText = output_digits;
}

var displayResult = function(sum) {
    var li = document.createElement('li');
    li.innerText = sum;
    document.getElementById('results').appendChild(li);
}

var clearDigits = function() {
    digits.length = 0;
    document.getElementById('result').innerText = "0";
}

var getNumber = function() {
    var x = event.target.innerText;
    digits.push(x);
    console.log(digits);
    console.log("Length: " + digits.length);
    displayDigits();

}

var getSign = function() {

    var x = event.target.innerText;

    if (x != "=" && digits[digits.length-1] != "-" && digits[digits.length-1] != "+") {
        digits.push(x);
        console.log(digits);
        displayDigits()
    }

    else if (digits[digits.length-1] != "-" && digits[digits.length-1] != "+") {
        var sum = 0;
        for (i = 0; i < digits.length; i++) {
            console.log("Initial i: " + i);
            if (i == 0) {
                sum = parseInt(digits[i]);
                console.log("Sum: " + sum);
                console.log("i: " + i);
            }
            if (digits[i] == "+") {
                sum += parseInt(digits[i + 1]);
                console.log("Sum +: " + sum);
                console.log("i: " + i);
                i++;
            }
            if (digits[i] == "-") {
                sum -= parseInt(digits[i + 1]);
                console.log("Sum -: " + sum);
                console.log("i: " + i);
                i++;
            }
        }
        console.log(sum);
        clearDigits();
        displayResult(sum);
    }

    else {
        console.log("Invalid operation, cannot press " + x);
    }
}