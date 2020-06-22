//Initializing Global Variables:

/** set a variable to pick directly from a fruit. */
var fruitSelection = ["APPLE", "ORANGE", "BANANA", "PEAR", "WATERMELON", "KIWI", "LEMON", "PINEAPPLE", "STRAWBERRY", "POMEGRANATE", "GRAPEFRUIT", "BLUEBERRY", "COCONUT", "CHERRY", "PEACH", "BLACKBERRY", "MANGO", "CRANBERRY", "PLUMS", "SUGARCANE"];
var mammalSelection = ["CAT", "DOG", "ELEPHANT", "BEAR", "LION", "TIGER", "LIGER", "MONKEY", "APE", "GORILLA", "SNAKE", "MONGOOSE", "DEER", "RHINOCERAS", "ARMADILLO", "HYENA", "HORSE", "KANGAROO", "GIRAFFE", "SKUNK", "PIG", "GOAT", "LAMB", "COW", "WARTHOG", "MOOSE", "BULL"];
var countries = ["PAKISTAN", "BANGLADESH", "CANADA", "AUSTRALIA", "SINGAPORE", "JAPAN", "GERMANY", "CHINA", "TURKEY", "SWEDEN", "NEWZEALAND", "CUBA", "BRAZIL", "MEXICO", "FRANCE", "INDIA", "SPAIN", "COLOMBIA", "COSTARICA", "BEHRAIN", "ARGENTINA", "AFGHANISTAN", "UAE", "AZERBAIJAN", "ECUADOR", "ALGERIA", "BURMA", "EGYPT", "LIBYA", "LEBANON", "SAUDIARABIA", "IRELAND", "IRAQ", "IRAN", "ITALY", "INDONESIA", "YEMEN", "SRILANKA", "PERU", "CHILE", "KUWAIT", "MOROCCO", "ROMANIA", "MALDIVESISLANDS", "PANAMA", "KENYA", "CZECHIA", "JORDAN"];
var countryCapitals = ["PARIS", "BERLIN", "BRUSSELS", "CAIRO", "AMMAN", "JERUSALEM", "BEIRUT", "TOKYO", "ISLAMABAD", "LONDON", "ROME", "OTTAWA", "WASHINGTON","MOSCOW", "KABUL", "ALGIERS", "VIENNA", "NASSAU", "DAHAKA", "SANTIAGO", "BEIJING", "SAN JOSE", "ATHENS"];
var vegetables = ["CELERY", "CABBAGE", "GARDENASPARAGUS", "CURLYKALE", "CARROT", "LETTUCE", "GARLIC", "JICAMA", "CUCUMBER", "PARSNIP", "OKRA", "CHIVES", "KOHLRABI", "CAULIFLOWER", "BEETROOT", "GINGER", "YAM", "POTATO", "WATERCRESS", "BRUSSELSSPROUT", "ONION", "EGGPLANT", "ENDIVE", "RADISH", "MUSHROOM", "TURNIP", "DILL", "PIGWEED", "ARTICHOKE", "PEA", "KIDNEYBEAN", "LEEK", "SHALLOT", "PARSLEY", "SWEETPOTATO", "SORREL", "YARROW"];
var movies = ["INCEPTION", "TITANIC", "TENET", "AVATAR", "THEPRESTIGE","JUMANJI","BLACKWIDOW","JOKER", "DEADPOOL", "KNIVESOUT", "THEINVISIBLEMAN", "HOMEALONE", "JOHNWICK", "EXTRACTION","CHILDSPLAY", "BABYSDAYOUT", "EXMACHINA", "BATMANBEGINS", "THEDARKKNIGHT", "DUNKIRK", "STARWARS", "PULPFICTION", "TERMINATOR", "MISSIONIMPOSSIBLE", "LORDOFTHERINGS","THEHOBBIT", "ET", "JAWS", "GOODFELLAS", "THEGODFATHER", "LAWRENCEOFARABIA", "SAVINGPRIVATERYAN", "RAGINGBULL", "TOYSTORY", "FINDINGNEMO","ABUGSLIFE", "UP", "MONSTERSINC", "LADYANDTHETRAMP", "OLIVERANDTHECOMPANY", "THEINCREDIBLES", "WALLE", "ONWARD", "THEFASTANDTHEFURIOUS", "JURASSICPARK", "THESHINING", "FORRESTGUMP", "THEAVENGERS", "THELIONKING", "GONEWITHTHEWIND", "CAPTAINAMERICACIVILWAR", "BLACKPANTHER", "KINGKONG", "JURASSICWORLD", "CASTAWAY", "BACKTOTHEFUTURE", "IROBOT", "IAMLEGEND", "STARTREK", "MADMAXFURYROAD", "IRONMAN", "CASONOROYALE", "NOTIMETODIE", "GOLDENEYE", "JASONBOURNE", "SUICIDESQUAD", "FOCUS", "THEPURSUITOFHAPPYNESS", "MENINBLACK", "ALI","COMINGTOAMERICA", "MINORITYREPORT", "EDGEOFTOMORROW"];
var categorySelection = ["Fruits", "Mammals", "Countries", "CountryCapitals", "Vegetables", "Movies"];

