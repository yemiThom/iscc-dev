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
           //alert('this is an ios device');
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

 if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function () {

                let membershipType = localStorage.getItem("MemberType");
                let invoice = localStorage.getItem("Invoices");
                if (membershipType == undefined || membershipType == null || membershipType == "") {
                 //  $(".premiumFeatures").removeAttr('href');
                   $('#verifyiscc').html("Verify Membership");
                   $(verifyiscc).css('color', '#d123bf');

                }
                else {
                    console.log("membershipType: " + membershipType);

                    if(membershipType.includes('Regular Membership')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22";
                        console.log("membershipType: " + membershipType);
                    }/*else if(membershipType.includes('2')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22 (+ "+"\u20AC"+"3 donation)";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('3')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22 (+ "+"\u20AC"+"8 donation)";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('4')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22 (+ "+"\u20AC"+"18 donation)";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('5')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22 (+ "+"\u20AC"+"28 donation)";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('6')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22 (+ "+"\u20AC"+"53 donation)";
                        console.log("membershipType: " + membershipType);
                    }else if(membershipType.includes('7')){
                        membershipType = "Standard Membership, "+"\u20AC"+"22 (+ "+"\u20AC"+"78 donation)";
                        console.log("membershipType: " + membershipType);
                    } */
                    console.log("membershipType: " + membershipType);

                    $('#verifyiscc').html(membershipType);
                    $('#verifyiscc').removeAttr('href');
                    //$(".premiumFeatures").attr("href", location);


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
