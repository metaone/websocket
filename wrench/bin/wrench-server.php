<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/4/13
 * Time: 1:21 PM
 * To change this template use File | Settings | File Templates.
 */
use \Wrench\Server;
use \Wrench\Application\EchoApplication;
use \ChatApplication\Chat;

require dirname(__DIR__) . '/vendor/autoload.php';

$server = new \Wrench\Server(
    'ws://192.168.98.102:8000/',
    array(
        'allowed_origins' => array('*')
    )
);

$server->registerApplication('chat', new Chat());
$server->run();