var selectRandomCategory = categorySelection[Math.floor(Math.random() * categorySelection.length)];
var categoryLength;
//Counter variable used to get the counter each time the addFields Function is called.
var addFieldCounter = 0;
//variable for the 'Input Field' Object:
var inputField = [];
//Variable to hold the current letter
var letter;
var selectedLetters = [];
//Variable to get the number of tries
var numOfTries;
//variable to count each time the user corrects properly
var correctGuessCounter = 0;

var tempNum = localStorage.getItem("totalPoints");
let totalPoints;

isLost = false;
//Points Variables: 
if (Number.isNaN(tempNum) || isNaN(tempNum) || tempNum === null) {
	totalPoints = 0;
	highScore = 0;
} else {
	totalPoints = parseFloat(localStorage.getItem("totalPoints"));
}

var highScore;
var temHighScore = parseInt(localStorage.getItem("highScore"));
if (Number.isNaN(temHighScore) || isNaN(temHighScore) || temHighScore === null) {
	highScore = parseInt(0);
} else {
	highScore = parseInt(localStorage.getItem("highScore"));
	if(totalPoints >= highScore){
		highScore = parseInt(totalPoints);
	}
}


var hints;
var tempHints = parseInt(localStorage.getItem("hints"));
if (Number.isNaN(tempHints) || isNaN(tempHints) || tempHints === null) {
	hints = 5;
}else if(tempHints===0 && isLost){
    hints =5;
} 
else {
	hints = parseFloat(localStorage.getItem("hints"));
}

var pointsEarned = 5;
var finalTotalPoints;

var actualSelectionArray = [];
var selectedRandomElement;

//Function that selects an element from the randomly selected category.
function selectCategory() {
    //Copy elements from one array to another:
	if (selectRandomCategory === "Fruits"){
		actualSelectionArray = fruitSelection.slice();
		document.getElementById("imageId").src = "Images/fruits.jpg";
	}
	if (selectRandomCategory === "Mammals"){
		actualSelectionArray = mammalSelection.slice();
		document.getElementById("imageId").src = "Images/animals.jpg";
	} 
	if (selectRandomCategory === "Countries") {
		actualSelectionArray = countries.slice();
		document.getElementById("imageId").src = "Images/countries.jpg";
	}
	if(selectRandomCategory === "Vegetables"){
		actualSelectionArray = vegetables.slice();
		document.getElementById("imageId").src = "Images/vegetables.jpg";
	} 
	if (selectRandomCategory === "CountryCapitals") {
		actualSelectionArray = countryCapitals.slice();
		document.getElementById("imageId").src = "Images/capitalCities.jpg";
		selectRandomCategory = "Country Capitals";
	}if(selectRandomCategory === "Movies"){
		actualSelectionArray = movies.slice();
		document.getElementById("imageId").src = "Images/Movies.png";
	} 
	
	//Pick an element randomly from the selected array
	selectedRandomElement = actualSelectionArray[Math.floor(Math.random() * actualSelectionArray.length)];
	//Get the length of that chosen Element .
	categoryLength = selectedRandomElement.length;
	numOfTries = parseInt(5);
	return selectedRandomElement;
}

//----------------------------------------------
/**
 * It runs on the "load" of this page.
 * This function below creates the keyboard layout and displays it.
 * It also initializes the "letter variable".
 */
