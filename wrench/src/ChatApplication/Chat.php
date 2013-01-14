<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/14/13
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */
namespace ChatApplication;

use Wrench\Application\Application;
use Wrench\Application\NamedApplication;

class Chat extends Application
{
    protected $_clients = array();

    public function onConnect($client)
    {
        if ($client) {
            echo PHP_EOL;
            var_dump($client);
            echo PHP_EOL;
            $this->_clients[] = $client;
        }
    }

    /**
     * @see Wrench\Application.Application::onData()
     */
    public function onData($data, $client)
    {
        foreach ($this->_clients as $conn) {
            $conn->send($data);
        }
        //$client->send($data);
    }
}
