/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Base Class for getting params from config
 */
var Base = function(config) {
    // const
    this.CELL_WALL   = 'wall';
    this.CELL_BRICK  = 'brick';
    this.CELL_FIRE   = 'fire';

    this.BONUS_BOMB  = 'bombBonus';
    this.BONUS_SPEED = 'speedBonus';
    this.BONUS_FIRE  = 'fireBonus';

    this.ACTION_DEATH = 'death';
    this.ACTION_RENDER = 'render';
    this.ACTION_DISCONNECT = 'disconnect';

    this.WIN_MESSAGE  = 'You won!';
    this.LOSE_MESSAGE = 'You lose!';
    this.DRAW_MESSAGE = 'Draw!';

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