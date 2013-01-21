/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/21/13
 * Time: 1:10 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {
    if (typeof window.config.socket == 'undefined') {
        throw 'App error: No socket configured!';
    }

    // init socket
    var socket = new WebSocket(window.config.socket);
    socket.onopen = function(e) {
        $('#ratchet-success').removeClass('hide');
        $('#ratchet-error').addClass('hide');
    };
    socket.onmessage = function(e) {
        $('#ratchet-message-box').append('<p>' + JSON.parse(e.data)  + '</p>');
    };

    $('#ratchet-message').keypress(function(e) {
        if(e.which == 13) {
            socket.send(
                JSON.stringify(
                    {
                        action: 'message',
                        params: {
                            text: $('#ratchet-message').val()
                        }
                    }
                )
            );
            $('#ratchet-message').val('').blur();
        }
    });


    // login part
    $('#register-name').keypress(function(key) {
        var input = $('#register-name');
        if (key.keyCode == 13) {
            if (input.val().length > 0) {
                socket.send(
                    JSON.stringify(
                        {
                            action: 'login',
                            params: {
                                name: input.val()
                            }
                        }
                    )
                );
                $('.register').hide();
                $('.content').show();
            }
        }
    });

    // canvas
    var c = document.getElementById("canvas");
    var canvas = c.getContext("2d");

    var field = {
        width: 800,
        height:480
    }

    // player
    var player = {
        speed: 32,
        x: 0,
        y: 0,
        width: 32,
        height: 32
    }

    var playerImage = new Image();
    playerImage.onload = function () {
        playerRender();
    };
    playerImage.src = "http://websocket.local/assets/img/player.png";


    window.playerRender = function() {
        canvas.clearRect(0, 0, field.width, field.height);
        canvas.fillStyle="#333333";
        canvas.fillRect(0, 0, field.width, field.height);
        canvas.drawImage(playerImage, player.x, player.y);
    }

    $('body').keypress(function(key) {
        switch (key.keyCode) {
            case 37: //left
                key.preventDefault();
                if (player.x < player.width) {
                    player.x = 0;
                } else {
                    player.x -= player.speed;
                }
                break;
            case 38: //up
                key.preventDefault();
                if (player.y < player.height) {
                    player.y = 0;
                } else {
                    player.y -= player.speed;
                }
                break;
            case 39: //right
                key.preventDefault();
                if (field.width - player.x <= player.width) {
                    player.x = field.width - player.width;
                } else {
                    player.x += player.speed;
                }
                //console.log(player.x);
                break;
            case 40: //down;
                key.preventDefault();
                if (field.height - player.y <= player.height) {
                    player.y = field.height - player.height;
                } else {
                    player.y += player.speed;
                }
        }
        playerRender();
    });
});