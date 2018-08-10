function Letter(letter){
    this.letter = letter;
    this.guessed = false;
    this.displayLetter = function(){
        if(this.guessed){
            return this.letter;
        }
        else if(!this.guessed && this.letter !== " "){
            return "_";
        }
        else{//for empty spaces
            this.guessed = true;
            return " ";
        }
    };
    this.match = function(guess){
        if(guess === this.letter){
            this.guessed = true;
            return this.guessed;
        }
    };
}

module.exports = Letter;