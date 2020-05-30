//Initializing Global Variables:

/** set a variable to pick directly from a fruit. */
var fruitSelection = ["APPLE","ORANGE", "BANANA", "PEAR", "WATERMELON", "KIWI", "LEMON", "PINEAPPLE", "STRAWBERRY", "POMEGRANATE", "GRAPEFRUIT", "BLUEBERRY", "COCONUT", "CHERRY", "PEACH", "BLACKBERRY", "MANGO", "CRANBERRY", "PLUMS", "SUGARCANE"];
var mammalSelection = ["CAT", "DOG", "ELEPHANT", "BEAR", "LION", "TIGER", "LIGER", "MONKEY", "APE", "GORILLA", "SNAKE", "MONGOOSE", "DEER", "RHINOCERAS", "ARMADILLO", "HYENA", "HORSE", "KANGAROO", "GIRAFFE", "SKUNK","PIG", "GOAT", "LAMB", "COW", "WARTHOG", "MOOSE", "BULL"];
var countries = ["PAKISTAN", "BANGLADESH", "CANADA", "AUSTRALIA", "SINGAPORE", "JAPAN", "GERMANY", "CHINA", "TURKEY", "SWEDEN", "NEW ZEALAND", "CUBA", "BRAZIL", "MEXICO", "FRANCE", "INDIA", "SPAIN", "COLOMBIA", "COSTA RICA", "BEHRAIN", "ARGENTINA", "AFGHANISTAN", "UAE", "AZERBAIJAN", "ECUADOR", "ALGERIA", "BURMA", "EGYPT", "LIBYA", "LEBANON", "SAUDIARABIA", "IRELAND", "IRAQ", "IRAN", "ITALY", "INDONESIA", "YEMEN", "SRILANKA", "PERU", "CHILE", "KUWAIT", "MOROCCO", "ROMANIA", "MALDIVES ISLANDS", "PANAMA", "KENYA", "CZECHIA", "JORDAN"];
var countryCapitals = ["PARIS", "BERLIN", "BRUSSELS", "CAIRO", "AMMAN", "LEBANON", "JERUSALEM", "BEIRUT"];

var categorySelection = ["Fruits", "Mammals", "Countries", "CountryCapitals"];

var selectRandomCategory = categorySelection[Math.floor(Math.random()*categorySelection.length)];
var categoryLength;
//Counter variable used to get the counter each time the addFields Function is called.
var addFieldCounter =0; 
//variable for the 'Input Field' Object:
var inputField = [];
//Variable to hold the current letter
var letter;
var selectedLetters = [];
//Variable to get the number of tries
var numOfTries = 6;
//variable to count each time the user corrects properly
var correctGuessCounter = 0;

var numOfHints = 2;
var tempNum = localStorage.getItem("totalPoints");
let totalPoints;
//Points Variables: 
if(Number.isNaN(tempNum) || isNaN(tempNum) || tempNum === null){
	totalPoints = 0;
}else{
	totalPoints = parseFloat(localStorage.getItem("totalPoints"));
}


var pointsEarned = 5;
var finalTotalPoints;

var actualSelectionArray= [];
var selectedRandomElement;

function selectCategory(){
	
	if(selectRandomCategory === "Fruits")actualSelectionArray =  fruitSelection.slice();
	if(selectRandomCategory === "Mammals") actualSelectionArray =  mammalSelection.slice();
	if(selectRandomCategory === "Countries") actualSelectionArray =  countries.slice();
	if(selectRandomCategory === "CountryCapitals") actualSelectionArray =  countryCapitals.slice();

	//Pick a element randomly from the selected array
	selectedRandomElement = actualSelectionArray[Math.floor(Math.random()*actualSelectionArray.length)];
	//Get the length of that chosen Element .
	categoryLength = selectedRandomElement.length;
	return  selectedRandomElement;
}

//----------------------------------------------
/**
 * It runs on the "load" of this page.
 * This function below creates the keyboard layout and displays it.
 * It also initializes the "letter variable".
 */
