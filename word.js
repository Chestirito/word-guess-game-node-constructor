var letter = require("./letter");

function Word(chosenWord){
    this.wordArr = [];
    chosenWord.split('').forEach(item => {
        this.wordArr.push(new letter(item));
    }); 
    
    this.displayWord = function(){
        var fullWord = ""
        this.wordArr.forEach(function(item){
            fullWord += item.displayLetter() + " ";
        });
        return fullWord;
    }
    this.compare = function(letter){
        var isFlipped = false;
        this.wordArr.forEach(function(item){
            if(item.match(letter)){
                item.match(letter);
                isFlipped = true;
                //console.log(isFlipped);
            }
        });
        return isFlipped;
    }
    /****** my function to check if word fully guessed ******/
    this.completed = function(){
        var isGuessed = true;
        this.wordArr.forEach(function(item){
            if(!item.guessed){
                isGuessed = false;
            }
        });
        return isGuessed;
    }
    
}

module.exports = Word;