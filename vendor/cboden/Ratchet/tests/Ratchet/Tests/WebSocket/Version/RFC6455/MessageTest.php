<?php
namespace Ratchet\Tests\WebSocket\Version\RFC6455\Message;
use Ratchet\WebSocket\Version\RFC6455\Message;
use Ratchet\WebSocket\Version\RFC6455\Frame;

/**
 * @covers Ratchet\WebSocket\Version\RFC6455\Message
 */
class MessageTest extends \PHPUnit_Framework_TestCase {
    protected $message;

    public function setUp() {
        $this->message = new Message;
    }

    public function testNoFrames() {
        $this->assertFalse($this->message->isCoalesced());
    }

    public function testNoFramesOpCode() {
        $this->setExpectedException('UnderflowException');
        $this->message->getOpCode();
    }

    public function testFragmentationPayload() {
        $a = 'Hello ';
        $b = 'World!';

        $f1 = new Frame($a, false);
        $f2 = new Frame($b, true, Frame::OP_CONTINUE);

        $this->message->addFrame($f1)->addFrame($f2);

        $this->assertEquals(strlen($a . $b), $this->message->getPayloadLength());
        $this->assertEquals($a . $b, $this->message->getPayload());
    }

    public function testUnbufferedFragment() {
        $this->message->addFrame(new Frame('The quick brow', false));

        $this->setExpectedException('UnderflowException');
        $this->message->getPayload();
    }

    public function testGetOpCode() {
        $this->message
            ->addFrame(new Frame('The quick brow', false, Frame::OP_TEXT))
            ->addFrame(new Frame('n fox jumps ov', false, Frame::OP_CONTINUE))
            ->addFrame(new Frame('er the lazy dog', true, Frame::OP_CONTINUE))
        ;

        $this->assertEquals(Frame::OP_TEXT, $this->message->getOpCode());
    }

    public function testGetUnBufferedPayloadLength() {
        $this->message
            ->addFrame(new Frame('The quick brow', false, Frame::OP_TEXT))
            ->addFrame(new Frame('n fox jumps ov', false, Frame::OP_CONTINUE))
        ;

        $this->assertEquals(28, $this->message->getPayloadLength());
    }
}