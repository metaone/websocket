/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/23/13
 * Time: 6:22 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Base render object
 * @param config = {
 *     x: 0,
 *     y: 0,
 *     sprite: 'img.png',
 *     canvas: canvas,
 *     initCallback: function(){}
 * }
 */

var BaseRender = function(config) {
    Base.apply(this, arguments);

    var self = this;

    this.image = false;

    this.x = this.clearParam('x', 0);
    this.cellSize = this.clearParam('cellSize', 32);
    this.y = this.clearParam('y', 0);
    this.sprite = this.clearParam('sprite');
    this.canvas = this.clearParam('canvas');
    this.initCallback = this.clearParam('initCallback');

    this.init = function() {
        this.image = new Image();
        if (typeof this.initCallback === 'function') {
            this.image.onload = this.initCallback;
        }
        this.image.src = this.sprite;
        return self;
    };

    this.render = function() {
        this.canvas.drawImage(this.image, this.x * this.cellSize, this.y * this.cellSize);
        return self;
    }

};
BaseRender.prototype = Object.create(Base.prototype);