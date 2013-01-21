<!DOCTYPE html>
<html>
<head>
    <title>PHP WebSocket Example</title>

    <link href="assets/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="assets/css/websocket.css" rel="stylesheet" media="screen">

    <script src="assets/js/jquery-1.8.3.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>

    <script src="assets/js/websocket/config.js"></script>
    <script src="assets/js/websocket/main.js"></script>
</head>

<body>
<div class="container-fluid">
    <div class="row-fluid">
        <div class="span12">
            <div class="hero-unit">
                <h1>WebSockets and PHP</h1>
                <p>This is small example of using WebSockets in PHP specially for <a href="https://docs.google.com/presentation/d/1x5b7sIUrNQeV03J7C6p_Xb_dA5pwGsQsSqvNsd1VAzg/edit?pli=1#slide=id.p" target="_blank">presentation</a>.</p>
            </div>

            <div class="register">
                <h5>Enter your name:</h5>
                <input id="register-name" type="text" placeholder="Type here..." class="span12"/>
            </div>

            <div class="content">
                <div class="row-fluid">
                    <canvas id="canvas" width="800" height="480">
                        Your browser does not support the HTML5 canvas tag.
                    </canvas>
                    <div id="chat">
                        <span id="ratchet-success" class="text-success hide">connection success</span>
                        <span id="ratchet-error" class="text-error">connection error</span>
                        <div id="ratchet-message-box" class="div-textarea"></div>
                        <input id="ratchet-message" type="text" placeholder="Type here..."/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <hr/>

    <footer>
        <p><img src="assets/img/epam.png">&nbsp;&nbsp;Epam Systems.</p>
    </footer>
</div>
</body>
</html>