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
var final_digits = [];

var displayDigits = function() {
    var output_digits = "";
    for(i = 0; i < digits.length; i++) {
        output_digits += digits[i];
    }
    document.getElementById('result').innerText = output_digits;
    return output_digits;
}

var displayResult = function(sum) {
    var li = document.createElement('li');
    li.innerText = sum;
    var result = document.getElementById('results');
    result.insertBefore(li, result.firstChild);
}

var clearDigits = function() {
    digits.length = 0;
    final_digits.length = 0;
    document.getElementById('result').innerText = "0";
}


var doConcat = function() {
    var i = "";
    if(digits.length % 2 != 0) {
        final_digits.push(digits[0]);
        i = 1;
        while (i < digits.length) {
            var concat_digits = digits[i].concat(digits[i + 1]);
            final_digits.push(concat_digits);
            i += 2;
        }
    }
    if(digits.length % 2 == 0) {
        i = 0;
        while (i < digits.length) {
            var concat_digits = digits[i].concat(digits[i + 1]);
            final_digits.push(concat_digits);
            i += 2;
        }
    }
    console.log("Final digits: " + final_digits);
}

var getNumber = function() {
    var x = event.target.innerText;
    if (digits.length == 0 || digits[digits.length-1] == "+" || digits[digits.length - 1] == "-") {
        digits.push(x);
    } else {
        var temp_digits = digits[digits.length-1].concat(x);
        digits.pop();
        digits.push(temp_digits);
    }

    console.log(digits);
    console.log("Length: " + digits.length);
    displayDigits();

}

var getSign = function() {

    var x = event.target.innerText;

    if (x != "=") {
        if (digits[digits.length - 1] == "+" || digits[digits.length - 1] == "-") {
            alert("Invalid operation, " + x + ". Add a digit.");
        } else {
            digits.push(x);
            console.log(digits);
            displayDigits()
        }
    } else if (digits[digits.length - 1] != "-" && digits[digits.length - 1] != "+") {
        doConcat();
        var sum = 0;
        for (i = 0; i < final_digits.length; i++) {
            sum += parseInt(final_digits[i]);
            console.log("Sum: " + sum);
            console.log("i: " + i);
        }
        console.log(sum);
        displayResult(displayDigits() + "=" + sum);
        clearDigits();
    } else {
        alert("Invalid operation, " + x + ". Add a digit.");
    }

}