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
(function(parent) {
    var
    //self,
    //image,
        cellSize = 32,
        x,
        y,
        sprite,
        canvas,
        initCallback;

    var BaseRender = function(config) {
        var self = this;
        var image;

        this.test = 1;
        console.log(config.sprite);
        try {
            x = (typeof config.x === 'undefined') ? 0 : config.x;
            y = (typeof config.y === 'undefined') ? 0 : config.y;
            sprite = config.sprite;
            canvas = config.canvas;
            initCallback = config.initCallback;
        } catch (e) {
            console.log('BaseRender initialization error: ' + e);
        }
    };

    BaseRender.prototype.getX = function() {
        return x;
    };
    BaseRender.prototype.getY = function() {
        return y;
    };
    BaseRender.prototype.setX = function(value) {
        x = value;
        console.log(BaseRender.self);
        console.log(this.test);
        return BaseRender.self;
    };
    BaseRender.prototype.setY = function(value) {
        y = value;
        return BaseRender.self;
    };

    BaseRender.prototype.init = function() {
        image = new Image();
        if (typeof initCallback === 'function') {
            image.onload = initCallback;
        }
        image.src = sprite;
        return self;
    };

    BaseRender.prototype.getImage = function() {
        return image;
    }
    BaseRender.prototype.render = function() {
        canvas.drawImage(image, x * cellSize, y * cellSize);
        return self;
    }

    parent.BaseRender = BaseRender;
})(window)
