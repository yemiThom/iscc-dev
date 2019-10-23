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
           //console.log('this is an ios device');
           var headerElem = document.getElementsByClassName('default-header');
           for(var i=0; i < headerElem.length; i++){
               headerElem[i].classList.add("ios-top-padding");
           }
           var headerElem = document.getElementsByClassName('header');
           for(var i=0; i < headerElem.length; i++){
               headerElem[i].classList.add("ios-top-padding");
           }
           var headerElem = document.getElementsByClassName('welcome-title');
           for(var i=0; i < headerElem.length; i++){
               headerElem[i].classList.add("ios-top-padding");
           }

           /*$(".default-header").each(function(){
                $(this).addClass("ios-top-padding");
           });*/
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
                console.log(err);
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

 if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function () {
                console.log("checking");
                localStorage.setItem("memberType", "");
                checkPremium();
                let membershipType = localStorage.getItem("MemberType");
                console.log(JSON.stringify(membershipType));
              //  let invoice = localStorage.getItem("Invoices");
                if (membershipType == undefined || membershipType == null || membershipType == "") {
                   $(".premiumFeatures").removeAttr('href');
                   $('#verifyiscc').html("Verify Membership");
                   $(verifyiscc).css('color', '#d123bf');

                }
                else {
                    console.log("membershipType: " + membershipType);
                   // $(".premiumFeatures").removeAttr('href');
                    if(membershipType.includes('1')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('2')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('3')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('4')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('5')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('6')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('7')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22";
                        console.log("membershipType: " + membershipType);
                    }
                    console.log("membershipType: " + membershipType);

                    $('#verifyiscc').html(membershipType);
                    //$('#verifyiscc').removeAttr('href');
                    $(".premiumFeatures").attr("href", location);


                }
                //FastClick.attach(document.body);
            }, false);
        }


function signOut() {
    if (cognitoUser != null) {
        console.log("Sign Out called");
        localStorage.removeItem("userID");
        cognitoUser.signOut();
        window.location.replace("index.html");
    }
}

function checkPremium(){


  console.log(localStorage.getItem("email"));

  if (localStorage.getItem("email") === null || localStorage.getItem("email") === ''){
    console.log("email is null tho");
    localStorage.setItem("email", $('#inputUsername').val());
    emailInput = localStorage.getItem("email");
    console.log("email set " + localStorage.getItem("email") );
  };

  if (localStorage.getItem("password") === null || localStorage.getItem("password") === ''){
     console.log("password is null tho");
    localStorage.setItem("password", $('#inputPassword').val());
    passwordInput = localStorage.getItem("password");
    console.log("password set " + localStorage.getItem("password") );
  };

  var data = {
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password")
  }

   var memberData = {
    accessToken : '',
    accountId : ''

  }

  var loginData = 'username='+data.email+'&password='+data.password;
  console.log("loginData: " + loginData);

//login data
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://infinite-thicket-67578.herokuapp.com/login",
  //  "url": "http://localhost:3000/login",

  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"

  },
  "processData": false,
  "data": loginData
}


$.ajax(settings).done(function (response) {
  if(response.access_token)
  {

    localStorage.setItem("access_token", response.access_token);
    memberData.accessToken = response.access_token;
    memberData.accountId = response.Permissions[0].AccountId;


  }
  else{
      console.log(response.error_description);
  }

});
}
