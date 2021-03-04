function start(){ 
        
        $("#start").hide();

        $("#background").append("<div id='player' class='animation1'></div>");
        $("#background").append("<div id='enemy1' class='animation2'></div>");
        $("#background").append("<div id='enemy2' ></div>");
        $("#background").append("<div id='buddy' class='animation4'></div>");
        $("#background").append("<div id='scoreboard'></div>");
        $("#background").append("<div id='stamina'></div>");


        // Principais variáveis do jogo ------------------------
        
        var canShoot = true;
        var game = {}
        var endGame = false;
        var TECLA = {
                W: 87,
                S: 83,
                D: 68
        }

        var speed = 2;
        var positionY = parseInt(Math.random() * 334); 

        var score = 0;
        var lost = 0; 
        var saved = 0;

        var currentStamina = 3;

        //Sons do game

        var shootSound = document.getElementById("shootSound");
        var explosionSound = document.getElementById("explosionSound");
        var gameOverSound = document.getElementById("gameOverSound");
        var backgroundSound = document.getElementById("backgroundSound");
        var lostSound = document.getElementById("lostSound");
        var savedSound = document.getElementById("savedSound");

        var music = document.getElementById("music");

        //Musica em loop

        music.addEventListener("ended", function () { 
                music.currentTime = 0;
                music.play();
                               
        }, false);
        backgroundSound.play();
        

        //game loop

        game.timer = setInterval(loop,5);

        function loop() {
                
                moveBackground();
                movePlayer(); // função de movimentação do player
                moveEnemy1();
                moveEnemy2();
                moveBuddy();
                collision();
                scoreboard();
                stamina();


        } //End of the function loop()


        //Função de movimentação do background ---------------------------

        function moveBackground() {
                
                left = parseInt($("#background").css("background-position"));
                $("#background").css("background-position", left-1);
        } //End of the function moveBackground()


        //Detectando pressionamento de teclas-----------------------------

        

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

                        shoot();
                }

        } //End of the function moveplayer()

        //Movimentação inimiga

        

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


        // Criando a função de disparo

        

        function shoot() {
                if (canShoot == true) {
                        shootSound.play
                        canShoot = false;
                        
                        coordYShoot = parseInt($("#player").css("top"))
                        coordXShoot = parseInt($("#player").css("left"))
                        positionXShoot = coordXShoot + 180;
                        positionYShoot = coordYShoot + 50;

                        $("#background").append("<div id='shoot'></div>")
                        $("#shoot").css("top", positionYShoot);
                        $("#shoot").css("left", positionXShoot);

                        var timeShoot = window.setInterval(executeShoot, 15);
                    
                }

                function executeShoot() {
                        coordXShoot = parseInt($("#shoot").css("left"));
                        $("#shoot").css("left", coordXShoot + 30);

                        if (coordXShoot > 900) {
                                window.clearInterval(timeShoot);
                                timeShoot = null;
                                $("#shoot").remove();
                                canShoot = true;
                        }
                }
        }

        function collision() {
                var collision1 = ($("#player").collision($("#enemy1")));
                var collision2 = ($("#player").collision($("#enemy2")));
                var collision3 = ($("#shoot").collision($("#enemy1")));
                var collision4 = ($("#shoot").collision($("#enemy2")));
                var collision5 = ($("#player").collision($("#buddy")));
                var collision6 = ($("#enemy2").collision($("#buddy")));
                

                //player and enemy1

                if (collision1.length > 0) {
                        currentStamina--;
                        collisionEnemy1X = parseInt($("#enemy1").css("left"));
                        collisionEnemy1Y = parseInt($("#enemy1").css("top"));
                        explosion1(collisionEnemy1X, collisionEnemy1Y);

                        positionY = parseInt(Math.random() * 334);
                        $("#enemy1").css("left", 700);
                        $("#enemy1").css("top", positionY);
                }

                //player and enemy2

                if (collision2.length > 0) {
                        currentStamina--;
                        collisionEnemy2X = parseInt($("#enemy2").css("left"));
                        collisionEnemy2Y = parseInt($("#enemy2").css("top"));
                        explosion2(collisionEnemy2X, collisionEnemy2Y);

                        $("#enemy2").remove();

                        replaceEnemy2();
                }

                //shoot and enemy1

                if (collision3.length > 0) {
                        speed = speed+0.4;
                        score = score + 100;

                        collisionEnemy1X = parseInt($("#enemy1").css("left"));
                        collisionEnemy1Y = parseInt($("#enemy1").css("top"));
                        
                        explosion1(collisionEnemy1X, collisionEnemy1Y);
                        $("#shoot").css("left", 910);
                        

                        positionY = parseInt(Math.random() * 334);
                        $("#enemy1").css("left", 700);
                        $("#enemy1").css("top", positionY);

                }

                if (collision4.length > 0) {
                        
                        speed = speed+0.4;
                        score = score + 50;

                        collisionEnemy2X = parseInt($("#enemy2").css("left"));
                        collisionEnemy2Y = parseInt($("#enemy2").css("top"));
                        $("#enemy2").remove();

                        explosion2(collisionEnemy2X, collisionEnemy2Y);
                        $("#shoot").css("left", 910);

                        replaceEnemy2();



                }

                //player and buddy

                if (collision5.length > 0) {
                        savedSound.play();
                        saved ++;
                        replaceBuddy();
                        $("#buddy").remove();
                }

                //enemy2 and buddy

                if (collision6.length > 0) {
                        lost ++;
                        coordBuddyX = parseInt($("#buddy").css("left"));
                        coordBuddyY = parseInt($("#buddy").css("top"));
                        explosion3(coordBuddyX, coordBuddyY);
                        $("#buddy").remove();
                        
                        replaceBuddy();
                }

        }


        //Explosion 1
        
        function explosion1(collisionEnemy1X, collisionEnemy1Y) {
                explosionSound.play();
                $("#background").append("<div id='explosion1'></div>");
                $("#explosion1").css("background-image:", "url(../media/img/explosao.png)");
                var div = $("#explosion1");
                div.css("top", collisionEnemy1Y);
                div.css("left", collisionEnemy1X-50);
                div.animate({width:250, opacity:0.1}, "slow");
                
                var timeExplosion = window.setInterval(removeExplosion, 500);

                function removeExplosion() {
                        div.remove();
                        window.clearInterval(timeExplosion);
                        timeExplosion = null;
                }
                
        }


        //Explosion 2
        
        function explosion2(collisionEnemy2X, collisionEnemy2Y) {
                explosionSound.play();
                $("#background").append("<div id='explosion2'></div>");
                $("#explosion2").css("background-image:", "url(../media/img/explosao.png)");
                var div2 = $("#explosion2");
                div2.css("top", collisionEnemy2Y);
                div2.css("left", collisionEnemy2X-50);
                div2.animate({width:250, opacity:0.1}, "slow");

                var timeExplosion2 = window.setInterval(removeExplosion2, 500);

                function removeExplosion2() {
                        div2.remove();
                        window.clearInterval(timeExplosion2);
                        timeExplosion2 = null;
                }
                
        }

        //Explosion 3

        function explosion3(coordBuddyX, coordBuddyY) {
                lostSound.play();
                $("#background").append("<div id='explosion3' class='animation5'></div>");
                $("#explosion3").css("top", coordBuddyY);
                $("#explosion3").css("left", coordBuddyX);

                var timeExplosion3 = window.setInterval(removeExplosion3, 500);

                function removeExplosion3() {
                        $("#explosion3").remove();
                        window.clearInterval(timeExplosion3);
                        timeExplosion3 = null;
                }
        }

        function replaceBuddy() {
                var timeBuddy = window.setInterval(replace6, 2000);

                function replace6() {
                        window.clearInterval(timeBuddy);
                        timeBuddy = null

                        if (endGame == false) {
                                $("#background").append("<div id='buddy' class='animation4'></div>")
                        }
                }
        }

        

        //Replace enemy2

        function replaceEnemy2() {
                var timeCollision4 = window.setInterval(replace4, 5000);

                function replace4() {
                        window.clearInterval(timeCollision4);
                        timeCollision4 = null

                        if (endGame == false) {
                                $("#background").append("<div id=enemy2></div>");
                        }
                }
        }


        function scoreboard() {
                $("#scoreboard").html("<h2> Score: " + score + " Salvos: " + saved + " Perdidos: " + lost + "</h2>");

        }

        function stamina() {
                if (currentStamina == 3) {
                        $("#stamina").css("background-image", "url(../media/img/energia3.png)")
                }
                if (currentStamina == 2) {
                        $("#stamina").css("background-image", "url(../media/img/energia2.png)")
                }
                if (currentStamina == 1) {
                        $("#stamina").css("background-image", "url(../media/img/energia1.png)")
                }
                if (currentStamina == 0) {
                        
                        $("#stamina").css("background-image", "url(../media/img/energia0.png)")

                        gameOver();
                }
        }

        //Função GameOver()

        function gameOver() {
                endGame = true;
                music.pause();
                gameOverSound.play();

                window.clearInterval(game.timer);
                game.timer = null;

                $("#player").remove();
                $("#enemy1").remove();
                $("#enemy2").remove();
                $("#buddy").remove();

                $("#background").append("<div id='end'></div>");

                $("#end").html("<h1> Game Over </h1><p> Sua pontuação foi: " + score + "</p> " + "<div id='reset' onClick=resetGame()><button>Jogar novamente</button></div>");
        }
        

} //Fim função start()

//Reinicia o jogo

function resetGame() {
        gameOverSound.pause();
        $("#end").remove();
        start();
}


