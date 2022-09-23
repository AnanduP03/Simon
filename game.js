const buttonColors=["red","blue","green","yellow"];

const gamePattern=[];

const userClickedPattern=[];

var level=0 ;

var started=false;

$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence(){
    userClickedPattern.splice(0);
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});

function playSound(name){
    if(name==="red"){
        var audio = new Audio('sounds/'+name+'.mp3');
        audio.play();
    }
    else if(name==="blue"){
        var audio = new Audio('sounds/'+name+'.mp3');
        audio.play();
    }
    else if(name==="green"){
        var audio = new Audio('sounds/'+name+'.mp3');
        audio.play();
    }
    else{
        var audio = new Audio('sounds/'+name+'.mp3');
        audio.play();
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
};

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");
        var audio = new Audio('sounds/wrong.mp3');
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        audio.play();
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }
};

function startOver(){
    started=false;
    level=0;
    gamePattern.splice(0);
}