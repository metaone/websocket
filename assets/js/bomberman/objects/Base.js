/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Base Class for getting params from config
 */
var Base = function(config) {
    /**
     * Returns given param from config if it exist
     * @param param parameter name
     * @param defaultValue default value
     * @return {*}
     */
    this.clearParam = function(param, defaultValue) {
        defaultValue = typeof defaultValue === 'undefined' ? false : defaultValue;

        if (typeof config === 'undefined' || typeof config[param] === 'undefined') {
            return defaultValue;
        } else {
            return config[param];
        }
    };
};