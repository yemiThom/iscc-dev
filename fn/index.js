'use strict';

console.log('Loading function');

const APP_NAME = 'chat';
const DB_TABLE = 'chat';
const WINDOW_TITLE = 'Chat';
const AWS_IOT_ENDPOINT = process.env.AWS_IOT_ENDPOINT;

const AWS = require('aws-sdk');
const iotdata = new AWS.IotData({endpoint: AWS_IOT_ENDPOINT});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const htmlPage = `
<!DOCTYPE html>
<html>

<head>
    <title>Gutsy</title>

    <!-- Style Sheets -->
    <link rel="stylesheet" type="text/css" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/home.css">
    <link rel="stylesheet" type="text/css" href="css/native-interapp.css">
    <link rel="stylesheet" type="text/css" href="css/main-nav.css">
    <link rel="stylesheet" type="text/css" href="css/nearby-chat.css">
    <link rel="stylesheet" type="text/css" href="css/nearby-chat-toggle.css">
    <link rel="stylesheet" type="text/css" href="css/footer-nav.css">

    <!-- javascript -->
    <script type='application/javascript' src='js/fastclick.js'></script>
    <!--<script type="text/javascript" src="js/jquery.touchSwipe.js"></script>
    <script type="text/javascript" src="js/jquery.touchSwipe.min.js"></script>
    <script type="text/javascript" src="http://labs.rampinteractive.co.uk/touchSwipe/jquery.touchSwipe.min.js"></script>-->
    <script type="text/javascript" src="js/jquery.min.js"></script>

    <!-- AWS chatrooms -->
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.85.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- Cognito login -->
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="js/amazon-cognito-auth.min.js"></script>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.7.16.min.js"></script>
    <script src="js/amazon-cognito-identity.min.js"></script>
    <script type="text/javascript" src='js/config.js'></script>
    <script type="text/javascript" src='js/index.js'></script>

    <!-- socket.io ->
    <script type="text/javascript" src="http://cdn.socket.io/socket.io-1.0.3.js"></script>
    <script type="text/javascript" src="js/server.js"></script>
    <script type="text/javascript">
        document.addEventListener('deviceready', function () {
            socket.on('connect', function () {
                socket.on('text', function (text) {
                    alert(text);
                });
            });
        });
    </script-->
    <!--script type='text/javascript' src='js/client.js'></script-->

    <!--script src="node_modules/socket.io/lib/index.js"></script>
    <script>
        var socket = io("localhost:3000");
    </script-->


    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <!--
        user-scalable=no doesn't allow users to zoom
        initial-scale=1 means the zoom level when the app is loaded. 1=100%
        maximum-scale=1 means the max zoom level user can zoom
        minimum-scale-1 means the min zoom level user can zoom
        -->
    <!--meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1 
          width=device-width, height=device-height, target-densitydpi=device-dpi, viewport-fit=cover" /-->
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1 
        width=device-width, height=device-height, viewport-fit=cover" />
</head>

<body>
    <!-- Start Header Area -->
    <header class="default-header">
        <div class="container">
            <div class="header-wrap">
                <div class="header-top d-flex justify-content-between align-items-center">
                    <div class="logo">
                        <img id="openSBBtn" class="toggle" src="img/main-menu.png" onclick="openNav()" style=" max-width:100%;" />
                        <!--position: fixed; right: 10px; bottom: 10px" />-->
                        <!--<a href="#home"><img src="img/logo.png" alt="" style=" max-width:20%;"></a>-->
                    </div>
                    <div>
                        <div class="main-menubar d-flex align-items-center">
                            <img src="img/icons/myibd-logo-white.png">
                        </div>
                        <!--<a href="#home"><img src="" alt="Gutsy" style=" max-width:25%;"></a>-->
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- End Header Area -->
    <!-- Sidebar -->
    <div id="sidebar" class="sidenav">
        <!--style="color: black; position: fixed; display: inline-block; top: 0px; height: 100%; width: 200px; left: -200px; background-color: #ccc; transition: all 0.5s ease-in-out;"-->
        <a id="closeSBBtn" href="javascript:void(0)" class="closebtn" onclick="closeNav()"><i class="fas fa-times"></i></a>
        <div class="sidenav-section">
            <a id="email_value"></a>
        </div>

        <div class="sidenav-section">
            <img class="icon3" src="img/icons/faq.png" />
            <h4>Info</h4>
            <a href="crohns-info.html">Crohn's Disease</a>
            <a href="uc-info.html">Ulcerative Colitis</a>
            <a href="get-diagnosis.html">Getting a Diagnosis</a>
            <a href="cols-helper.html">Colonoscopy Helper</a>
        </div>

        <div class="sidenav-section">
            <img class="icon1" src="img/icons/contact.png" />
            <h4>Contact</h4>
            <a href="https://www.iscc.ie/contact" target="_blank" data-rel="external">Contact</a>
        </div>

        <div class="sidenav-section" onclick="window.open('https://www.iscc.ie/support-line', '_blank', 'location=yes')">
            <img class="icon1" src="img/icons/support.png" />
            <h4>Support</h4>
            <!--a href="https://www.iscc.ie/support-line">Support Telephone Line</a-->
            <a href="https://www.survey.iscc.ie/living-with-ibd">Living With IBD</a>
            <a href="https://www.iscc.ie/living-well-with-ibd">Living Well With IBD</a>
            <a href="https://www.iscc.ie/support-line">Support Telephone Line</a>
        </div>

        <a href="#" onclick="cordova.InAppBrowser.open('https://www.iscc.ie/faq', 'system', 'location=yes');"></a>
        <div class="sidenav-section">
            <img class="icon2" src="img/icons/faq.png" />
            <h4>FAQ</h4>
            <a>FAQ</a>
        </div>
        </a>

        <div class="sidenav-section">
            <a href="index.html" onclick="signOut()">Log out</a>
        </div>

    </div>
    <!-- Side Bar -->

    <!-- Start Precontainer Wrapper -->
    <div class="pre-container-wrapper">
        <!--<div id="swipe-area" class="swipe-area"><br/><br/><br/>Text Area</div>-->
        <!-- Start Container Area -->
        <div class="content-container">
            <div class="header">
                <h3 class="text-center p-b-10">Talk with someone nearby</h3>

                <div id="switch-toggle" class="switch-toggle switch-3 switch-candy">
                    <input id="online" name="state-d" type="radio" checked="">
                    <label for="online" onclick="onlineCheck()">Online</label>

                    <input id="busy" name="state-d" type="radio" checked="">
                    <label for="busy" onclick="busyCheck()">Busy</label>

                    <input id="invisible" name="state-d" type="radio" checked="">
                    <label for="invisible" onclick="invisibleCheck()">Invisible</label>

                    <a id="toggle-candy" class="switch-candy-green"></a>
                </div>
            </div>

            <div id="friends">
            </div>

            <div id="render-msg"></div>

            <div id="chatview" class="p1">
                <div id="profile">

                    <div id="close">
                        <div class="cy"></div>
                        <div class="cx"></div>
                        <!--<a href="nearby.html"><i class="fas fa-times"></i></a>-->
                    </div>

                    <p></p>
                    <span></span>
                </div>
                <div id="chat-messages">
                    <input type="text" class="form-control" id="user" placeholder="Your name" style="display: none;">
                    %CONTENT%
                </div>
            </div>

        </div>
        <!-- End Container Area -->
    </div>
    <!-- End Precontainer Wrapper -->

    <!-- Start Footer Nav Area -->
    <div class="default-footer">
        <div class="mobile-bottom-bar">
            <a href="home.html" class="footer-link">
                <i class="fas fa-home"></i>
                <span class='footer-text'>Home</span>
            </a>
            <a href="health-tracker.html" class="footer-link">
                <i class="fas fa-file-contract"></i>
                <span class='footer-text'>Health Tracker</span>
            </a>
            <a href="gmap.html" class="footer-link">
                <i class="fas fa-map-marker-alt"></i>
                <span class='footer-text'>Restrooms</span>
            </a>
            <a href="mindfulness.html" class="footer-link">
                <i class="fas fa-spa"></i>
                <span class='footer-text'>Mindfulness</span>
            </a>
            <a href="nearby.html" class="footer-link">
                <i class="fas fa-comments"></i>
                <span class='footer-text'>Nearby</span>
            </a>
        </div>
    </div>
    <!-- End Footer Nav Area -->
    <!-- fast click script -->
    <script>
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function () {
                FastClick.attach(document.body);
            }, false);
        }
    </script>
    <!-- end fast click script -->

    <!-- myIBD Server script -->
    
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script type='text/javascript' src='js/nearbychat.js'></script>
    <script type='text/javascript' src='js/nearby.js'></script>
    <script type="text/javascript" src='js/index-userlist.js'></script>
    
</body>
<!-- test native notifications -->
<script>
        /*showAlert: function(message, title){
            if(navigator.notification){
                navigator.notification.alert(message, null, title, 'Ok');
            }else{
                alert(title ? (title + ": " + message) : message);
            }
        }*/
</script>
<!-- test native notifications -->
<!-- paged tabs script -->
<script src="js/page-tabs.js"></script>
<!-- end paged tabs script-->
<!-- replace radio checkbox script -->
<script src="js/replace-radio-checkbox.js"></script>
<!-- end replace radio checkbox script -->
<!-- Start Sidebar script -->
<script type="text/javascript">
    /* Set the width of the sidbar to 250px */
    function openNav() {
        /*document.getElementById("sidebar").style.width = "250px";*/
        document.getElementById("sidebar").style.left = "0px";
    }

    /* Set the width of the sidebar to 0 */
    function closeNav() {
        /*document.getElementById("sidebar").style.width = "0";*/
        document.getElementById("sidebar").style.left = "-260px";
    }
</script>
<!-- End Sidebar script -->
<!-- Start swipe sidebar script --
<script type="text/javascript">
    $(function () {
        $("#swipe-area").swipe({
            //Generic swipe handler for all directions
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

                switch (direction) {
                    case "right":
                        openNav();
                        break;
                    case "left":
                        closeNav();
                        break;
                }
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 75
        });

        /* Set the width of the sidbar to 250px */
        function openNav() {
            /*document.getElementById("sidebar").style.width = "250px";*/
            document.getElementById("sidebar").style.left = "0px";
        }

        /* Set the width of the sidebar to 0 */
        function closeNav() {
            /*document.getElementById("sidebar").style.width = "0";*/
            document.getElementById("sidebar").style.left = "-260px";
        }
    });
</script-->
<!-- End swipe sidebar script -->
</html>
`;

