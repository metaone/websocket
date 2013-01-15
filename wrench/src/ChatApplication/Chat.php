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
    // active connections
    protected $_connections;

    /**
     * Construct
     * @return void
     */
    public function __construct()
    {
        $this->_connections = new \SplObjectStorage();
    }

    /**
     * @param $connection
     * @return void
     */
    public function onConnect($connection)
    {
        $this->_connections->attach($connection);
    }

    /**
     * @param $connection
     * @return void
     */
    public function onDisconnect($connection)
    {
        $this->_connections->detach($connection);
    }

    /**
     * @see Wrench\Application.Application::onData()
     */
    public function onData($data, $connection)
    {
        foreach ($this->_connections as $conn) {
            $conn->send($data);
        }
    }
}
