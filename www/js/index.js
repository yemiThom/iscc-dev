var data = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.clientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
var cognitoUser = userPool.getCurrentUser();
var maintenancemsg = document.getElementById("maintenancemsg");

//window.onload = function () {
$(document).ready(function () {

     $.ajax("https://fast-garden-93601.herokuapp.com/api/maintenancemessages", {
        data: { get_param: 'value' },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, element) {
                alert(element.msg);
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
                console.log("username[localstorage]: "+localStorage.getItem("username"));
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
        cognitoUser.signOut();
        window.location.replace("index.html");
    }
}