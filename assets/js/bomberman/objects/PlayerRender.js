/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Player Render Class
 */
var PlayerRender = function(config) {
    // pass config to parent
    BaseRender.apply(this, arguments);

    var self = this;

    this.bombs = [];
    this.bombCount = 1;
    this.fire = 2;
    this.speed = this.clearParam('speed', 1);

    var bomb = new BaseRender({
        sprite: 'assets/img/bomb.png',
        canvas: this.canvas,
        initCallback: function(){}
    });

    /**
     * Init method
     * @return {*}
     */
    this.init = function() {
        bomb.init();

        this.image = new Image();
        if (typeof this.initCallback === 'function') {
            this.image.onload = this.initCallback;
        }
        this.image.src = this.sprite;

        return self;
    };

    /**
     * Render method
     * @return {*}
     */
    this.render = function() {
        for(var i = 0; i < this.bombs.length; i++) {
            bomb.x = this.bombs[i].x;
            bomb.y = this.bombs[i].y;
            bomb.render();
        }
        this.canvas.drawImage(
            this.image,
            this.x * this.speed * this.size,
            this.y * this.speed * this.size
        );
        return self;
    };

    /**
     * Add bomb
     * @param x
     * @param y
     * @return {Boolean}
     */
    this.addBomb = function(x, y) {
        var count = this.bombs.length;
        if (this.bombs.length < this.bombCount) {
            this.bombs[count] = {
                x: x,
                y: y
            };
            return true;
        }
        return false;
    };

    /**
     * Remove bomb
     * @param x
     * @param y
     * @return {*}
     */
    this.removeBomb = function(x, y) {
        for(var i = 0; i < this.bombs.length; i++) {
            if (this.bombs[i].x == x && this.bombs[i].y == y) {
                this.bombs.splice(i, 1);
                break;
            }
        }
        return self;
    };
};
PlayerRender.prototype = Object.create(BaseRender.prototype);
