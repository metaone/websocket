/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/15/13
 * Time: 1:52 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {
    if (typeof window.config.socket == 'undefined') {
        throw 'App error: No socket configured!';
    }

    var ratchet = new WebSocket(window.config.socket);
    ratchet.onopen = function(e) {
        $('#ratchet-success').removeClass('hide');
        $('#ratchet-error').addClass('hide');
    };
    ratchet.onmessage = function(e) {
        $('#ratchet-message-box').append('<p>' + e.data + '</p>');
    };

    $('#ratchet-message').keypress(function(e) {
        if(e.which == 13) {
            console.log($('#ratchet-message').val());
            ratchet.send($('#ratchet-message').val());
            $('#ratchet-message').val('').blur();
        }
    });
});

