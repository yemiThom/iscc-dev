var username = "";
var tid = setInterval(function () {
    if (document.readyState !== 'complete') return;
    clearInterval(tid);

    if (document.readyState === 'complete') {
        console.log("document ready!");
        username = document.getElementById('email_value').textContent;
    }

    console.log("username: " + username);
    
    sendUsername(username);
    //insert username into chat username box
    //document.getElementById('user').value = username;

}, 100);

const dynamodb = new AWS.DynamoDB.DocumentClient();
function sendUsername(dataInput) {

    var params = {
        TableName: 'users',
        Item: { "username": dataInput }
    };

    dynamodb.put(params, function(err, data){
        if (err) console.log(err);
        else{console.log('Data info: ' + data)}
    });
}

function getUsernameList(){
    var params = {
        TableName: 'users'
        
    };

    dynamodb.scan(params, function(err, data){
        if(err) console.log(err);
        else{
            console.log("Scan succeeded: displaying data now");

            data.Items.forEach(function(item){
                console.log("item data: " + item.username);
                document.getElementById("friends").innerHTML += '<div class="friend"><!--img src="img/profile/1_copy.jpg" /--><p><strong>'+
                item.username +'</strong><span>Distance Unknown</span></p><div id="devTest" class="status available"></div></div>';
            });
        }
    });
}

//if(document.onload){
    getUsernameList();
//}