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

    protected $_actions = array(
        'login',
        'message',
    );

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
        $this->_connections->attach($conn);
    }

    /**
     * @param \Ratchet\ConnectionInterface $from
     * @param $msg
     * @return void
     */
    public function onMessage(ConnectionInterface $from, $msg)
    {
        $response = json_decode($msg);
        if (in_array($response->action, $this->_actions)) {
            $this->{$response->action}($from, $response->params);
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


    public function login(ConnectionInterface $conn, $params)
    {
        $conn->Session->set('name', $params->name);
        foreach($this->_connections as $client) {
            $client->send(json_encode('<b>' . $params->name . '</b> appears online.'));
        }
    }

    public function message(ConnectionInterface $conn, $params)
    {
        foreach($this->_connections as $client) {
            $client->send(json_encode('<b>' .$conn->Session->get('name') . ':</b> ' . $params->text));
        }
    }
}