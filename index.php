<!DOCTYPE html>
<html>
<head>
    <title>PHP WebSocket Example</title>

    <link href="assets/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="assets/css/websocket.css" rel="stylesheet" media="screen">

    <script src="assets/js/jquery-1.8.3.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>

    <script src="assets/js/bomberman/config.js"></script>
    <script src="assets/js/bomberman/objects/Base.js"></script>
    <script src="assets/js/bomberman/objects/BaseRender.js"></script>
    <script src="assets/js/bomberman/objects/PlayerRender.js"></script>
    <script src="assets/js/bomberman/objects/Cell.js"></script>
    <script src="assets/js/bomberman/objects/FieldRender.js"></script>
    <script src="assets/js/bomberman/objects/Bomberman.js"></script>
    <script src="assets/js/bomberman/init.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span12">
                <!-- Header -->
                <div class="popover-title">
                    <h1>WebSockets and PHP</h1>
                    <p>This is small example of using WebSockets in PHP specially for <a href="https://docs.google.com/presentation/d/1x5b7sIUrNQeV03J7C6p_Xb_dA5pwGsQsSqvNsd1VAzg/edit?pli=1#slide=id.p" target="_blank">presentation</a>.</p>
                </div>

                <!-- Modal -->
                <div id="game-over-popup" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="game-over-label" aria-hidden="true">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                        <h3 id="game-over-label">Game over</h3>
                    </div>
                    <div class="modal-body">
                        <p></p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                    </div>
                </div>
                <div id="create-game-popup" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="create-game-label" aria-hidden="true">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                        <h3 id="create-game-label">Create game</h3>
                    </div>
                    <div class="modal-body">
                        <label for="field-width" class="control-label label">Width:</label>
                        <input type="text" name="field-width" id="field-width" value="15" class="span12" />
                        <label for="field-height" class="control-label label">Height:</label>
                        <input type="text" name="field-height" id="field-height" value="15" class="span12"/>
                    </div>
                    <div class="modal-footer">
                        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                        <button id="create-game-submit" class="btn btn-primary">Create</button>
                    </div>
                </div>

                <!-- Connections info -->
                <div class="clearfix">
                    <div class="pull-left">
                        <span id="ratchet-success" class="text-success hide">connection success</span>
                        <span id="ratchet-error" class="text-error">connection error</span>
                    </div>
                    <div class="pull-right">
                        <span id="user-count" class="text-info">Online: 0</span>
                    </div>
                </div>

                <hr/>

                <!-- Login -->
                <div class="register">
                    <h5>Enter your name:</h5>
                    <input id="register-name" type="text" placeholder="Type here..." class="span12"/>
                </div>

                <!-- Game part -->
                <div class="content hide">
                    <div class="row-fluid">
                        <!-- Games Status -->
                        <div id="games">
                            <h6>Open games: </h6>
                            <div id="open-games" class="ready">

                            </div>
                            <a id="create-game" href="javascript:void(0);" class="btn btn-primary create">Create</a>
                            <hr/>
                        </div>

                        <!-- Canvas -->
                        <div id="field" class="pagination-centered hide">
                            <canvas id="canvas">
                                Your browser does not support the HTML5 canvas tag.
                            </canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr/>

        <!-- Footer -->
        <footer>
            <p><img src="assets/img/epam.png">&nbsp;&nbsp;Epam Systems.</p>
        </footer>
    </div>
</body>
</html>