/**
 * Created with JetBrains PhpStorm.
 * User: Mykola_Skorenkyi
 * Date: 1/23/13
 * Time: 6:25 PM
 * To change this template use File | Settings | File Templates.
 */

var FieldRender = function(config) {
    Base.apply(this, arguments);

    var self = this;

    this.width = this.clearParam('width');
    this.height = this.clearParam('height');
    this.canvas = this.clearParam('canvas');


    this.isEven = function(n) {
        return n % 2 == 0;
    }

    this.isOdd = function(n) {
        return n % 2 == 1;
    }

    var cellSize = 32;
    var maxI = 24;
    var maxJ = 24;


    /*var matrix = [];
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
    }*/
    var matrix = [
        [new Cell({}), new Cell({}), new Cell({}), new Cell({type: 'brick', bonus: 'fireBonus'}), new Cell({type: 'brick', bonus: 'bombBonus'}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})],
        [new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({}), new Cell({type: 'wall'}), new Cell({})],
        [new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({}), new Cell({})]
    ];

    var wall = new BaseRender(
        {
            sprite: 'assets/img/wall.png',
            canvas: this.canvas,
            initCallback: function(){}
        }
    );
    var brick = new BaseRender(
        {
            sprite: 'assets/img/brick.png',
            canvas: this.canvas,
            initCallback: function(){}
        }
    );
    var fire = new BaseRender(
        {
            sprite: 'assets/img/fire.png',
            canvas: this.canvas,
            initCallback: function(){}
        }
    );
    var bombBonus = new BaseRender(
        {
            sprite: 'assets/img/bomb-bonus.gif',
            canvas: this.canvas,
            initCallback: function(){}
        }
    );
    var speedBonus = new BaseRender(
        {
            sprite: 'assets/img/speed-bonus.gif',
            canvas: this.canvas,
            initCallback: function(){}
        }
    );
    var fireBonus = new BaseRender(
        {
            sprite: 'assets/img/fire-bonus.gif',
            canvas: this.canvas,
            initCallback: function(){}
        }
    );



    this.init = function() {
        wall.init();
        brick.init();
        fire.init();

        bombBonus.init();
        speedBonus.init();
        fireBonus.init();

        return self;
    };

    this.render = function() {
        this.canvas.clearRect(0, 0, this.width, this.height);
        this.canvas.fillStyle = "#333333";
        this.canvas.fillRect(0, 0, this.width, this.height);


        for (var i = 0; i <= maxI; i++) {
            for (var j = 0; j <= maxJ; j++) {
                var cell = matrix[i][j].type;

                if (cell) {
                    var obj = eval(cell);
                    obj.x = i;
                    obj.y = j;
                    obj.render();
                }
            }
        }
    };

    this.access = function(x, y) {
        return matrix[x][y].access();
    };

    this.removeBonus = function(x, y) {
        return matrix[x][y].removeBonus();
    };

    this.explosion = function(x, y, fireLength, render) {
        var fires = [
            {
                x: x,
                y: y
            }
        ];
        matrix[x][y].setFire();

        for (var i = 1; i < fireLength; i++) {
            if ((x + i) <= maxI && matrix[x + i][y].setFire()) {
                fires.push(
                    {
                        x: x + i,
                        y: y
                    }
                );
            } else {
                break;
            }
        }

        for (var i = 1; i < fireLength; i++) {
            if ((x - i) >= 0 && matrix[x - i][y].setFire()) {
                fires.push(
                    {
                        x: x - i,
                        y: y
                    }
                );
            } else {
                break;
            }
        }

        for (var i = 1; i < fireLength; i++) {
            if ((y + i) <= maxJ && matrix[x][y + i].setFire()) {
                fires.push(
                    {
                        x: x,
                        y: y + i
                    }
                );
            } else {
                break;
            }
        }

        for (var i = 1; i < fireLength; i++) {
            if ((y - i) >= 0 && matrix[x][y - i].setFire()) {
                fires.push(
                    {
                        x: x,
                        y: y - i
                    }
                );
            } else {
                break;
            }
        }

        setTimeout(
            function() {
                for (var i = 0; i < fires.length; i++) {
                    matrix[fires[i].x][fires[i].y].removeFire();
                }
                render({});
            },
            500
        );

        return fires;
    };

};
FieldRender.prototype = Object.create(Base.prototype);
