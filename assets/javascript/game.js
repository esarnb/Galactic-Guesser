var wins = 0, losses = 0;
var score = 0, goal = 0;
var endTheGame = false, pressed;
/**
 * To get a range: (random() * max-min+1)+min)
 */
function randomGoal() {
    return (Math.floor(Math.random() * 102) + 19);
}

function randomValues() {
    return (Math.floor(Math.random() * 12) + 1);
}

function addToScore(inputValue) {
    var currentScore = parseInt($("#totalScore").text())
    currentScore += inputValue;

    $("#totalScore").text(currentScore)

    if (currentScore === goal) {
        wins++;
        $("#wins").text(`Wins: ${wins}`);
        endGame(" You Win! c: ");
    }
    else if (currentScore > goal) {
        losses++;
        $("#losses").text(`Losses: ${losses}`);
        endGame(" You lose :c ");
    }
}

function endGame(endPrompt) {
    $("#status").text(endPrompt);
    endTheGame = true;

    setTimeout(() => {
        reset();
    }, 5000);
}

/**
 * Resets all game values to initial state, 
 * except for win/loss
 */
function reset() {
    //reset score and visual
    score = 0;
    $("#totalScore").text(score);  

    //Reset end-game prompt
    $("#status").text("");

    //Assign new random goal number
    goal = randomGoal();
    $("#numberGoal").text(goal)

    //Assign new values to planets
    $('.planet').each(function(i, obj) {
        $(obj).attr("value", randomValues());
    });

    //After all is reset, unlock game
    endTheGame = false;
}

$(document).ready(function() {
    reset();
    $(".planet").on("click", function(event) {
        pressed = parseInt($(this).attr("value"));
        console.log(pressed);
        
        //If the game is not done
        if (!endTheGame) {
            addToScore(pressed)
        }
        
    })
})



