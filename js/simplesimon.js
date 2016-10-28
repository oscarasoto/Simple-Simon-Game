(function () {
    'use strict';
    var counter = 0;
    var sequence = [];

    function setupGame() {
        var boxes = ["#box1", "#box2", "#box3", "#box4"];
        $("#startGame").fadeOut();

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
        $("#startGame").fadeIn();
        $("#gameOver").html("Game Over !")
        boxes.forEach(function (box) {
            $(box).fadeTo("fast", 1);
        });
    }

    function simpleSimonGame() {
        var random = Math.floor(Math.random() * 4);

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
                    console.log("game over")
                    gameOver();

                }
                if (sequence.length == counter) {
                    random = Math.floor(Math.random() * 4);
                    sequence.push(random);
                    showSequence(sequence);
                    console.log("You did it");
                    counter = 0;
                }
            });
        });
    }


    $("#startGame").on("click", function () {
        event.preventDefault();
        setupGame();
        simpleSimonGame();
    });

})();








