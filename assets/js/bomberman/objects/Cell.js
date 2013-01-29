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

    var types = ['wall', 'brick', 'fire', 'bombBonus', 'speedBonus', 'fireBonus'];
    var bonuses = ['bombBonus', 'speedBonus', 'fireBonus'];

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

    // fires destroy event
    this.destroy = function() {
        if (this.type == 'wall') {
            this.type = this.bonus ? this.bonus : false;
        }
        return self;
    };

    this.setFire = function() {
        if (this.type !== 'wall') {
            fireLevel++;
            this.type = 'fire';
            return true;
        } else {
            return false;
        }
    };
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

    this.access = function() {
        if (this.type == 'wall' || this.type == 'brick') {
            return false;
        } else if (this.type == 'fire') {
            return 'death';
        } else {
            return this.type ? this.type : true;
        }
    };

    this.removeBonus = function() {
        if ($.inArray(this.type, bonuses) > -1) {
            this.type = false;
        }
        return this.type;
    };
};
Cell.prototype = Object.create(Base.prototype);