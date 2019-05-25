var wins = 0, losses = 0;
var score = 0, goal = 0;
var pressed;

function randomGoal() {
    return (Math.floor(Math.random() * 100) + 21)
}

function randomValue() {
    return (Math.floor(Math.random() * 12) + 1)
}

function reset() {
    //reset score and visual
    score = 0;
    
    //Reset end-game prompt


    //Assign new random goal number
    goal = randomGoal();

    //Assign new values to planets
    $('.planet').each(function () {
       $(this).attr("value", randomValue());
    });
    
}

reset();
$(document).ready(function() {
    $(".planet").on("click", function(event) {
        console.log(event);
        console.log(this);
    })
})



