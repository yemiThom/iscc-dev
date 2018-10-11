	var data = { 
		UserPoolId : _config.cognito.userPoolId,
        ClientId : _config.cognito.clientId
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    var cognitoUser = userPool.getCurrentUser();
	
	window.onload = function(){
    if (cognitoUser != null) {



        cognitoUser.getSession(function(err, session) {

            if (err) {
                alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());
			
			
			cognitoUser.getUserAttributes(function(err, result) {
				document.getElementById("email_value").innerHTML = result[2].getValue();		
				if (err) {
					console.log(err);
					return;
				}
				console.log(result);
			});			
			
        });
    }

    else     window.location.replace("index.html");
}
	function signOut(){
	    if (cognitoUser != null) {
          cognitoUser.signOut();
          window.location.replace("index.html");
        }
	}