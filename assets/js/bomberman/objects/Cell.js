/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/24/13
 * Time: 1:48 PM
 * To change this template use File | Settings | File Templates.
 */

var Cell = function(config) {
    Base.apply(this, arguments);

    var self = this;

    var types = [this.CELL_WALL, this.CELL_BRICK, this.CELL_FIRE, this.BONUS_BOMB, this.BONUS_SPEED, this.BONUS_FIRE];
    var bonuses = [this.BONUS_BOMB, this.BONUS_SPEED, this.BONUS_FIRE];

    var fireLevel = 0;

    // init cell type
    this.type = false;
    var type = this.clearParam('type');
    if ($.inArray(type, types) > -1) {
        this.type = type;
    }

    // init bonus
    this.bonus = false;
    var bonus = this.clearParam('bonus');
    if ($.inArray(bonus, bonuses) > -1) {
        this.bonus = bonus;
    }

    /**
     * Destroys cell
     * @return {*}
     */
    this.destroy = function() {
        if (this.type == this.CELL_WALL) {
            this.type = this.bonus ? this.bonus : false;
        }
        return self;
    };

    /**
     * Sets fire to cell
     * @return {Boolean}
     */
    this.setFire = function() {
        if (this.type !== this.CELL_WALL) {
            fireLevel++;
            this.type = this.CELL_FIRE;
            return true;
        } else {
            return false;
        }
    };

    /**
     * Removes fire from cell
     * @return {Boolean}
     */
    this.removeFire = function() {
        fireLevel--;

        if (fireLevel > 0) {
            this.bonus = false;
            return false;
        }

        if (this.bonus) {
            this.type = this.bonus;
            this.bonus = false;
            return true;
        } else {
            this.type = false;
            return false;
        }
    };

    /**
     * Returns cell access
     * @return {*}
     */
    this.access = function() {
        if (this.type == this.CELL_WALL || this.type == this.CELL_BRICK) {
            return false;
        } else if (this.type == this.CELL_FIRE) {
            return this.ACTION_DEATH;
        } else {
            return this.type ? this.type : true;
        }
    };

    /**
     * Removes bonus from cell
     * @return {*}
     */
    this.removeBonus = function() {
        if ($.inArray(this.type, bonuses) > -1) {
            this.type = false;
        }
        return this.type;
    };
};
Cell.prototype = Object.create(Base.prototype);