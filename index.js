var word = require("./word");

var inquirer = require("inquirer");


var gameObj = {
    movies : ["inception", "interstellar","deadpool", "avengers", "side effect", 
    "harry potter", "home alone", "mission impossible", "spiderman", "jurassic world"],
    answer : "",
    lives : 8,
    guessedLetters : []
};

var fontColor ={
    cyan : "\x1b[36m%s\x1b[0m",
    red : "\x1b[31m%s\x1b[0m"
}
var questions = [{
    type: 'input',
    name: 'letter',
    message: "Guess a letter",
    validate: function(value) {
        if (typeof value === "string" && value.length === 1
        && (value >= "a" && value <= "z" || value >= "A" && value <= "Z")) {
            if(!gameObj.guessedLetters.includes(value)){
                return true;
            }
            return 'You already guessed this letter';
        }
        return 'Please enter only one valid letter in the alphabet';
    }
}];

function askLetter(){
    console.log(gameObj.answer.displayWord());
    inquirer.prompt(questions).then(response => {
        //gameObj.answer.compare(response.letter);
        gameObj.guessedLetters.push(response.letter);
        determineCorrect(response.letter);
        determineWinLose();
        console.log("\n");
        askLetter();
    });
}

function setWord(){
    gameObj.answer = new word(gameObj.movies[Math.floor((Math.random() * gameObj.movies.length))]);
}

function determineWinLose(){
    if(gameObj.answer.completed()){
        console.log("\n");
        console.log(gameObj.answer.displayWord());
        console.log(fontColor.cyan, "You Win!!!");
        console.log("Restarting Game");
        resetGame();
    }
    if(gameObj.lives === 0){
        console.log("\n");
        console.log(gameObj.answer.displayWord());
        console.log(fontColor.red,"You Lose D:");
        console.log("Restarting Game");
        resetGame();
    }
}

function determineCorrect(letter){
    if(!gameObj.answer.compare(letter)){
        gameObj.lives--;
        //console.log(!gameObj.answer.compare(letter));
        console.log(fontColor.red,"Incorrect!");
        console.log("Lives Remaining: " + gameObj.lives);
    }
    else{
        console.log(fontColor.cyan,"Correct!");
    }
}

function resetGame(){
    console.log("\n");
    setWord();
    gameObj.lives = 8;
    gameObj.guessedLetters = [];
}

function intro(){
    console.log("*************************");
    console.log("*                       *");
    console.log("*   Guess The Movie     *")
    console.log("*                       *");
    console.log("*************************\n\n\n");

}
resetGame();
intro();
askLetter();