const htmlContent = `
<div id="profile">

	<div id="close">
		<div class="cy"></div>
		<div class="cx"></div>
		<!--<a href="nearby.html"><i class="fas fa-times"></i></a>-->
	</div>

	<p></p>
	<span></span>
</div>
<div id="chat-messages">
</div>

<div id="sendmessage">
	<input type="text" id="dataChannelSend" placeholder="Send message..." />
	<button id="sendButton"></button>
</div>
`;

exports.handler = (event, context, callback) => {
    console.log(event);

    if ('Records' in event) {
        event.Records.forEach((record) => {
            // Kinesis data is base64 encoded so decode here
            const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
            console.log('Decoded payload:', payload);
            routeData(JSON.parse(payload));
        });
        callback(null, `Successfully processed ${event.Records.length} records.`);
    } else if ('httpMethod' in event) {
        processHttpRequest(event, callback);
    } else {
        routeData(event);
    }
};

function routeData(data) {
    if ('eventType' in data) {
        console.log(data.eventType + ': ' + data.clientId);
    } else if ('connected' in data && data.connected === true) {
        clientConnected(data);
    } else if ('sendroom' in data) {
        sendAllMessages(data);
    } else {
        console.log('ignored: ' + data);
    }
}

function sendAllMessages(inputData) {
    var params = {
        TableName: DB_TABLE,
        KeyConditionExpression: 'room = :hkey',
        ExpressionAttributeValues: {
            ':hkey': inputData.sendroom
        }
    }

    dynamodb.query(params, function(err, data) {
        if (err) console.log(err);
        else {
            console.log(data);
            var clientTopic = APP_NAME + "/in/" + inputData.clientId;

            var messages = [];
            data.Items.forEach((item) => {
                messages.push(item.message);
            });

            function run(message) {
                store.messages = store.messages.concat(message.messages);
                store.renderMessages();
            }

            var message = {
                run: run.toString(),
                room: inputData.sendroom,
                messages: messages
            };

            sendMessage(clientTopic, message);
        }
    });
}

