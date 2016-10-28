(function () {
    'use strict';
    var counter = 0;
    var sequence = [];

    function setupGame() {
        var boxes = ["#box1", "#box2", "#box3", "#box4"];
        $("#startGame").fadeOut();
        $("#message").remove();

        boxes.forEach(function (box) {
            $(box).fadeTo("fast", 0.3);
        });
    }

    function showSequence(sequence) {
        var boxes = ["#box1", "#box2", "#box3", "#box4"];
        $("#rounds").html(sequence.length); // # of rounds
        // Show the Sequence
        var i = 0;
        var id = setInterval(function () {
            $(boxes[sequence[i]]).fadeTo("slow", 1).fadeTo("slow", 0.3);
            if (i == sequence.length) {
                clearInterval(id);
            }
            i ++;
        }, 1000);

    }

    function gameOver() {
        var boxes = ["#box1", "#box2", "#box3", "#box4"];
        var gameOverHtml = "<div class='alert alert-warning center-block' id='message' role='alert'><h3 class='text-center'><strong>Game Over !</strong>Please click Start Game again</h3></div>";
        $("#startGame").fadeIn();
        $("#gameOver").html(gameOverHtml);
        boxes.forEach(function (box) {
            $(box).fadeTo("fast", 1);
        });
    }

    function simpleSimonGame() {
        var random = Math.floor(Math.random() * 4);

        setupGame();
        sequence.push(random);
        showSequence(sequence);



        $(".box").each(function (indexBox, box) {
            box.addEventListener("click", function () {
                // === Checks Sequence ===
                if(indexBox == sequence[counter]){
                    $(box).fadeTo("fast", 1).animate({
                        opacity: 0.3
                    }, 500);
                    counter ++
                } else {
                    counter = 0;
                    sequence = [];
                    gameOver();

                }
                if (sequence.length == counter) {
                    random = Math.floor(Math.random() * 4);
                    sequence.push(random);
                    showSequence(sequence);
                    counter = 0;
                }
            });
        });
    }


    $("#startGame").on("click", function () {
        event.preventDefault();
        simpleSimonGame();
    });

})();








