/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/15/13
 * Time: 1:52 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {
    var wrench = new WebSocket('ws://192.168.98.102:8000/chat');
    wrench.onopen = function(e) {
        $('#wrench-success').removeClass('hide');
        $('#wrench-error').addClass('hide');
    };
    wrench.onmessage = function(e) {
        $('#wrench-message-box').append('<p>' + JSON.parse(e.data) + '</p>');
    };
    $('#wrench-message').keypress(function(e) {
        if(e.which == 13) {
            wrench.send(JSON.stringify($('#wrench-message').val()));
            $('#wrench-message').val('').blur();
        }
    });

    var ratchet = new WebSocket('ws://192.168.98.102:8080');
    ratchet.onopen = function(e) {
        $('#ratchet-success').removeClass('hide');
        $('#ratchet-error').addClass('hide');
    };
    ratchet.onmessage = function(e) {
        $('#ratchet-message-box').append('<p>' + e.data + '</p>');
    };

    $('#ratchet-message').keypress(function(e) {
        if(e.which == 13) {
            ratchet.send($('#ratchet-message').val());
            $('#ratchet-message').val('').blur();
        }
    });
});

