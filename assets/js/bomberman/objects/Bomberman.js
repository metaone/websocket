/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/21/13
 * Time: 1:10 PM
 * To change this template use File | Settings | File Templates.
 */

var Bomberman = function(config) {
    Base.apply(this, arguments);

    var self = this;

    this.socket = this.clearParam('socket');
    this.size = this.clearParam('size', 32);

    this.width = this.clearParam('width', 15);
    this.height = this.clearParam('height', 15);


    this.canvas = function() {
        var c = document.getElementById("canvas");

        c.width  = self.width * self.size;
        c.height = self.height * self.size;
        c.style.width  = self.width * self.size + 'px';
        c.style.height = self.height * self.size + 'px';

        return document.getElementById("canvas").getContext("2d");
    }();

    var field = new FieldRender({
        canvas: this.canvas,
        size: this.size,
        width: this.width,
        height: this.height
    });

    var firstPlayer = new PlayerRender(
        {
            canvas: this.canvas,
            sprite: 'assets/img/player.png',
            initCallback: function(){},
            speed: 1,
            width: 32,
            height: 32
        }
    );
    var secondPlayer = new PlayerRender(
        {
            x: this.width - 1,
            y: this.height - 1,
            canvas: this.canvas,
            sprite: 'assets/img/monster.png',
            initCallback: function(){},
            speed: 1,
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


    this.render = function(fires) {
        field.render();

        opponent.render();
        player.render();

        var first = false;
        var second = false;
        if (typeof fires !== 'undefined') {
            for (var i = 0; i < fires.length; i++) {
                if (fires[i].x == player.x && fires[i].y == player.y) {
                    first = 'You lose';
                }

                if (fires[i].x == opponent.x && fires[i].y == opponent.y) {
                    second = 'You win';
                }
            }

            if (first || second) {
                var result;
                if (first && second) {
                    result = 'Draw';
                } else {
                    result = first ? first : second;
                }
                this.gameOver(result);
            }
        }

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

    this.start = function(params) {
        field.setMatrix(params.field);

        $('body').keydown(keysBind);
        self.render();

        return self;
    };

    this.update = function(params) {
        if (typeof params.player !== 'undefined') {
            if (typeof params.player.x !== 'undefined') {
                opponent.x = params.player.x;
            }

            if (typeof params.player.y !== 'undefined') {
                opponent.y = params.player.y;
            }

            if (typeof params.player.bombs !== 'undefined') {
                opponent.bombs = params.player.bombs;
            }

            if (typeof params.player.bombCount !== 'undefined') {
                opponent.bombCount = params.player.bombCount;
            }

            if (typeof params.player.speed !== 'undefined') {
                opponent.speed = params.player.speed;
            }

            if (typeof params.player.fire !== 'undefined') {
                opponent.fire = params.player.fire;
            }
        }

        if (typeof params.field !== 'undefined') {
            if (typeof params.field.explosion !== 'undefined') {
                field.explosion(
                    params.field.explosion.x,
                    params.field.explosion.y,
                    opponent.fire,
                    this.fireEvent
                );
            }

            if (typeof params.field.removeBonus !== 'undefined') {
                field.removeBonus(params.field.removeBonus.x, params.field.removeBonus.y);
            }
        }


        self.render();

        return self;
    }

    var keysBind = function(key) {
        var move = function(x, y) {
            var access = field.access(x, y);
            if (access == 'death') {
                self.gameOver('You lose');
                return false;
            }

            if (access) {
                player.x = x;
                player.y = y;

                var changes = {
                    player: {
                        x: player.x,
                        y: player.y
                    }
                }

                var bonus = function(type) {
                    player[type]++;
                    changes.player[type] = player[type];
                    field.removeBonus(player.x, player.y);
                    changes.field = {
                        removeBonus: {
                            x: player.x,
                            y: player.y
                        }
                    };
                };

                switch (access) {
                    case 'bombBonus':
                        bonus('bombCount');
                        break;
                    case 'speedBonus':
                        bonus('speed');
                        break;
                    case 'fireBonus':
                        bonus('fire');
                        break;
                }
                self.fireEvent(changes);
            }
        };

        var keyCode = key.charCode ? key.charCode : key.keyCode ? key.keyCode : 0;

        switch (keyCode) {
            case 37: //left
                key.preventDefault();

                if (player.x > 0) {
                    move(player.x - 1, player.y);
                }

                break;
            case 38: //up
                key.preventDefault();

                if (player.y > 0) {
                    move(player.x, player.y -1);

                }
                break;
            case 39: //right
                key.preventDefault();

                if (player.x < self.width - 1) {
                    move(player.x + 1, player.y);
                }

                break;
            case 40: //down;
                key.preventDefault();

                if (player.y < self.height - 1) {
                    move(player.x, player.y + 1);
                }
                break;
            case 32: //space
                key.preventDefault();

                var bombX = player.x,
                    bombY = player.y;

                if (player.addBomb(player.x, player.y)) {
                    setTimeout(
                        function() {
                            player.removeBomb(bombX, bombY);
                            var fires = field.explosion(bombX, bombY, player.fire, self.fireEvent);

                            self.fireEvent(
                                {
                                    player: {
                                        bombs: player.bombs
                                    },
                                    field: {
                                        explosion: {
                                            x: bombX,
                                            y: bombY
                                        }
                                    }
                                },
                                fires
                            );
                        },
                        1000
                    );
                    self.fireEvent({
                        player: {
                            bombs: player.bombs
                        }
                    });
                }
                break;
        }
    };

    this.fireEvent = function(params, fires) {
        self.socket.send(
            JSON.stringify(
                {
                    action: 'render',
                    params: params
                }
            )
        );
        self.render(fires);
    };

    this.gameOver = function(resultText) {
        alert(resultText);
        //$('body').unbind('keydown');
    };
};
Bomberman.prototype = Object.create(Base.prototype);
