var wins = 0, losses = 0;
var score = 0, goal = 0;
var endTheGame = false, pressed;

/**
 * 
 * @param {string} type : a string determining whether the caller needs
 * a randomized goal value ("goal") or a planet value ("values"). 
 * If neither are chosen, the app will log the general error.
 */
function randomGoalsAndValues(type) {
    if (type == "goal") return (Math.floor(Math.random() * 102) + 19)
    else if (type == "values") return (Math.floor(Math.random() * 12) + 1)
    else console.log("Did not define a type for function: randomGoalsAndValues");
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
    goal = randomGoalsAndValues("goal");
    $("#numberGoal").text(goal)

    //Assign new values to planets
    $('.planet').each(function(i, obj) {
        $(obj).attr("value", randomGoalsAndValues("values"));
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



