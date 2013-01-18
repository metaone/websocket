<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/4/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
namespace WebSocket;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

/**
 * Chat Class
 */
class Chat implements MessageComponentInterface
{
    // active connections
    protected $_connections;
    protected $_games;

    public function __construct()
    {
        $this->_connections = new \SplObjectStorage;
    }

    /**
     * @param \Ratchet\ConnectionInterface $conn
     * @return void
     */
    public function onOpen(ConnectionInterface $conn)
    {
        var_dump('add connection\n');
        $this->_connections->attach($conn);
    }

    /**
     * @param \Ratchet\ConnectionInterface $from
     * @param $msg
     * @return void
     */
    public function onMessage(ConnectionInterface $from, $msg)
    {
        foreach ($this->_connections as $client) {
            var_dump($msg);
            $client->send($msg);
        }
    }

    /**
     * @param \Ratchet\ConnectionInterface $conn
     * @return void
     */
    public function onClose(ConnectionInterface $conn)
    {
        $this->_connections->detach($conn);
    }

    /**
     * @param \Ratchet\ConnectionInterface $conn
     * @param \Exception $e
     * @return void
     */
    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}