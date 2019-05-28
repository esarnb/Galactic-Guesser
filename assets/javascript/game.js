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
        endGame(" You won the round! c: ");
    }
    else if (currentScore > goal) {
        losses++;
        $("#losses").text(`Losses: ${losses}`);
        endGame(" You lost the round. :c ");
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
    });

    $('.planetText').each(function(i, obj) {
        $(obj).text(usingImg[i].name)
    });
}

/**
 * 
 * @param {string} endPrompt : String to display on end of a round
 */
function endGame(endPrompt) {
    endTheGame = true;
    $(".singlePlanet").fadeOut("slow");
    setTimeout(() => {
        $("#status").text(endPrompt).fadeIn("slow");
        //Begin full reset of values and visuals to play for another round
        setTimeout(() => {
            reset();
        }, 5000);
    }, 1000);
    
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
    $("#status").text("").fadeOut("slow");
    //Assign new random goal number
    goal = randomGoalsAndValues("goal");
    $("#numberGoal").text(goal)

    //Give each planet a new image and value
    setupPlanet();
    $(".singlePlanet").fadeIn("slow");

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

/* ------------------------------------------------------------------ */

/* ---- particles.js config ---- */

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 90,
        "density": {
          "enable": true,
          "value_area": 800
            
        }
        
     
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 2,
          "color": "#fff"
        },
        "polygon": {
          "nb_sides": 7
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 3,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 20,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 250,
        "color": "fff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
        
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
          
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 300,
          "size": 70,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 500,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
   
  });