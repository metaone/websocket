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
use WebSocket\Bomberman;
use Ratchet\Session\SessionProvider;
use Symfony\Component\HttpFoundation\Session\Storage\Handler;

require dirname(__DIR__) . '/vendor/autoload.php';

$memcache = new Memcache();
$memcache->connect('localhost', 11211);

$session = new SessionProvider(
    new Bomberman(),
    new Handler\MemcacheSessionHandler($memcache)
);

// Make sure to run as root
$server = IoServer::factory(new WsServer($session), 8000);
$server->run();