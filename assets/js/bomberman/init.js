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
    var bomberman = new Bomberman({socket: socket, size: 32, width: 15, height: 15}).init();

    socket.onopen = function() {
        $('#ratchet-success').removeClass('hide');
        $('#ratchet-error').addClass('hide');
    };

    socket.onmessage = function(e) {
        var response = JSON.parse(e.data);

        if (response.action == bomberman.ACTION_SYSTEM) {
            $('#user-count').html('Online: ' + response.params.count);
            $('#open-games').html('');
            for (var i = 0; i < response.params.games.length; i++) {
                $('#open-games').append('<a id="' + response.params.games[i] + '-game" href="javascript:void(0);" class="btn btn-primary join">' + response.params.games[i] + '</a>');
            }
        } else if (response.action == bomberman.ACTION_JOIN) {
            bomberman.start(response.params);
            $('#games').slideUp();
            $('#field').slideDown();
            $('#create-game').removeClass('cancel').addClass('create').html('Create');
            $('#open-games').addClass('ready');
        } else if (response.action == bomberman.ACTION_RENDER) {
            if (typeof response.params !== 'undefined') {
                bomberman.update(response.params);
            }
        } else if (response.action == bomberman.ACTION_DISCONNECT) {
            bomberman.gameOver(bomberman.WIN_MESSAGE);
        }
    };

    // popups
    $('#game-over-popup').on('hidden', function () {
        $('#field').slideUp();
        $('#games').slideDown();

    });
    $('#create-game-submit').click(function(e) {
        e.preventDefault();

        socket.send(JSON.stringify({action: bomberman.ACTION_CREATE, params: {width: $('#field-width').val(), height: $('#field-height').val()}}));
        bomberman.setPlayer(0);
        $('#create-game').removeClass('create').addClass('cancel').html('Cancel');
        $('#open-games').removeClass('ready');
        $('#create-game-popup').modal('hide');

        return false;
    });

    // login part
    $('#register-name').keypress(function(key) {
        if (key.keyCode == 13) { // enter key
            var input = $('#register-name');
            if (input.val().length > 0) {
                socket.send(JSON.stringify({action: bomberman.ACTION_LOGIN, params: {name: input.val()}}));
                $('.register').slideUp();
                $('.content').slideDown();
            }
        }
    });


    // games
    $('#create-game').click(function(e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('create')) {
            //$('#create-game-popup').modal({});

            socket.send(JSON.stringify({action: bomberman.ACTION_CREATE, params: {width: $('#field-width').val(), height: $('#field-height').val()}}));
            bomberman.setPlayer(0);
            $('#create-game').removeClass('create').addClass('cancel').html('Cancel');
            $('#open-games').removeClass('ready');
        } else if($this.hasClass('cancel')) {
            socket.send(JSON.stringify({action: bomberman.ACTION_CANCEL, params: {}}));
            $this.removeClass('cancel').addClass('create').html('Create');
            $('#open-games').addClass('ready');
        }
        return false;
    });

    $('#open-games.ready .join').live('click', function(e) {
        e.preventDefault();
        socket.send(JSON.stringify({action: bomberman.ACTION_JOIN, params: {game: $(this).attr('id'), width: bomberman.width, height: bomberman.height}}));
        bomberman.setPlayer(1);
        return false;
    });
});