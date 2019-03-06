var data = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.clientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
var cognitoUser = userPool.getCurrentUser();
var maintenancemsg = document.getElementById("maintenancemsg");

//window.onload = function () {
$(document).ready(function () {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    /* if the device is not ios hide the download button */
    if(isMobile.iOS()){
           alert('this is an ios device');  
           /*var headerElem = document.getElementsByClassName('default-header');
           for(var i=0; i < headerElem.length; i++){
               headerElem[i].classList.add("ios-top-padding");
           }*/

           $(".default-header").each(function(){
                $(this).addClass("ios-top-padding");
           });
    };

    $.ajax("https://fast-garden-93601.herokuapp.com/api/maintenancemessages", {
        data: { get_param: 'value' },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, element) {
                $('#maintenancemsg').html(element.msg);
            });

        }
    });

    if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {

            if (err) {
                alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());


            cognitoUser.getUserAttributes(function (err, result) {
                document.getElementById("email_value").innerHTML = result[2].getValue();
                //checkEmailValContent(result[2].getValue());
                localStorage.setItem("username", result[2].getValue());
                console.log("username[localstorage]: " + localStorage.getItem("username"));
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(result);
            });

        });
    }

    else window.location.replace("index.html");
});

function signOut() {
    if (cognitoUser != null) {
        console.log("Sign Out called");
        localStorage.removeItem("userID");
        cognitoUser.signOut();
        window.location.replace("index.html");
    }
}