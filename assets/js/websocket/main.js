/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/21/13
 * Time: 1:10 PM
 * To change this template use File | Settings | File Templates.
 */

var socketPusher = function(socket) {

};

/**
 * Base render object
 * @param options = {
 *     x: 0,
 *     y: 0,
 *     sprite: 'img.png',
 *     canvas: canvas,
 *     initCallback: function(){}
 * }
 */
var baseObject = function(options) {
    var self = this;
    var x, y, sprite, canvas, image, initCallback;


    this.getX = function() {
        return x;
    };
    this.getY = function() {
        return y;
    };
    this.setX = function(value) {
        x = value;
        return self;
    };
    this.setY = function(value) {
        y = value;
        return self;
    };

    this.init = function() {
        image = new Image();
        if (typeof initCallback === 'function') {
            image.onload = initCallback;
        }
        image.src = sprite;
        return self;
    };

    this.render = function() {
        canvas.drawImage(image, x, y);
        return self;
    };

    if (typeof options !== 'undefined') {
        x = options.x;
        y = options.y;
        sprite = options.sprite;
        canvas = options.canvas;
        initCallback = options.initCallback;
    }

};

var playerObject = function(options) {
    baseObject.apply(this, arguments);

    var self = this;

    var speed, width, height;

    this.getSpeed = function() {
        return speed;
    }
    this.getWidth = function() {
        return width;
    };
    this.getHeight = function() {
        return height;
    };

    this.setSpeed = function(value) {
        speed = value;
        return this;
    }
    this.setWidth = function(value) {
        width = value;
        return this;
    };
    this.setHeight = function(value) {
        height = value;
        return this;
    };

    if (typeof options !== 'undefined') {
        speed = options.speed;
        width = options.width;
        height = options.height;
    }
};
playerObject.prototype = new baseObject();



var gameObject = function(params) {
    var self = this;
    // canvas
    var canvas = document.getElementById("canvas").getContext("2d");

    var field = {
        width: 800,
        height:480
    }

    var firstPlayer = new playerObject(
        {
            x: 0,
            y: 0,
            canvas: canvas,
            sprite: 'assets/img/player.png',
            initCallback: function(){},
            speed: 32,
            width: 32,
            height: 32
        }
    );
    var secondPlayer  = new playerObject(
        {
            x: field.width - 32,
            y: field.height - 32,
            canvas: canvas,
            sprite: 'assets/img/monster.png',
            initCallback: function(){},
            speed: 32,
            width: 32,
            height: 32
        }
    );

    var player = false;
    var opponent = false;

    this.setPlayer = function (number) {
        player = number ? secondPlayer : firstPlayer;
        opponent = number ? firstPlayer : secondPlayer;
        return self;
    }

    var socket = false;
    this.setSocket = function (sock) {
        socket = sock;
        return self;
    }


    this.render = function() {
        canvas.clearRect(0, 0, field.width, field.height);
        canvas.fillStyle = "#333333";
        canvas.fillRect(0, 0, field.width, field.height);

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
        player.init();
        opponent.init();
    }

    var keysBind = function(key) {
        switch (key.keyCode) {
            case 37: //left
                key.preventDefault();
                if (player.getX() < player.getWidth()) {
                    player.setX(0);
                } else {
                    player.setX(player.getX() - player.getSpeed());
                }
                break;
            case 38: //up
                key.preventDefault();
                if (player.getY() < player.getHeight()) {
                    player.setY(0);
                } else {
                    player.setY(player.getY() - player.getSpeed());
                }
                break;
            case 39: //right
                key.preventDefault();
                if (field.width - player.getX() <= player.getWidth()) {
                    player.setX(field.width - player.getWidth());
                } else {
                    player.setX(player.getX() + player.getSpeed());
                }
                break;
            case 40: //down;
                key.preventDefault();
                if (field.height - player.getY() <= player.getHeight()) {
                    player.setY(field.height - player.getHeight());
                } else {
                    player.setY(player.getY() + player.getSpeed());
                }
        }
        socket.send(
            JSON.stringify(
                {
                    action: 'render',
                    params: {
                        player: {
                            x: player.getX(),
                            y: player.getY()
                        }
                    }
                }
            )
        );
        self.render();
    };

    this.start = function() {
        $('body').keypress(keysBind);
        self.render();
        return self;
    };

    this.update = function(params) {
        opponent.setX(params.x);
        opponent.setY(params.y);
        self.render();
        return self;
    }
};