var onLoadFuction = window.addEventListener("load", function (windowLoadE) {
	selectCategory();
	document.getElementById("numOfTries").innerHTML = numOfTries;
	document.getElementById("pointsValue").innerHTML = Math.round(totalPoints);	
	document.getElementById("HintsValue").innerHTML = Math.round(hints);
	document.getElementById("ScoreValue").innerHTML = Math.round(highScore);
	
	addFields();
	setInterval(makeAlert, 500);
});

/**
This function checks if the counter for a field thats clicked is more than once, and if so if wont call the addField Method. 
(Basically prevents the user from multiple button clicks and prevents the added letter fields on top of each other)
**/
function onClickOnlyOnce() {
	if (addFieldCounter < 1) {
		//document.getElementById("pointsValue").innerHTML = totalPoints;
		document.getElementById("pointsValue").innerHTML = Math.round(totalPoints);
		document.getElementById("HintsValue").innerHTML = Math.round(hints);
		addFields();
	} else {
		//var addFieldsFunc = new addFields();		
		location.reload();
	}
}

/**
This function is called as a closure inside the onClickMore
It creates the input fields in the webpage depending on the length of the fruit:
*/
function addFields() {
	addFieldCounter++;

	//make the dashes the same number of the chosen fruit:
	var fruitLengthSentence = document.getElementById("output");
	document.getElementById("categoryTitle").innerHTML = "The Category is: " + selectRandomCategory;
	document.getElementById("categoryTitle").style.fontSize = "large";

	document.getElementById("output").innerHTML = "The Length of the category is: " + categoryLength;
	document.getElementById("output").style.fontSize = "large";

	displayFields();
	var str = [];
	var x;
	for (var i = 0; i < categoryLength; i++) {
		inputField[i] = document.createElement("INPUT");
		var x = document.getElementById("textBox").appendChild(inputField[i]).size = "5"; //set the physical size of each field
		document.getElementById("textBox").appendChild(inputField[i]).readOnly = true; // make the field boxes read-only
	}
}

/**
 * API Function to Physically Display the Letter Keyboard on the Screen:
 */
function displayFields() {
	var p, button, holder;
	holder = document.getElementById("buttonsHolder");
	for (var i = 65; i <= 90; i++) {
		if (i == 65 || i == 75 || i == 84) {
			p = document.createElement("p");
		}
		letter = String.fromCharCode(i);
		button = document.createElement("button");
		button.style.width = '40px'; // setting the width to 200px
		button.style.height = '40px'; // setting the height to 200px
		button.style.background = 'teal'; // setting the background color to teal
		button.style.color = 'white'; // setting the color to white
		button.style.fontSize = '20px';
		button.innerHTML = letter;
		button.setAttribute("data-letter", letter);
		button.onclick = function (e) { setLetter(this.getAttribute("data-letter")); };
		p.appendChild(button);
		if (i == 74 || i == 83 || i == 90) {
			holder.appendChild(p);
		}
	}
}

/**
 * @param {*} letter 
 * This function adds all the used letters to the bottom of the keyboard. Its called eventListener function above.
 * It runs each time a letter is clicked on in the keyboard
 * If the num of wrong tries is greater than 0, it will show an alert.
 */
var chosenLetterFromKeys = [];
function setLetter(letter) {
	var div = document.getElementById("name");
	div.innerHTML = div.innerHTML + letter;
	//chosenLetterFromKeys.push(letter);
	if (isWordFound) {
		onClickOnlyOnce();
	}
	else if (isTimeOut) {
		updateHighScore();
		updateTotalPoints();
		updateHints();
		isLost = true;
		swal("Sorry, you are out of Time. The correct word was: " + selectedRandomElement + "\n  \n \Click 'New Game' to continue");
	}
	else if (chosenLetterFromKeys.includes(letter)) {
		swal("You already selected that letter. Please select another letter.");
	}
	else if (numOfTries > -1) {
		chosenLetterFromKeys.push(letter);
		findIndex(letter, selectedRandomElement);
	}
	else {
		updateHighScore();
		updateTotalPoints();
		updateHints();
		isLost = true;
		swal("Sorry, you are out of tries. The correct word was: " + selectedRandomElement + "\n  \n \Click 'New Game' to continue");
	}
}

