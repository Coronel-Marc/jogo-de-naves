function start(){ 
        
        $("#start").hide();

        $("#background").append("<div id='player' class='animation1'></div>");
        $("#background").append("<div id='enemy1' class='animation2'></div>");
        $("#background").append("<div id='enemy2' ></div>");
        $("#background").append("<div id='buddy' class='animation4'></div>");

        // Principais variáveis do jogo ------------------------

        var game = {}

        //game loop

        game.timer = setInterval(loop,5);

        function loop() {
                
                moveBackground();
                movePlayer(); // função de movimentação do player
                moveEnemy1();
                moveEnemy2();
                moveBuddy();

        } //End of the function loop()


        //Função de movimentação do background ---------------------------

        function moveBackground() {
                
                left = parseInt($("#background").css("background-position"));
                $("#background").css("background-position", left-1);
        } //End of the function moveBackground()


        //Detectando pressionamento de teclas-----------------------------

        var TECLA = {
                W: 87,
                S: 83,
                D: 68
        }

        game.press = [];

        //Verifica se o user pressionou alguma tecla--------------------

        $(document).keydown(function (e) {
                game.press[e.which] = true;
        });

        $(document).keyup(function (e) {
                game.press[e.which] = false;
        });

        function movePlayer() {
                if (game.press[TECLA.W]) {
                        var top = parseInt($("#player").css("top"));
                        $("#player").css("top", top-3);

                        if (top <= 5) {
                                $("#player").css("top", top+0);
                        }
                }

                if (game.press[TECLA.S]) {
                        var top = parseInt($("#player").css("top"));
                        $("#player").css("top", top+3);

                        if (top >= 434) {
                                $("#player").css("top", top-0);
                        }
                }

                if (game.press[TECLA.D]) {
                        //Call the function 'Shoot'
                }

        } //End of the function moveplayer()

        //Movimentação inimiga

        var speed = 2;
        var positionY = parseInt(Math.random() * 334); 

        function moveEnemy1() {
                positionX = parseInt($("#enemy1").css("left"));
                $("#enemy1").css("left",positionX-speed);
                $("#enemy1").css("top",positionY);

                if (positionX <= -10) {
                        positionY = parseInt(Math.random() * 334);
                        $("#enemy1").css("left", 694);
                        $("#enemy1").css("top", positionY)
                }
        } //End Function moveEnemy()

        function moveEnemy2() {
                positionX = parseInt($("#enemy2").css("left"));
                $("#enemy2").css("left", positionX-2);

                if (positionX <= 0) {
                        $("#enemy2").css("left", 775)
                }
        }

        function moveBuddy() {
                positionX = parseFloat($("#buddy").css("left"));
                $("#buddy").css("left", positionX+0.3);

                if (positionX >= 906) {
                        $("#buddy").css("left", 0)
                }
        }

        
        
        
        

} //End of the function start()


