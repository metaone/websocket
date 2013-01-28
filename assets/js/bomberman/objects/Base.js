/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/28/13
 * Time: 11:52 AM
 * To change this template use File | Settings | File Templates.
 */

var Base = function(config) {
    this.clearParam = function(param, defaultValue) {
        defaultValue = typeof defaultValue === 'undefined' ? false : defaultValue;
        if (typeof config === 'undefined' || typeof config[param] === 'undefined') {
            return defaultValue;
        } else {
            return config[param];
        }
    };
};
