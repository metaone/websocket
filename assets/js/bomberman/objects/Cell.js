/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/24/13
 * Time: 1:48 PM
 * To change this template use File | Settings | File Templates.
 */

var Cell = function(config) {
    var self = this;

    var types = ['wall', 'brick'];
    var bonuses = ['bomb', 'speed'];

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

    this.access = function() {
        if (type == 'wall' || type == 'brick') {
            return false;
        } else {
            return true;
        }
    };
};