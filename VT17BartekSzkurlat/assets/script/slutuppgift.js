window.onload= function () {
    if(window.addEventListener) {
        var portions = document.getElementById('portions');
        portions.addEventListener('change', saveToLocalStorage, false);
        var stars = document.getElementsByClassName('star');
        for (var i = 0; i < stars.length; i++) {
            stars[i].addEventListener('mouseover', focusStar, false);
            stars[i].addEventListener('mouseout', unfocusStar, false);
        }
        toggleStarsClickable(false);
        ingredientsAmount();
        loadFromLocalStorage();
        checkRating();
    } else if (window.attachEvent){
        var portions = document.getElementById('portions');
        portions.addEventListener('change', saveToLocalStorage, false);
        var stars = document.getElementsByClassName('star');
        for (var i = 0; i < stars.length; i++) {
            stars[i].addEventListener('onmouseover', focusStar);
            stars[i].addEventListener('onmouseout', unfocusStar);
        }
        toggleStarsClickable(false);
        loadFromLocalStorage();
        checkRating();
    }

}

function ingredientsAmount() {
    var ingredients = [5, 1, 2, 3, 2, 2, 8, 1];
    for(var i = 0; i < ingredients.length; i++) {
        var ingredient_amount = ingredients[i] * calcIngredientsAmount();
        console.log("Ingredient amount: " + ingredient_amount);
        var amountTextNode = document.createTextNode(ingredient_amount + " ");
        var ingredientsList = document.getElementsByTagName("li");
        if(ingredientsList[i].childNodes.length > 1) {
            ingredientsList[i].removeChild(ingredientsList[i].firstChild);
        }
        ingredientsList[i].insertBefore(amountTextNode, ingredientsList[i].childNodes[0]);
    }
}

function calcIngredientsAmount() {
    // Get option index
    var portions = document.getElementById("portions");
    var option_value = portions.options[portions.selectedIndex].value;
    console.log("Portions index: " + option_value);
    console.log("Typeof index: " + typeof option_value);
    var amount = parseInt(option_value) / 4;
    return amount;
}

function toggleStarsClickable(loading) {

    if(loading == true) {
        console.log("Toggled stars clickable");
        if(window.addEventListener) {
            var stars = document.getElementsByClassName('star');
            for (var i = 0; i < stars.length; i++) {
                stars[i].removeEventListener('click', getStarIndex, false);
            }
        } else if (window.attachEvent) {
            var stars = document.getElementsByClassName('star');
            for (var i = 0; i < stars.length; i++) {
                stars[i].removeEventListener('click', getStarIndex, false);
            }
        }
    } else {
        console.log("Untoggled stars clickable");
        if(window.addEventListener) {
            var stars = document.getElementsByClassName('star');
            for (var i = 0; i < stars.length; i++) {
                stars[i].addEventListener('click', getStarIndex, false);
            }
        } else if (window.attachEvent) {
            var stars = document.getElementsByClassName('star');
            for (var i = 0; i < stars.length; i++) {
                stars[i].addEventListener('click', getStarIndex, false);
            }
        }
    }
}

function loading() {
    console.log("Loading..");
    toggleStarsClickable(true);
    // Remove voteStatus and ratingStatus (could be easier done with innerHTML = "")
    var myNode = document.getElementById("status");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    // Create and append img-element
    var loading = document.createElement('img');
    loading.src = "http://loadinggif.com/images/image-selection/3.gif";
    document.getElementById("status").appendChild(loading);

}
function voteRating(value){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            console.log(JSON.parse(this.responseText));
        }
    }
    xhttp.open("GET",
"https://edu.oscarb.se/sjk15/api/recipe/?api_key=1f028699f046951d&recipe=tortilladepatata&rating=" + value,true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("");
}

function checkRating(){
    // Load temp gif
    loading();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){;
            var obj = JSON.parse(this.responseText);
            // Remove fistChild in status-div which is the loading-image (could be easier done with innerHTML = "")
            var status = document.getElementById("status");
            status.removeChild(status.firstChild);
            // Create ratingtatus div and pass the rating from api
            var ratingStatus = document.createElement("div");
            ratingStatus.id = "ratingStatus";
            document.getElementById("status").appendChild(ratingStatus);
            document.getElementById("ratingStatus").innerText = "Betyg " + parseFloat(obj.rating.toFixed(2));
            // Toggle start to clickable
            toggleStarsClickable(false);
            // Create voteStatus div and pass the votes from api
            var voteStatus = document.createElement("div");
            voteStatus.id = "voteStatus";
            document.getElementById("status").appendChild(voteStatus);
            document.getElementById("voteStatus").innerText = "av " + obj.votes + " röster!";
        }
    }
    xhttp.open("GET",
        "https://edu.oscarb.se/sjk15/api/recipe/?api_key=1f028699f046951d&recipe=tortilladepatata",true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("");
}
globalStarStatus = false;

function starClicked(passedStatus) {
    console.log("Global star status (before): " + globalStarStatus);
    globalStarStatus = passedStatus;
    console.log("Global star status (after): " + globalStarStatus);
}

function toggleStarColor(star) {
    // Add color and make icon filled
    if(star.nodeType == 1) {
        console.log("Span node");
        if (star.style.color != "yellow") {
            star.style.color = "yellow";
            star.innerHTML = "&starf;";
        }
    }
}


function focusStar() {
    console.log("Star focus");
    var star = event.target;
    if(star.nodeType == 1) {
        console.log("Star element: " + star);
        star.style.fontSize = "3em";
    }
}

function unfocusStar() {
    console.log("Star focus");
    var star = event.target;
    if(star.nodeType == 1) {
        console.log("Star element: " + star);
        star.style.fontSize = "2em";
    }
}

function getStarIndex() {
    console.log("EXECUTING getStarIndex!");
    //Remove color off all stars
    var removeStar = document.getElementsByClassName("star");
    for(var i = 0; i < removeStar.length; i++) {
        if(removeStar[i].nodeType == 1) {
            console.log("Removing color of star");
            removeStar[i].style.color = "";
            removeStar[i].innerHTML = "&star;";
        }
    }
    var star = event.target;
    var i = 0;
    toggleStarColor(star);
    while ((star = star.nextSibling) != null) {
        if(star.nodeType == 1) {
            i++;
            console.log(star);
            toggleStarColor(star);
        }
    }
    // Toggle starClicked status to true
    starClicked(true);
    console.log("#i: " + parseInt(i + 1));
    console.log(typeof i);
    if(i + 1 == 1) {
         var star_string = "stjärna";
    } else {
        var star_string = "stjärnor";
    }
    document.getElementById("yourVote").innerText = "Du röstade " + parseInt(i+1) + " " + star_string;

    voteRating(i + 1);
    checkRating();
}

function loadFromLocalStorage() {
    // Load option index from local storage and set it
    if (localStorage.getItem("index") !== null) {
        console.log("Index is not null");
        var option_index = localStorage.getItem("index");
        console.log(option_index);
        document.getElementById("portions").selectedIndex = option_index;

        ingredientsAmount();
    }
}

function saveToLocalStorage() {
    // Get option index
    var portions = document.getElementById("portions");
    var option_index = portions.options[portions.selectedIndex].index;
    console.log("Portions index: " + option_index);

    // Set option index in local storage
    localStorage.setItem('index', option_index);
    var ls_retrievedObj = localStorage.getItem('index');
    console.log("Retrieved obj: " + ls_retrievedObj);

    ingredientsAmount();
}
