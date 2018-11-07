var username = "";
/*var tid = setInterval(function () {
    if (document.readyState !== 'complete') return;
    clearInterval(tid);

    if (document.readyState === 'complete') {
        console.log("document ready!");
        username = document.getElementById('email_value').textContent;
    }

    console.log("username: " + username);
    

}, 100);*/

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

function getUsernameList(thisUser){
    var params = {
        TableName: 'users',
        FilterExpression: 'contains (userstatus, :userstatus1) OR contains(userstatus, :userstatus2) AND username <> :thisuser',
        ExpressionAttributeValues:{
            ":userstatus1": "online",
            ":userstatus2": "busy",
            ":thisuser": thisUser
        }
    };

    dynamodb.scan(params, function(err, data){
        if(err) console.log(err);
        else{
            console.log("Scan succeeded: displaying data now");

            data.Items.forEach(function(item){
                console.log("item data: " + item.username + "; " + item.userstatus);
                document.getElementById("friends").innerHTML += '<div class="friend"><!--img src="img/profile/1_copy.jpg" /--><p><strong>'+
                item.username +'</strong><span>Distance Unknown</span></p><div id="' + item.username + '" class="status '+item.userstatus+'"></div></div>';
                //document.getElementById(item.username).classList.add(item.status);
            });
            makeFriendsClickable();
        }
    });
}

function setOnlineStatus(status){
    console.log("Setting online status: " + status);
    var params = {
        TableName: 'users',
        Item: { "username": username, "userstatus": status }
    };

    dynamodb.put(params, function(err, data){
        if (err) console.log(err);
        else{console.log('Data info: ' + data)}
    });

}

//var timerVar = setInterval(getUsernameList(), 5000);
//setTimeout(getUsernameList(), 5000);

//$(document).ready(function () {
    //getUsernameList();
    //setTimeout(checkEmailValContent(), 100000);
//});

function checkEmailValContent(currusername){
    console.log("curreusername: "+currusername);
    username = currusername;
    if(document.getElementById('email_value').textContent == ""){
        console.log("Null ID reference: email_value");
    }else{
        console.log("email_value content found");
        sendUsername(currusername);
        getUsernameList(currusername);
        //insert username into chat username box
        //document.getElementById('user').value = username;
    }
}