function clientConnected(data) {

    //var initUser = document.getElementById('email_value').value;
    //console.log("InitUser: " + initUser);

    var clientTopic = APP_NAME + "/in/" + data.clientId;

    function run(message) {
        store.messages = message.messages;
        store.room = message.room;
        store.windowTitle = message.windowTitle;
        var pubTopic = APP_NAME + "/pub" + store.room;
        console.log('subscribe: ' + pubTopic);
        client.subscribe(pubTopic);

        document.getElementById('chatview').innerHTML = message.htmlContent;

        store.replaceURLWithHTMLLinks = function(text) {
            var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            return text.replace(exp,"<a href='$1'>$1</a>");
        }
        store.htmlEntities = function(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
        store.renderMessages = function() {
            var html = '';
            store.messages.forEach((m) => {
                var displayText = store.replaceURLWithHTMLLinks(store.htmlEntities(m.text));
                if ('user' in m) {
					//if(m.user == initUser){
						html += '<p><strong>' + m.user + '</strong>: ' + displayText + '</p>';
						//html += '<div class="message right"><div class="bubble sent"><span>' + m.user + '</span>';
					//}else{
						//html += '<div class="message"><div class="bubble received"><span>' + m.user + '</span>';
					//}
					
                } else {
                    html += '<div class="page-header"><h1>' + displayText + '</h1></div>';
					//html += displayText + '</div></div>';
                }
            });
            document.getElementById('chat-messages').innerHTML = html;
            window.scrollTo(0,document.body.scrollHeight);
        };
        store.sendMessage = function(msg) {
            var mqttMsg = new Paho.MQTT.Message(JSON.stringify(msg));
            mqttMsg.destinationName = APP_NAME + "/out";
            client.send(mqttMsg);
        };
        store.onMessageArrived = function(topic, msg) {
            if ('message' in msg) {
                store.messages.push(msg.message);
                store.renderMessages();
            }
        };

        if (localStorage.getItem(store.room) != null) {
            document.getElementById('user').value = JSON.parse(localStorage.getItem(store.room)).user;
			initUser = document.getElementById('user').value;
        }

        var form = document.getElementById('lineForm');
        form.addEventListener('sendButton', function(evt) {
            evt.preventDefault();
            var user = document.getElementById('user');
            var line = document.getElementById('line');
            if (user.value !== '' && line.value !== '') {
                localStorage.setItem(store.room, JSON.stringify({ user: user.value }));
                store.sendMessage({ room: store.room, message: { user: user.value, text: line.value }});
                line.value = '';
            }
        });

        document.title = store.windowTitle + ' ' + store.room;

        store.renderMessages();
        store.sendMessage({ sendroom: message.room });

    }

    var message = {
        run: run.toString(),
        htmlContent: htmlContent,
        windowTitle: WINDOW_TITLE,
        room: data.path,
        messages: [ { text: 'This chat room is: ' + data.path } ]
    };

    sendMessage(clientTopic, message);
}

function sendMessage(topic, message) {

    var params = {
        topic: topic,
        payload: JSON.stringify(message),
        qos: 1
    };

    console.log('publishing to topic: ' + topic);

    iotdata.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}

function processHttpRequest(req, callback) {
    var response = {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html"
        },
        body: htmlPage.replace("%CONTENT%",
            /*'<div id="messages" class="col-xs-12"><div class="page-header"><h1>Loading chat room ' +
            req.path + ' ...</h1></div></div>'*/
			'<div id="profile"><div id="close"><div class="cy"></div><div class="cx"></div></div><p></p><span></span></div>'+
			'<div id="chat-messages"><h1>Loading messages of room ' + req.path + '</div><div id="sendmessage"><input type="text" id="line" placeholder="Send message..." />'+
			'<button id="sendButton"></button></div>'
        )
    };
    console.log("response: " + JSON.stringify(response));
    callback(null, response);
}