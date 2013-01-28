/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/24/13
 * Time: 1:48 PM
 * To change this template use File | Settings | File Templates.
 */

var Cell = function(config) {
    var self = this;

    var types = ['wall', 'brick', 'fire', 'bombBonus', 'speedBonus', 'fireBonus'];
    var bonuses = ['bombBonus', 'speedBonus', 'fireBonus'];

    try {
        var type = false;
        if ($.inArray(config.type, types) > -1) {
            type = config.type;
        }

        var bonus = false;
        if ($.inArray(config.bonus, bonuses)) {
            bonus = config.bonus;
        }
    } catch(e) {
        console.log('Cell initialization error: ' + e);
    }


    // returns render object
    this.getType = function() {
        return type;
    };

    // fires destroy event
    this.destroy = function() {
        if (type == 'wall') {
            type = bonus ? bonus : false;
        }
        return self;
    };

    this.setFire = function() {
        if (type !== 'wall') {
            type = 'fire';
            return true;
        } else {
            return false;
        }
    };
    this.removeFire = function() {
        if (bonus) {
            type = bonus;
            return true;
        } else {
            type = false;
            return false;
        }
    };

    this.access = function() {
        if (type == 'wall' || type == 'brick') {
            return false;
        } else {
            return true;
        }
    };
};