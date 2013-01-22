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
 * Bomberman Class
 */
class Bomberman implements MessageComponentInterface
{
    // active connections
    protected $_clients;
    protected $_games = array();

    protected $_actions = array(
        'login',
        'message',
        'create',
        'cancel',
        'join',
        'render',
    );

    public function __construct()
    {
        $this->_clients = new \SplObjectStorage;
    }

    /**
     * @param \Ratchet\ConnectionInterface $conn
     * @return void
     */
    public function onOpen(ConnectionInterface $conn)
    {
        $this->_clients->attach($conn);
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
        $this->_clients->detach($conn);
        $this->_sendResponse('users', array('count' => count($this->_clients)));
        $this->_sendResponse('message', array('text' => '<b>' . $conn->Session->get('name') . '</b> gone offline.'));

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

    public function create(ConnectionInterface $conn, $params)
    {
        $creator = $conn->Session->get('name');
        $this->_games[$creator] = array($conn);

        $this->_sendResponse('create', array('name' => $creator));
    }

    public function join(ConnectionInterface $conn, $params)
    {
        $game = substr($params->game, 0, strlen($params->game) - 5);
        $this->_games[$game][] = $conn;

    }

    public function cancel(ConnectionInterface $conn, $params)
    {
        $creator = $conn->Session->get('name');
        unset($this->_games[$creator]);

        $this->_sendResponse('cancel', array('name' => $creator));
    }

    public function render(ConnectionInterface $conn, $params)
    {
        $this->_sendResponse('render', array());
        foreach($this->_clients as $client) {
            if ($conn != $client) {
                $client->send(
                    json_encode(
                        array(
                            'action' => 'render',
                            'params' => $params
                        )
                    )
                );
            }
        }
    }

    public function login(ConnectionInterface $conn, $params)
    {
        $conn->Session->set('name', $params->name);
        $this->_sendResponse('users', array('count' => count($this->_clients)));
        $this->_sendResponse('message', array('text' => '<b>' . $params->name . '</b> appears online.'));
    }

    public function message(ConnectionInterface $conn, $params)
    {
        $this->_sendResponse('message', array('text' => '<b>' .$conn->Session->get('name') . ':</b> ' . $params->text));
    }

    protected function _sendResponse($action, $params)
    {
        foreach($this->_clients as $client) {
            $client->send(
                json_encode(
                    array(
                        'action' => $action,
                        'params' => $params
                    )
                )
            );
        }
    }
}