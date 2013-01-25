/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/23/13
 * Time: 6:25 PM
 * To change this template use File | Settings | File Templates.
 */

var FieldRender = function(config) {
    var self = this;

    try {
        var width = config.width;
        var height = config.height;
        var canvas = config.canvas;
    } catch (e) {
        console.log('FieldRender initialization error: ' + e);
    }

    this.isEven = function(n) {
        return n % 2 == 0;
    }

    this.isOdd = function(n) {
        return n % 2 == 1;
    }

    var cellSize = 32;
    var maxI = 24;
    var maxJ = 24;


    var matrix = [];
    for (var i = 0; i <= maxI; i++) {
        matrix[i] = [];
        for (var j = 0; j <= maxJ; j++) {
            matrix[i][j] = new Cell({});
            if (this.isOdd(i)) {
                if (this.isOdd(j)) {
                    matrix[i][j] = new Cell(
                        {
                            type: 'wall'
                        }
                    );
                }
            }
        }
    }

    var wall = new BaseRender(
        {
            sprite: 'assets/img/wall.png',
            canvas: canvas,
            initCallback: function(){}
        }
    );
    var brick = new BaseRender(
        {
            sprite: 'assets/img/brick.png',
            canvas: canvas,
            initCallback: function(){}
        }
    );
    var bomb = new BaseRender(
        {
            sprite: 'assets/img/bomb.png',
            canvas: canvas,
            initCallback: function(){}
        }
    );


    this.init = function() {
        wall.init();
        brick.init();

        return self;
    };

    this.render = function() {
        canvas.clearRect(0, 0, width, height);
        canvas.fillStyle = "#333333";
        canvas.fillRect(0, 0, width, height);


        for (var i = 0; i <= maxI; i++) {
            for (var j = 0; j <= maxJ; j++) {
                if (matrix[i][j]) {
                    var cell = matrix[i][j].getType();

                    if (cell) {
                        //console.log(eval(cell).setX(i));
                        eval(cell).setX(i).setY(j).render();
                    }
                }
            }
        }
    };

    this.access = function(x, y) {
        return matrix[x][y].access();
    };

    this.setWidth = function(value) {
        width = value;
        return self;
    };
    this.setHeight = function(value) {
        height = value;
        return self;
    };
    this.getWidth = function() {
        return width;
    };
    this.getHeight = function() {
        return height;
    };

};
