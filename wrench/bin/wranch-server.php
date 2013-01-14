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

$server = new \Wrench\Server('ws://192.168.98.102:8000/', array(
    'allowed_origins'            => array(
        'mysite.localhost',
        '192.168.98.1',
        '*',
    ),
// Optional defaults:
//     'check_origin'               => true,
//     'connection_manager_class'   => 'Wrench\ConnectionManager',
//     'connection_manager_options' => array(
//         'timeout_select'           => 0,
//         'timeout_select_microsec'  => 200000,
//         'socket_master_class'      => 'Wrench\Socket\ServerSocket',
//         'socket_master_options'    => array(
//             'backlog'                => 50,
//             'ssl_cert_file'          => null,
//             'ssl_passphrase'         => null,
//             'ssl_allow_self_signed'  => false,
//             'timeout_accept'         => 5,
//             'timeout_socket'         => 5,
//         ),
//         'connection_class'         => 'Wrench\Connection',
//         'connection_options'       => array(
//             'socket_class'           => 'Wrench\Socket\ServerClientSocket',
//             'socket_options'         => array(),
//             'connection_id_secret'   => 'asu5gj656h64Da(0crt8pud%^WAYWW$u76dwb',
//             'connection_id_algo'     => 'sha512'
//         )
//     )
));

$server->registerApplication('chat', new Chat());
//$server->registerApplication('echo', new \Wrench\Application\EchoApplication());
$server->run();