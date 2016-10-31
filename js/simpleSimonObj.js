(function () {
    'use strict';

    // Simple Simon Game Object

    var game = {};

    // Attributes
    game.boxes = ["#box1", "#box2", "#box3", "#box4"];
    game.random = Math.floor(Math.random() * 4); // Generates fist random number
    game.counter = 0;
    game.sequence = [];
    game.userPlaying = false;


    // Methods
    game.setupGame = function () {
            $("#startGameButton").fadeOut();
            $("#gameOverMessage").remove();
            $("#message").html("Repeat the sequence you just saw");

            game.boxes.forEach(function (box) {
                $(box).fadeTo("fast", 0.3);
            });

            // Reset variables in case user play more than once.
            game.sequence = [];
            game.counter = 0;
        };

    game.startGame = function () {
            $("#startGameButton").on("click", function () {
                event.preventDefault();
                game.userPlaying = true;
                // Initialize event listeners
                game.setupGame();
                game.sequence.push(game.random);
                game.showSequence(game.sequence)
            });
        };

    game.showSequence = function () {

            var sequenceSoundObject = document.createElement("audio");
            sequenceSoundObject.src= "http://www.pacdv.com/sounds/interface_sound_effects/beep-3.wav";
            sequenceSoundObject.volume=0.9;
            sequenceSoundObject.autoPlay=false;
            sequenceSoundObject.preLoad=true;

            $("#rounds").html("Round: <br><strong>" + game.sequence.length + "</strong>"); // Show the # of rounds

            // Show the Sequence
            var i = 0;
            var id = setInterval(function () {
                // Boxes fade In and Out and play a sound according with the sequence.
                $(game.boxes[game.sequence[i]]).fadeTo("slow", 1).fadeTo("slow", 0.3);
                if (i == game.sequence.length - 1) {
                    clearInterval(id);
                }
                i ++;
                sequenceSoundObject.play();
            }, 1000);
        };

    game.gameOver = function () {
            var gameOverHtml = "<div class='alert alert-warning alert-dismissible fade in center-block text-center' id='gameOverMessage' role='alert'>" +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>x</span></button>" +
                "<strong>Game Over !</strong> Please click Start Game again</div>";


            $("#startGameButton").fadeIn();
            $("#gameOver").html(gameOverHtml);
            game.boxes.forEach(function (box) {
                $(box).fadeTo("fast", 1);
            });
        // Change flag back to off since the user is not playing anymore.
            game.userPlaying = false;
        };

    game.simpleSimon = function () {
            var selectionSoundObject = document.createElement("audio");
            selectionSoundObject.src= "http://www.pacdv.com/sounds/interface_sound_effects/sound93.wav";
            selectionSoundObject.volume=0.9;
            selectionSoundObject.autoPlay=false;
            selectionSoundObject.preLoad=true;

            // Event Listeners for the color boxes
            $(".box").each(function (indexBox, box) {
                box.addEventListener("click", function () {
                    // Flag to check if the user is playing
                    if (!game.userPlaying) return;

                    // === Checks Sequence ===
                    if(indexBox == game.sequence[game.counter]){
                        // If user click is correct it will restore opacity momentarily to show the user that his selection was correct.
                        selectionSoundObject.play();
                        $(box).fadeTo("fast", 1).animate({
                            opacity: 0.3
                        }, 500);
                        game.counter ++
                    } else {
                        game.gameOver();
                    }
                    if (game.sequence.length == game.counter) {
                        // If full sequence is correct it will generate a new random number and push it to the sequence.
                        game.random = Math.floor(Math.random() * 4);
                        game.sequence.push(game.random);
                        game.showSequence();
                        game.counter = 0;
                    }
                });
            });
        };

    // Call methods
    game.simpleSimon();
    game.startGame();

})();