var onLoadFuction= window.addEventListener( "load", function( windowLoadE ) {
	selectCategory();
	document.getElementById("numOfTries").innerHTML = numOfTries;
	document.getElementById("pointsValue").innerHTML = Math.round(totalPoints);
	if(categoryLength >5){
		numOfHints = Math.abs(categoryLength / 2 -2);
		document.getElementById("HintsValue").innerHTML = Math.round(numOfHints);
	}else{
		document.getElementById("HintsValue").innerHTML = Math.round(numOfHints);
	}	
	addFields();
	setInterval(makeAlert, 500);
});



/**
This function checks if the counter for a field thats clicked is more than once, and if so if wont call the addField Method. 
(Basically prevents the user from multiple button clicks and prevents the added letter fields on top of each other)
**/	
function onClickOnlyOnce(){
	if (addFieldCounter < 1){
		//document.getElementById("pointsValue").innerHTML = totalPoints;
		document.getElementById("pointsValue").innerHTML =Math.round(numOfHints);
		addFields();
	}else{
		//var addFieldsFunc = new addFields();		
		location.reload();
	}
}

/**
This function is called as a closure inside the onClickMore
It creates the input fields in the webpage depending on the length of the fruit:
*/			
function addFields(){
	addFieldCounter++;
	
		//make the dashes the same number of the chosen fruit:
		var fruitLengthSentence = document.getElementById("output");
		//var text = document.createTextNode(fruitLength); //calls the value of Fruit Length:
		
		//fruitLengthSentence.appendChild(text);

		document.getElementById("categoryTitle").innerHTML = "The Category is: " + selectRandomCategory;
		document.getElementById("categoryTitle").style.fontSize = "large";

		document.getElementById("output").innerHTML = "The Length of the category is: " + categoryLength;
		document.getElementById("output").style.fontSize = "large";

		//document.getElementById("enterText").innerHTML = "Please select letters from the keys below:";
		//document.getElementById("enterText").style.fontSize = "large";

		displayFields();
		var str = [];
		var x;
		for(var i = 0; i<categoryLength; i++){
			//str.push(dash);
			//str.push(document.createElement("INPUT"));
			inputField[i] = document.createElement("INPUT");
			var x = document.getElementById("textBox").appendChild(inputField[i]).size = "5"; //set the physical size of each field
			document.getElementById("textBox").appendChild(inputField[i]).readOnly= true; // make the field boxes read-only
		}	
}

/**
 * API Function to Physically Display the Letter Keyboard on the Screen:
 */
