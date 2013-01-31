/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/22/13
 * Time: 12:42 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {

    if (typeof window.config == 'undefined' || typeof window.config.socket == 'undefined') {
        window.config = {socket: 'ws://127.0.0.0:8000'};
    }

    // init socket
    var socket = new WebSocket(window.config.socket);

    socket.onopen = function() {
        $('#ratchet-success').removeClass('hide');
        $('#ratchet-error').addClass('hide');
    };

    socket.onmessage = function(e) {
        var response = JSON.parse(e.data);

        if (response.action == 'system') {
            $('#user-count').html('Online: ' + response.params.count);
        } else if(response.action == 'create') {
            $('#open-games').append(
                '<a id="' + response.params.name + '-game" href="javascript:void(0);" class="btn btn-primary join">' + response.params.name + '</a>'
            );
        } else if(response.action == 'join') {
            game.start(response.params);
        } else if(response.action == 'cancel') {
            $('#open-games').find('#' + response.params.name + '-game').remove();
            $('#create-game').removeClass('cancel').addClass('create').html('Create');
        } else if(response.action == 'render') {
            if (typeof response.params !== 'undefined') {
                game.update(response.params);
            }
        }
    };

    var game = new Bomberman({
        socket: socket,
        size: 32,
        width: 15,
        height: 15
    }).init();




    // login part
    $('#register-name').keypress(function(key) {
        var input = $('#register-name');

        if (key.keyCode == 13) { // enter key
            if (input.val().length > 0) {
                socket.send(
                    JSON.stringify({
                        action: 'login',
                        params: {
                            name: input.val()
                        }
                    })
                );
                $('.register').hide();
                $('.content').show();
            }
        }
    });


    // games
    $('#create-game').click(function(e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.hasClass('create')) {
            socket.send(
                JSON.stringify({
                    action: 'create',
                    params: {}
                })
            );
            game.setPlayer(0);
            $this.removeClass('create').addClass('cancel').html('Cancel');
        } else if($this.hasClass('cancel')) {
            socket.send(
                JSON.stringify({
                    action: 'cancel',
                    params: {}
                })
            );
            $this.removeClass('cancel').addClass('create').html('Create');
        }

        return false;
    });

    $('#open-games .join').live('click', function(e) {
        e.preventDefault();

        socket.send(
            JSON.stringify({
                action: 'join',
                params: {
                    game: $(this).attr('id'),
                    width: game.width,
                    height: game.height

                }
            })
        );

        game.setPlayer(1);

        return false;
    });
});