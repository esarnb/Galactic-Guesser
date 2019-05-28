var wins = 0, losses = 0;
var score = 0, goal = 0;
var endTheGame = false;

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

/**
 * 
 * @param {string} inputValue : the number the planet returns upon click,
 * which gets added to the total score and checked to see if game ends.
 */
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
    //Else continue the game as normal
}

function setupPlanet() {
    /*
        Trying to dynamically load image path from assets/images/ into array

        var proxy = "https://cors-anywhere.herokuapp.com/";
        $.ajax({
            url : proxy+"assets/images/",
            success: function (data) {
                $(data).find("a").attr("href", function (i, val) {
                    if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                        imgList.push(folder + val);
                    } 
                });
            }
        });
    */
   
   // "assets/images/main" is all the planets
    var imgList = [
        {
            name: "Mercury",
            path: "assets/images/mercury.jpg"
        },
        {
            name: "Venus",
            path: "assets/images/venus.jpg"
        },
        {
            name: "Earth",
            path: "assets/images/earth.jpg"
        },
        {
            name: "Mars",
            path: "assets/images/mars.jpg"
        },
        {
            name: "Jupiter",
            path: "assets/images/jupiter.png"
        },
        {
            name: "Saturn",
            path: "assets/images/saturn.jpg"
        },
        {
            name: "Uranus",
            path: "assets/images/uranus.jpg"
        },
        {
            name: "Neptune",
            path: "assets/images/neptune.jpg"
        }
    ];

    var usingImg = [], currentImg = imgList[Math.floor(Math.random() * imgList.length)];
    for (var i = 0; i < 4; i++) {
        while(usingImg.includes(currentImg)) currentImg = imgList[Math.floor(Math.random() * imgList.length)];
        usingImg.push(currentImg);
        
    }
    
    //Assign new values and images to planets
    $('.planet').each(function(i, obj) {
        $(obj).attr({
            "value": randomGoalsAndValues("values"),
            "src": usingImg[i].path,
            "title": usingImg[i].name
        });
        $(`#planetText${i}`).text(usingImg[i].name)

        console.log(`Title: ${usingImg[i].name} Path: ${usingImg[i].path} #: ${i}`);
        
    });
}

/**
 * 
 * @param {string} endPrompt : String to display on end of a round
 */
function endGame(endPrompt) {
    $("#status").text(endPrompt);
    endTheGame = true;

    //Begin full reset of values and visuals to play for another round
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
    $("#numberGoal").text(`Goal to reach: ${goal}`)

    //Give each planet a new image and value
    setupPlanet();

    //After all is reset, unlock game
    endTheGame = false;
}

$(document).ready(function() {
    reset();
    $(".planet").on("click", function(event) {

        //If the game is not done, register clicks
        if (!endTheGame) {
            //Planet value added to total score
            addToScore(parseInt($(this).attr("value")));
        }
        
    })
})