function displayFields(){
	var p, button, holder;
    holder = document.getElementById( "buttonsHolder" );
    for ( var i = 65; i <= 90; i++ ) {
        if ( i == 65 || i == 75 || i == 84 ) {
            p = document.createElement( "p" );
        }
        letter = String.fromCharCode( i );
        button = document.createElement("button");
        button.innerHTML = letter;
        button.setAttribute( "data-letter", letter );
        button.onclick = function( e ) { setLetter( this.getAttribute( "data-letter" ) ); };
        p.appendChild( button );
        if ( i == 74 || i == 83 || i == 90 ) {
            holder.appendChild( p );
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
function setLetter( letter ) {
    var div = document.getElementById( "name" );
	div.innerHTML = div.innerHTML + letter;
	//chosenLetterFromKeys.push(letter);
	if(isWordFound){
		onClickOnlyOnce();
	}
	else if(isTimeOut){
		swal("Sorry, you are out of Time. The correct word was: " + selectedRandomElement + "\n  \n \Click 'New Game' to continue");	
	}
	else if(chosenLetterFromKeys.includes(letter)){
		swal("You already selected that letter. Please select another letter.");
	}
	else if(numOfTries > -1){
		chosenLetterFromKeys.push(letter);
		findIndex(letter, selectedRandomElement);
	} 
	else{
		swal("Sorry, you are out of tries. The correct word was: " + selectedRandomElement + "\n  \n \Click 'New Game' to continue");		
	}	
}

/**-----------------------------------------------------------------------
function enterIntoField(inputField, letter){
	//var letterIndex = findIndex(letter, selectedRandomWord);
	
	if(indexCounter != 0){
		//document.forms[0].elements[0].innerHTML = letter;
		//var s = $('#textBox').val();
		inputField[letterIndex].value = letter;
	}
}
**/

/**
Function that compares the current letter with the fruit variable. If the Fruit String contains that letter,
it gets its index and inserts that letter into that field index.
**/
var index = [];
var isWordFound = false;
function findIndex(letter, selectedRandomWord){
	
	var isLetterFound = false;
	for (var i =0; i < categoryLength; i++){
		if (selectedRandomWord.charAt(i) == letter){
			correctGuessCounter++;
			index[i] = i;
			isLetterFound = true;
			inputField[i].value = letter; //this is initializing the inputField Object to its proper value at the proper index.	
		}
	}
	if(!isLetterFound){
		document.getElementById("numOfTries").innerHTML = numOfTries;
		numOfTries--;
		selectedLetters.push(letter);

	}else if(correctGuessCounter >= categoryLength){
		totalPoints += pointsEarned;
		localStorage.setItem("totalPoints",totalPoints);
		
		//alert(JSON.parse( localStorage.getItem("totalPoints")));
		document.getElementById("pointsValue").innerHTML = JSON.parse( localStorage.getItem("totalPoints"));
		//sessionStorage.setItem("totalPoints", totalPoints);
		//finalTotalPoints = sessionStorage.getItem("totalPoints");
		//document.getElementById("pointsValue").innerHTML = numOfHints;
		isWordFound = true;
		swal("CONGRATS!", ", You got the right word!", "success");
	}
	return index;
}

//How-To Button Feature:
function clickHowTo(){
	swal("RULES: \n \n Enter the letters from the displayed keyboard on screen. \n \nTo win, guess the proper letters before running out of tries");	
}

var hintsIndex = [];
function checkHint(){
	//Loop through the selected Word.
	//Any letter that is not previously selected, give a letter hint to the user.
	if(numOfHints > 0){
		for (var i =0; i < categoryLength; i++){
			if(!chosenLetterFromKeys.includes(selectedRandomElement.charAt(i)) && (!hintsIndex.includes(i))){
				selectedLetters.push(selectedRandomElement.charAt(i));
				hintsIndex.push(i);
				inputField[i].value = selectedRandomElement.charAt(i);
				correctGuessCounter++;
				numOfHints--;
				document.getElementById("pointsValue").innerHTML = Math.round(numOfHints);
				break;
			}
		}		
	}
	if(correctGuessCounter >= categoryLength){
		document.getElementById("pointsValue").innerHTML = numOfHints;
		isWordFound = true;
		swal("CONGRATS!", ", You got the right word!", "success");
	}
}

/**
 * Below are the 2 functions to check the timer and whether the user is allowed to try again: 
 */
var isTimeOut = false;
var timeleft = 60;
var downloadTimer = setInterval(function(){
  if(timeleft < 0){	
	clearInterval(downloadTimer);
	document.getElementById("countdown").innerHTML = "Time Finished.";
	isTimeOut = true;
  }else if(isWordFound){
	document.getElementById("countdown").innerHTML = "Good Job!";
  } 
  else {
    document.getElementById("countdown").innerHTML = timeleft + " SECONDS REMAINING";
  }
  timeleft -= 1;
}, 1000);

//This function is used to delay the time before next line execution. EX: wait(5000) means 5 seconds
function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms) {
	  end = new Date().getTime();
    }
 }

//This function runs each time after a word is selected if the correct word is guessed.
function reconfirmEachLetter(){

}


/**
Function to give the user a total points calculations!

**/


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
	
	

			 			
				
				

