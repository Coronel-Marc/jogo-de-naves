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
                moveplayer(); // função de movimentação do player

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

        function moveplayer() {
                if (game.press[TECLA.W]) {
                        var top = parseInt($("#player").css("top"));
                        $("#player").css("top", top-3);
                }

                if (game.press[TECLA.S]) {
                        var top = parseInt($("#player").css("top"));
                        $("#player").css("top", top+3);
                }

                if (game.press[TECLA.D]) {
                        //Call the function 'Shoot'
                }

        } //End of the function moveplayer()
        

} //End of the function start()


