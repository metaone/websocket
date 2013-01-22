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
    socket.onopen = function(e) {
        $('#ratchet-success').removeClass('hide');
        $('#ratchet-error').addClass('hide');
    };

    socket.onmessage = function(e) {
        var response = JSON.parse(e.data);
        if (response.action == 'message') {
            $('#ratchet-message-box').append('<p>' + response.params.text  + '</p>');
        } else if(response.action == 'users') {
            $('#user-count').html('Online: ' + response.params.count);
        } else if(response.action == 'create') {
            $('#open-games').append(
                '<a id="' + response.params.name + '-game" href="javascript:void(0);" class="btn btn-primary join">' + response.params.name + '</a>'
            );
        } else if(response.action == 'join') {

        } else if(response.action == 'cancel') {
            console.log(response.action);
            $('#open-games').find('#' + response.params.name + '-game').remove();
        } else if(response.action == 'render') {
            //console.log(response);
            if (typeof response.params.player !== 'undefined') {
                /*player.x = response.params.player.x;
                player.y = response.params.player.y;*/
                game.update(response.params.player);
            }
            //game.render();
        }
    };

    var game = new gameObject({});
    game.setSocket(socket).setPlayer(0).init();





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

    // chat
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

    // games
    $('#create-game').click(function(e) {
        e.preventDefault();

        var $this = $(this);
        if ($this.hasClass('create')) {
            socket.send(
                JSON.stringify(
                    {
                        action: 'create',
                        params: {}
                    }
                )
            );
            $this.removeClass('create').addClass('cancel').html('Cancel');
        } else if($this.hasClass('cancel')) {
            socket.send(
                JSON.stringify(
                    {
                        action: 'cancel',
                        params: {}
                    }
                )
            );
            $this.removeClass('cancel').addClass('create').html('Create');
        }

    });

    $('#open-games .join').live('click', function(e) {
        e.preventDefault();

        socket.send(
            JSON.stringify(
                {
                    action: 'join',
                    params: {
                        game: $(this).attr('id')
                    }
                }
            )
        );

    });
});