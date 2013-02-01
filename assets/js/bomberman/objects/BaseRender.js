/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Base Class for render sprites
 */
var BaseRender = function(config) {
    // pass config to parent
    Base.apply(this, arguments);

    var self = this;

    this.image        = false;
    this.x            = this.clearParam('x', 0);
    this.y            = this.clearParam('y', 0);
    this.size         = this.clearParam('size', 32);
    this.sprite       = this.clearParam('sprite');
    this.canvas       = this.clearParam('canvas');
    this.initCallback = this.clearParam('initCallback');

    /**
     * Init spites
     * @return self
     */
    this.init = function() {
        this.image = new Image();
        if (typeof this.initCallback === 'function') {
            this.image.onload = this.initCallback;
        }
        this.image.src = this.sprite;

        return self;
    };

    /**
     * Renders spite on canvas
     * @return self
     */
    this.render = function() {
        this.canvas.drawImage(this.image, this.x * this.size, this.y * this.size);
        return self;
    }

};
BaseRender.prototype = Object.create(Base.prototype);