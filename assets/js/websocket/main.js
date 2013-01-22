/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/21/13
 * Time: 1:10 PM
 * To change this template use File | Settings | File Templates.
 */

var gameObject = function(params) {
    var self = this;

    var field = {
        width: 800,
        height:480
    }

    var players = {
        0: {
            speed: 32,
            x: 0,
            y: 0,
            width: 32,
            height: 32
        },
        1: {
            speed: 32,
            x: field.width - 32,
            y: field.height - 32,
            width: 32,
            height: 32
        }
    };



    var playerNumber = false;

    this.setPlayer = function (number) {
        playerNumber = number;
        return this;
    }

    var socket = false;
    this.setSocket = function (sock) {
        socket = sock;
        return this;
    }

    // canvas
    var canvas = document.getElementById("canvas").getContext("2d");

    this.render = function() {
        canvas.clearRect(0, 0, field.width, field.height);
        canvas.fillStyle = "#333333";
        canvas.fillRect(0, 0, field.width, field.height);
        canvas.drawImage(self.playerImage, players[0].x, players[0].y)
        canvas.drawImage(self.player1Image, players[1].x, players[1].y);
    };


    var load = function() {
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
                $('body').keypress(keysBind);
                self.render();
            }
        };
    }


    this.init = function() {
        var loader = new load();

        self.playerImage = new Image();
        self.playerImage.onload = function () {
            loader.playerReady().init();
        };
        self.playerImage.src = "assets/img/player.png";

        self.player1Image = new Image();
        self.player1Image.onload = function () {
            loader.player1Ready().init();
        };
        self.player1Image.src = "assets/img/monster.png";
    }

    var keysBind = function(key) {
        switch (key.keyCode) {
            case 37: //left
                key.preventDefault();
                if (players[playerNumber].x < players[playerNumber].width) {
                    players[playerNumber].x = 0;
                } else {
                    players[playerNumber].x -= players[playerNumber].speed;
                }
                break;
            case 38: //up
                key.preventDefault();
                if (players[playerNumber].y < players[playerNumber].height) {
                    players[playerNumber].y = 0;
                } else {
                    players[playerNumber].y -= players[playerNumber].speed;
                }
                break;
            case 39: //right
                key.preventDefault();
                if (field.width - players[playerNumber].x <= players[playerNumber].width) {
                    players[playerNumber].x = field.width - players[playerNumber].width;
                } else {
                    players[playerNumber].x += players[playerNumber].speed;
                }
                break;
            case 40: //down;
                key.preventDefault();
                if (field.height - players[playerNumber].y <= players[playerNumber].height) {
                    players[playerNumber].y = field.height - players[playerNumber].height;
                } else {
                    players[playerNumber].y += players[playerNumber].speed;
                }
        }
        socket.send(
            JSON.stringify(
                {
                    action: 'render',
                    params: {
                        player: {
                            x: players[playerNumber].x,
                            y: players[playerNumber].y
                        }
                    }
                }
            )
        );
        self.render();
    };

    this.update = function(params) {
        players[playerNumber].x = params.x;
        players[playerNumber].y = params.y;
        self.render();
    }
};
