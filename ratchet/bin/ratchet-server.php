<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/4/13
 * Time: 1:21 PM
 * To change this template use File | Settings | File Templates.
 */
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use WebSocket\Chat;

require dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(
    new WsServer(
        new Chat()
    ),
    8080
);

$server->run();