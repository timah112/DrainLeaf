//Initializing Global Variables:

/** set a variable to pick directly from a fruit. */
var fruitSelection = ["APPLE","ORANGE", "BANANA", "PEAR", "WATERMELON", "KIWI", "LEMON", "PINEAPPLE", "STRAWBERRY", "POMEGRANATE", "GRAPEFRUIT", "BLUEBERRY", "COCONUT", "CHERRY", "PEACH", "BLACKBERRY", "MANGO", "CRANBERRY", "PLUMS", "SUGARCANE"];
var mammalSelection = ["CAT", "DOG", "ELEPHANT", "BEAR", "LION", "TIGER", "LIGER", "MONKEY", "APE", "GORILLA", "SNAKE", "MONGOOSE", "DEER", "RHINOCERAS", "ARMADILLO", "HYENA", "HORSE", "KANGAROO", "GIRAFFE", "SKUNK","PIG", "GOAT", "LAMB", "COW", "WARTHOG", "MOOSE", "BULL"];
//Pick a fruit randomly from the array
var selectedRandomFruit = fruitSelection[Math.floor(Math.random()*fruitSelection.length)];
//Get the length of that chosen fruit .
var fruitLength = selectedRandomFruit.length;
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

//Points Variables: 
//static var totalPoints = 0;
var pointsEarned = 5;
 var finalTotalPoints;


//----------------------------------------------
/**
 * It runs on the "load" of this page.
 * This function below creates the keyboard layout and displays it.
 * It also initializes the "letter variable".
 */
var onLoadFuction= window.addEventListener( "load", function( windowLoadE ) {
	document.getElementById("numOfTries").innerHTML = numOfTries;
	document.getElementById("pointsValue").innerHTML = this.totalPoints;
	addFields();
	
});

function userPoints(totalPoints){
	this.totalPoints = totalPoints;
}
var setPoints = new userPoints(0);
/**
This function checks if the counter for a field thats clicked is more than once, and if so if wont call the addField Method. 
(Basically prevents the user from multiple button clicks and prevents the added letter fields on top of each other)
**/	
function onClickOnlyOnce(){
	if (addFieldCounter < 1){
		document.getElementById("pointsValue").innerHTML = this.totalPoints;
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

		document.getElementById("categoryTitle").innerHTML = "The Category is: Fruits" ;
		document.getElementById("categoryTitle").style.fontSize = "large";

		document.getElementById("output").innerHTML = "The Length of the category is: " + fruitLength;
		document.getElementById("output").style.fontSize = "large";

		//document.getElementById("enterText").innerHTML = "Please select letters from the keys below:";
		//document.getElementById("enterText").style.fontSize = "large";

		displayFields();
		var str = [];
		var x;
		for(var i = 0; i<fruitLength; i++ ){
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
	else if(chosenLetterFromKeys.includes(letter)){
		swal("You already selected that letter. Please select another letter.");
	}
	else if(numOfTries > -1){
		chosenLetterFromKeys.push(letter);
		findIndex(letter, selectedRandomFruit);
	} 
	else{
		swal("Sorry, you are out of tries. The correct word was: " + selectedRandomFruit + "\n  \n \Click 'New Game' to continue");		
	}	
}

/**-----------------------------------------------------------------------
function enterIntoField(inputField, letter){
	//var letterIndex = findIndex(letter, selectedRandomFruit);
	
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
function findIndex(letter, selectedRandomFruit){
	
	var isLetterFound = false;
	for (var i =0; i < fruitLength; i++){
		if (selectedRandomFruit.charAt(i) == letter){
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

	}else if(correctGuessCounter === fruitLength){
		setPoints.totalPoints += pointsEarned;
		sessionStorage.setItem("totalPoints", setPoints.totalPoints);
		finalTotalPoints = sessionStorage.getItem("totalPoints");
		
		document.getElementById("pointsValue").innerHTML = finalTotalPoints;
		isWordFound = true;
		swal("CONGRATS!", ", You got the right word!", "success");

	}
	return index;
}

//How-To Button Feature:
function clickHowTo(){
	swal("RULES: \n \n Enter the letters from the displayed keyboard on screen. \n \nTo win, guess the proper letters before running out of tries");
	
}

function checkHint(){
	//loop through the selected Word.
	//Any letter that is not previously selected, give a letter hint to the user.
	for (var i =0; i < fruitLength; i++){
		if(!selectedLetters.includes(selectedRandomFruit.charAt(i))){
			inputField[i].value = selectedRandomFruit.charAt(i)
			break;
		}
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
	
	

			 			
				
				

