/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/23/13
 * Time: 6:25 PM
 * To change this template use File | Settings | File Templates.
 */

var PlayerRender = function(config) {
    BaseRender.apply(this, arguments);
    //console.log(this);

    var self = this;
    var bombs = [];
    var bombCount = 2;

    try {
        var speed = config.speed;
        var width = config.width;
        var height = config.height;
    } catch (e) {
        console.log('PlayerRender initialization error: ' + e);
    }

    this.render = function() {
        BaseRender.prototype.render.call(this, arguments);
    };

    this.setBombIncrement = function() {
        bombCount++;
    };
    this.setBomb = function() {
        if (bombs.length < bombCount) {

        }
    };

    this.getSpeed = function() {
        return speed;
    }
    this.getWidth = function() {
        return width;
    };
    this.getHeight = function() {
        return height;
    };

    this.setSpeed = function(value) {
        speed = value;
        return this;
    }
    this.setWidth = function(value) {
        width = value;
        return this;
    };
    this.setHeight = function(value) {
        height = value;
        return this;
    };
};
PlayerRender.prototype = Object.create(BaseRender.prototype);
/*PlayerRender.prototype.render = function() {
    BaseRender.prototype.render.call(this);
    console.log('render');
};*/
