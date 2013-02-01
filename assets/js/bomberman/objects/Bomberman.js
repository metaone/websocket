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
    var go = true;

    this.socket = this.clearParam('socket');
    this.size   = this.clearParam('size', 32);
    this.width  = this.clearParam('width', 15);
    this.height = this.clearParam('height', 15);


    this.canvas = (function() {
        var c = document.getElementById("canvas");

        c.width  = self.width * self.size;
        c.height = self.height * self.size;
        c.style.width  = self.width * self.size + 'px';
        c.style.height = self.height * self.size + 'px';

        return document.getElementById("canvas").getContext("2d");
    })();

    var field = new FieldRender({
        canvas: this.canvas,
        size: this.size,
        width: this.width,
        height: this.height
    });

    var firstPlayer = new PlayerRender({
        canvas: this.canvas,
        sprite: 'assets/img/player.png',
        initCallback: function(){}
    });
    var secondPlayer = new PlayerRender({
        canvas: this.canvas,
        x: this.width - 1,
        y: this.height - 1,
        sprite: 'assets/img/monster.png',
        initCallback: function(){}
    });

    var player, opponent;
    /**
     * Sets player role
     * @param number
     * @return {*}
     */
    this.setPlayer = function (number) {
        player   = number ? secondPlayer : firstPlayer;
        opponent = number ? firstPlayer  : secondPlayer;
        return self;
    }

    /**
     * Render
     * @param fires
     * @return {*}
     */
    this.render = function(fires) {
        if (go) {
            field.render();

            opponent.render();
            player.render();

            var first = false, second = false;
            if (typeof fires !== 'undefined') {
                for (var i = 0; i < fires.length; i++) {
                    if (fires[i].x == player.x && fires[i].y == player.y) {
                        first = this.LOSE_MESSAGE;
                    }

                    if (fires[i].x == opponent.x && fires[i].y == opponent.y) {
                        second = this.WIN_MESSAGE;
                    }
                }

                if (first || second) {
                    var result;
                    if (first && second) {
                        result = this.DRAW_MESSAGE;
                    } else {
                        result = first ? first : second;
                    }
                    this.gameOver(result);
                }
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

    /**
     * Init
     * @return {*}
     */
    this.init = function() {
        field.init();
        firstPlayer.init();
        secondPlayer.init();

        return self;
    }

    /**
     * Starts game
     * @param params
     * @return {*}
     */
    this.start = function(params) {
        go = true;
        field.setMatrix(params.field);
        $('body').keydown(keysBind);
        self.render();
        return self;
    };

    /**
     * Updates field with given changes
     * @param params
     * @return {*}
     */
    this.update = function(params) {

        // update opponent
        if (typeof params.player !== 'undefined') {
            (function(values) {
                for (var i = 0; i< values.length; i++) {
                    if (typeof params.player[values[i]] !== 'undefined') {
                        opponent[[values[i]]] = params.player[[values[i]]];
                    }
                }
            })(['x', 'y', 'bombs', 'bombCount', 'speed', 'fire']);
        }

        // update cells
        if (typeof params.field !== 'undefined') {
            if (typeof params.field.explosion !== 'undefined') {
                var fires = field.explosion(
                    params.field.explosion.x,
                    params.field.explosion.y,
                    opponent.fire,
                    this.actionEvent
                );
            }

            if (typeof params.field.removeBonus !== 'undefined') {
                field.removeBonus(params.field.removeBonus.x, params.field.removeBonus.y);
            }
        }

        // game result
        if (typeof params.result !== 'undefined') {
            this.gameOver(params.result);
        }

        self.render(fires);
        return self;
    }

    /**
     * Game keys actions
     * @param key
     */
    var keysBind = function(key) {
        var move = function(x, y) {
            var access = field.access(x, y);
            if (access == self.ACTION_DEATH) {
                self.socket.send(JSON.stringify({action: self.ACTION_RENDER, params: {result: self.WIN_MESSAGE}}));
                self.gameOver(self.LOSE_MESSAGE);
                return false;
            }

            if (access) {
                player.x = x;
                player.y = y;

                var changes = {player: {x: player.x, y: player.y}};
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
                    case self.BONUS_BOMB:
                        bonus('bombCount');
                        break;
                    case self.BONUS_SPEED:
                        bonus('speed');
                        break;
                    case self.BONUS_FIRE:
                        bonus('fire');
                        break;
                }
                self.actionEvent(changes);
            }
            return true;
        };

        switch (key.charCode ? key.charCode : key.keyCode ? key.keyCode : 0) {
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
                            var fires = field.explosion(bombX, bombY, player.fire, self.actionEvent);

                            self.actionEvent(
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
                    self.actionEvent({
                        player: {
                            bombs: player.bombs
                        }
                    });
                }
                break;
        }
    };

    /**
     * Any action event
     * Send changes to opponent and render changes
     * @param params
     * @param fires
     */
    this.actionEvent = function(params, fires) {
        self.socket.send(JSON.stringify({action: self.ACTION_RENDER, params: params}));
        self.render(fires);
    };

    /**
     * Game Over
     * @param resultText
     */
    this.gameOver = function(resultText) {
        go = false;

        self.socket.send(JSON.stringify({action: this.ACTION_FINISH, params: {}}));

        $('#game-over-popup').find('.modal-body p').html(resultText);
        $('#game-over-popup').modal('show');

        $('body').unbind('keydown');
    };
};
Bomberman.prototype = Object.create(Base.prototype);
