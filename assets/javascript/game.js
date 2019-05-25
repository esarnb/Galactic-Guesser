var wins = 0, losses = 0;
var score = 0, goal = 0;
var pressed;

function randomGoal() {
    return (Math.floor(Math.random() * 100) + 21)
}

function randomValues() {
    var values = [1], insert=1;
    for(var i = 1; i < 4; i++) {
        while(values.includes(insert)) insert = (Math.floor(Math.random() * 12) + 1);
        values.push(insert);
    }

    $('.planet').each(function(i, obj) {
        $(obj).attr("value", values[i]);
    });

    console.log(values);
    
}

function reset() {
    //reset score and visual
    score = 0;
    
    //Reset end-game prompt


    //Assign new random goal number
    goal = randomGoal();

    //Assign new values to planets
     randomValues();
}

reset();
$(document).ready(function() {
    $(".planet").on("click", function(event) {
        console.log($(this).attr("value"));
        
    })
})



