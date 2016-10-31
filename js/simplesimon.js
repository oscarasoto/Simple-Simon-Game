(function () {
    'use strict';

    // Variables
    var boxes = ["#box1", "#box2", "#box3", "#box4"];
    var random = Math.floor(Math.random() * 4); // Generates fist random number
    var counter = 0;
    var sequence = [];
    var userPlaying = false;

    // Functions

    // setupGame() Removes start button and change the opacity of the colors, every time the game is played.
    function setupGame() {

        $("#startGameButton").fadeOut();
        $("#gameOverMessage").remove();
        $("#message").html("Repeat the sequence you just saw");

        boxes.forEach(function (box) {
            $(box).fadeTo("fast", 0.3);
        });

        // Reset variables in case user play more than once.
        sequence = [];
        counter = 0;
    }

    // showSequence shows the sequence to the user for every round.
    function showSequence(sequence) {

        var sequenceSoundObject = document.createElement("audio");
        sequenceSoundObject.src= "http://www.pacdv.com/sounds/interface_sound_effects/beep-3.wav";
        sequenceSoundObject.volume=0.9;
        sequenceSoundObject.autoPlay=false;
        sequenceSoundObject.preLoad=true;

        $("#rounds").html("Round: <br><strong>" + sequence.length + "</strong>"); // Show the # of rounds

        // Show the Sequence
        var i = 0;
        var id = setInterval(function () {
            // Boxes fade In and Out and play a sound according with the sequence.
            $(boxes[sequence[i]]).fadeTo("slow", 1).fadeTo("slow", 0.3);
            if (i == sequence.length - 1) {
                clearInterval(id);
            }
            i ++;
            sequenceSoundObject.play();
        }, 1000);
    }

    // gameOver() Shows message "Game Over", show the start button for the user to play again.
    function gameOver() {
        var gameOverHtml = "<div class='alert alert-warning alert-dismissible fade in center-block text-center' id='gameOverMessage' role='alert'>" +
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>x</span></button>" +
                "<strong>Game Over !</strong> Please click Start Game again</div>";


        $("#startGameButton").fadeIn();
        $("#gameOver").html(gameOverHtml);
        boxes.forEach(function (box) {
            $(box).fadeTo("fast", 1);
        });

        userPlaying = false;

    }

    function simpleSimonGame() {
        var selectionSoundObject = document.createElement("audio");
        selectionSoundObject.src= "http://www.pacdv.com/sounds/interface_sound_effects/sound93.wav";
        selectionSoundObject.volume=0.9;
        selectionSoundObject.autoPlay=false;
        selectionSoundObject.preLoad=true;

        // Event Listeners for the color boxes
        $(".box").each(function (indexBox, box) {
            box.addEventListener("click", function () {
                // Flag to check if the user is playing
                if (!userPlaying) return;

                // === Checks Sequence ===
                if(indexBox == sequence[counter]){
                // If user click is correct it will restore opacity momentarily to show the user that his selection was correct.
                    selectionSoundObject.play();
                    $(box).fadeTo("fast", 1).animate({
                        opacity: 0.3
                    }, 500);
                    counter ++
                } else {
                    gameOver();
                }
                if (sequence.length == counter) {
                // If full sequence is correct it will generate a new random number and push it to the sequence.
                    random = Math.floor(Math.random() * 4);
                    sequence.push(random);
                    showSequence(sequence);
                    counter = 0;
                }
            });
        });
    }

    simpleSimonGame();

    // Start Game Button
    $("#startGameButton").on("click", function () {
        event.preventDefault();
        userPlaying = true;
        // Initialize event listeners
        setupGame();
        sequence.push(random);
        showSequence(sequence);
    });

})();