/**
Function that compares the current letter with the fruit variable. If the Fruit String contains that letter,
it gets its index and inserts that letter into that field index.
**/
var index = [];
var isWordFound = false;
function findIndex(letter, selectedRandomWord) {

	var isLetterFound = false;
	for (var i = 0; i < categoryLength; i++) {
		if (selectedRandomWord.charAt(i) == letter) {
			correctGuessCounter++;
			index[i] = i;
			isLetterFound = true;
			inputField[i].value = letter; //this is initializing the inputField Object to its proper value at the proper index.	
		}
	}
	if (!isLetterFound) {
		document.getElementById("numOfTries").innerHTML = numOfTries;
		numOfTries--;
		selectedLetters.push(letter);

	} else if (correctGuessCounter >= categoryLength) {
		totalPoints += pointsEarned;
		localStorage.setItem("totalPoints", totalPoints);

		//alert(JSON.parse( localStorage.getItem("totalPoints")));
		document.getElementById("pointsValue").innerHTML = JSON.parse(localStorage.getItem("totalPoints"));
		isWordFound = true;
		updateHighScore();
		swal("CONGRATS!", ", You got the right word!", "success");
	}
	return index;
}

//How-To Button Feature:
function clickHowTo() {
	swal("RULES: \n \n Enter the letters from the displayed keyboard on screen. \n \nTo win, guess the proper letters before running out of tries");
}

var hintsIndex = [];
function checkHint() {
	//Loop through the selected Word.
	//Any letter that is not previously selected, give a letter hint to the user.
	if (hints > 0) {
		for (var i = 0; i < categoryLength; i++) {
			if (!chosenLetterFromKeys.includes(selectedRandomElement.charAt(i)) && (!hintsIndex.includes(i))) {
				selectedLetters.push(selectedRandomElement.charAt(i));
				hintsIndex.push(i);
				inputField[i].value = selectedRandomElement.charAt(i);
				correctGuessCounter++;
				hints--;
				localStorage.setItem("hints", hints);
				document.getElementById("HintsValue").innerHTML = Math.round(hints);
				break;
			}
		}
	}
	if (correctGuessCounter >= categoryLength) {
		totalPoints += pointsEarned;
		document.getElementById("HintsValue").innerHTML = hints;
		isWordFound = true;
		localStorage.setItem("totalPoints", totalPoints);
		document.getElementById("pointsValue").innerHTML = JSON.parse(localStorage.getItem("totalPoints"));
		updateHighScore();
		swal("CONGRATS!", ", You got the right word!", "success");
	}
}

/**
 * Below are the 2 functions to check the timer and whether the user is allowed to try again: 
 */
var isTimeOut = false;
var timeleft = 60;
var downloadTimer = setInterval(function () {
	if (timeleft < 0) {
		clearInterval(downloadTimer);
		document.getElementById("countdown").innerHTML = "Time Finished.";
		isTimeOut = true;
		updateHints();
		updateTotalPoints();
	} else if (isWordFound) {
		document.getElementById("countdown").innerHTML = "Good Job!";
	}
	else {
		document.getElementById("countdown").innerHTML = timeleft + " SECONDS REMAINING";
	}
	timeleft -= 1;
}, 1000);

//This function is used to delay the time before next line execution. EX: wait(5000) means 5 seconds
function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
}

function updateHighScore(){
	if(totalPoints > highScore){
		highScore = totalPoints;
		localStorage.setItem("highScore", highScore);
		swal("Congrats! You have a new high score!");
		document.getElementById("ScoreValue").innerHTML = Math.round(highScore);
	}
}

function updateTotalPoints(){
	totalPoints = 0;
	localStorage.setItem("totalPoints", totalPoints);
	document.getElementById("pointsValue").innerHTML = Math.round(totalPoints);	
}

function updateHints(){
	hints = 5;
	localStorage.setItem("hints", hints);
	document.getElementById("HintsValue").innerHTML = Math.round(hints);
}


/**
Function to allow the user to guess the entire word. If they can guess it, they get points:
*/

/**
Features:
-Add a "Slang Words" category
-New categories: Slang words, Vegetables, Movies, Shows, Phrases, Pioneers, Animal, Places.
-Give the users some hints when they ask. Allow for little amounts of hints points to use.
-Create a Timed Game session where the user has to complete as many hangman slots in a timed setting.
-Create points for the users
**/







