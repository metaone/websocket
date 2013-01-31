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
    // socket message action
    const ACTION = 'action';
    // actions types
    const ACTION_SYSTEM     = 'system';         // system messages
    const ACTION_LOGIN      = 'login';          // user login
    const ACTION_RENDER     = 'render';         // render game frame
    const ACTION_CREATE     = 'create';         // create game
    const ACTION_CANCEL     = 'cancel';         // cancel game
    const ACTION_JOIN       = 'join';           // join game
    const ACTION_FINISH     = 'finish';         // game over
    const ACTION_DISCONNECT = 'disconnect'; // player disconnect

    // socket message parameters
    const PARAMS = 'params';
    // params types
    const PARAM_COUNT    = 'count';    // connections count
    const PARAM_NAME     = 'name';     // username
    const PARAM_OPPONENT = 'opponent'; // opponent
    const PARAM_FIELD    = 'field';    // game field

    // field cell params
    const CELL_TYPE  = 'type';  // cell type
    const CELL_BONUS = 'bonus'; // bonus inside cell
    const CELL_WALL  = 'wall';  // wall cell type
    const CELL_BRICK = 'brick'; // wall brick type

    // cell bonuses
    protected $_bonuses = array('bombBonus', 'fireBonus');


    // active connections
    protected $_connections;

    // games list
    protected $_games = array();

    /**
     * Constructor
     */
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
        $this->_sendResponseToALL(self::ACTION_SYSTEM, array(self::PARAM_COUNT => count($this->_connections)));
    }

    /**
     * @param \Ratchet\ConnectionInterface $conn
     * @return void
     */
    public function onClose(ConnectionInterface $conn)
    {
        $this->_gameCancel($conn);

        $this->_connections->detach($conn);
        $this->_sendResponseToALL(self::ACTION_SYSTEM, array(self::PARAM_COUNT => count($this->_connections)));
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

    /**
     * @param \Ratchet\ConnectionInterface $conn
     * @param $msg
     * @return void
     */
    public function onMessage(ConnectionInterface $conn, $msg)
    {
        $response = json_decode($msg);

        switch($response->action) {
            case self::ACTION_LOGIN:
                $conn->Session->set(self::PARAM_NAME, $response->params->name);
                break;
            case self::ACTION_CREATE:
                $creator = $conn->Session->get(self::PARAM_NAME);
                $this->_games[$creator] = $conn;
                $this->_sendResponseToALL(self::ACTION_CREATE, array(self::PARAM_NAME => $creator));
                break;
            case self::ACTION_CANCEL:
                $this->_gameCancel($conn);
                break;
            case self::ACTION_JOIN:
                $creator = $this->_games[substr($response->params->game, 0, strlen($response->params->game) - 5)];

                $creator->Session->set(self::PARAM_OPPONENT, $conn);
                $conn->Session->set(self::PARAM_OPPONENT, $creator);

                $field = $this->_generateField($response->params->width, $response->params->height);
                $this->_sendResponse($creator, self::ACTION_JOIN, array(self::PARAM_FIELD => $field));
                $this->_sendResponse($conn, self::ACTION_JOIN, array(self::PARAM_FIELD => $field));

                $this->_gameCancel($creator);
                break;
            case self::ACTION_RENDER:
                $this->_sendResponse($conn->Session->get(self::PARAM_OPPONENT), self::ACTION_RENDER, $response->params);
                break;

        }
    }

    /**
     * Generates field matrix
     * @param int $width
     * @param int $height
     * @return array
     */
    private function _generateField($width, $height)
    {
        $res = array();

        for ($i = 0; $i < $width; $i++) {
            for ($j = 0; $j < $height; $j++) {
                if ($i % 2 != 0 && $j % 2 != 0) { // add walls
                    $res[$i][$j] = array(self::CELL_TYPE => self::CELL_WALL);
                } else {
                    if (
                        ($j == 0 && $i < 2) || ($i == 0 && $j < 2) || // reserve space for top player
                        ($j == $height - 1 && $i > $width - 3) || ($i == $width - 1 && $j > $height - 3) // reserve space for bottom player
                    ) {
                        $res[$i][$j] = false;
                    } else {
                        if (rand(0, 1)) { // generate rest field cells
                            if (rand(0, 100) <= 10) {
                                $res[$i][$j] = array(self::CELL_TYPE => self::CELL_BRICK, self::CELL_BONUS => $this->_bonuses[rand(0,1)]);
                            } else {
                                $res[$i][$j] = array(self::CELL_TYPE => self::CELL_BRICK);
                            }

                        } else {
                            $res[$i][$j] = false;
                        }
                    }
                }
            }
        }

        return $res;
    }

    /**
     * Cancel game
     * @param \Ratchet\ConnectionInterface $conn
     */
    protected function _gameCancel(ConnectionInterface $conn)
    {
        $creator = $conn->Session->get(self::PARAM_NAME);
        unset($this->_games[$creator]);
        $this->_sendResponseToALL(self::ACTION_CANCEL, array(self::PARAM_NAME => $creator));
    }

    /**
     * Sends message to saved connections
     * @param string $action
     * @param array $params
     * @param array $exclude
     */
    protected function _sendResponseToALL($action, $params, $exclude = array())
    {
        foreach($this->_connections as $connection) {
            if (!in_array($connection, $exclude)) {
                $this->_sendResponse($connection, $action, $params);
            }
        }
    }

    protected function _sendResponse(ConnectionInterface $conn, $action, $params)
    {
        $conn->send(json_encode(array(self::ACTION => $action, self::PARAMS => $params)));
    }
}