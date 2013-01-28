/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/21/13
 * Time: 1:10 PM
 * To change this template use File | Settings | File Templates.
 */

var Bomberman = function(config) {
    var self = this;

    try {
        var socket = config.socket;
        var width = config.width;
        var height = config.height;
    } catch (e) {
        console.log('Bomberman initialization error: ' + e);
    }


    var canvas = function() {
        var c = document.getElementById("canvas");

        c.width  = width;
        c.height = height;
        c.style.width  = width + 'px';
        c.style.height = height + 'px';

        return document.getElementById("canvas").getContext("2d");
    }();


    var field = new FieldRender(
        {
            width: width,
            height: width,
            canvas: canvas
        }
    );

    var firstPlayer = new PlayerRender(
        {
            canvas: canvas,
            sprite: 'assets/img/player.png',
            initCallback: function(){},
            speed: 32,
            width: 32,
            height: 32
        }
    );
    var secondPlayer = new PlayerRender(
        {
            x: 24,
            y: 24,
            canvas: canvas,
            sprite: 'assets/img/monster.png',
            initCallback: function(){},
            speed: 32,
            width: 32,
            height: 32
        }
    );

    var player, opponent;

    this.setPlayer = function (number) {
        player = number ? secondPlayer : firstPlayer;
        opponent = number ? firstPlayer : secondPlayer;

        return self;
    }


    this.render = function() {
        field.render();
        //console.log(opponent);
        opponent.render();
        player.render();

        return self;
    };


    /*var load = function() {
        var player = false;
        var player1 = false;
        this.playerReady = function() {
            player = true;
            return this;
        };
        this.player1Ready = function() {
            player1 = true;
            return this;
        }
        this.init = function() {
            if (player && player1) {
                //$('body').keypress(keysBind);
                //self.render();
            }
        };
    }*/


    this.init = function() {
        field.init();
        firstPlayer.init();
        secondPlayer.init();

        return self;
    }

    this.start = function() {
        $('body').keydown(keysBind);
        self.render();

        return self;
    };

    this.update = function(params) {
        opponent.x = params.x;
        opponent.y = params.y;
        console.log(params);
        opponent.bombs = params.bombs;
        self.render();

        return self;
    }

    var keysBind = function(key) {
        var changed = false;
        var keyCode = key.charCode ? key.charCode : key.keyCode ? key.keyCode : 0;
        switch (keyCode) {
            case 37: //left
                key.preventDefault();
                if (player.x > 0 && field.access(player.x - 1, player.y)) {
                    player.x -= 1;
                    changed = true;
                }
                break;
            case 38: //up
                key.preventDefault();
                if (player.y > 0 && field.access(player.x, player.y -1)) {
                    player.y -= 1;
                    changed = true;
                }
                break;
            case 39: //right
                key.preventDefault();
                if (player.x < 24 && field.access(player.x + 1, player.y)) {
                    player.x += 1;
                    changed = true;
                }
                break;
            case 40: //down;
                key.preventDefault();
                if (player.y < 24 && field.access(player.x, player.y + 1)) {
                    player.y += 1;
                    changed = true;
                }
                break;
            case 32: //space
                key.preventDefault();
                var bombX = player.x;
                var bombY = player.y;
                if (player.addBomb(player.x, player.y)) {
                    setTimeout(
                        function() {
                            console.log('remove: ' + player.x + ':' + player.y);
                            player.removeBomb(bombX, bombY);
                            field.explosion(bombX, bombY, player.fire, self.fireEvent);
                            self.fireEvent();
                        },
                        1500
                    );
                    changed = true;
                }
                break;
        }

        if (changed) {
            self.fireEvent();
        }
    };

    this.fireEvent = function() {
        socket.send(
            JSON.stringify(
                {
                    action: 'render',
                    params: {
                        player: {
                            x: player.x,
                            y: player.y,
                            bombs: player.bombs
                        }
                    }
                }
            )
        );
        self.render();
    };
};
