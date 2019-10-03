
var emailInput;
var passwordInput;


function loginOnApi(){


  alert(localStorage.getItem("email"));

  if (localStorage.getItem("email") === null || localStorage.getItem("email") === ''){
    alert("email is null tho");
    localStorage.setItem("email", $('#inputUsername').val());
    emailInput = localStorage.getItem("email");
    alert("email set " + localStorage.getItem("email") );
  };

  if (localStorage.getItem("password") === null || localStorage.getItem("password") === ''){
    localStorage.setItem("password", $('#inputPassword').val());
    passwordInput = localStorage.getItem("password");
    alert("password set " + localStorage.getItem("password") );
  }

  var data = {
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password")
  }

  var memberData = {
    accessToken : '',
    accountId : ''

  }

  var invoiceData = {
    accessToken : '',
    accountId : ''

  }

  if(data.email == ""){
    alert('Please enter user email.');
    return;203.

  }
  else if (data.password == ""){
    alert('Please enter user password or password is too short.');
    return;
  }

  var loginData = 'username='+data.email+'&password='+data.password;
  alert("loginData: " + loginData);

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

//member settings
var memberSettings = {
  "async": true,
  "crossDomain": true,
  "url": "https://infinite-thicket-67578.herokuapp.com/login/MemberData",
  //"url": "http://localhost:3000/login/MemberData",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"

  },
  "processData": false,
  "data": memberData
}

//invoices settings
var invoiceSettings = {
  "async": true,
  "crossDomain": true,
  "url": "https://infinite-thicket-67578.herokuapp.com/login/InvoiceData",
  //"url": "http://localhost:3000/login/MemberData",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"

  },
  "processData": false,
  "data": invoiceData
}




$.ajax(settings).done(function (response) {
  if(response.access_token)
  {

    localStorage.setItem("access_token", response.access_token);
    memberData.accessToken = response.access_token;
    memberData.accountId = response.Permissions[0].AccountId;
    getInvoiceData();
    getMemberData();

  }
  else{
      console.log(response.error_description);
  }

});

//Function for Invoice Data
function getInvoiceData(){

   let invoiceDataSend = `accessToken=${invoiceData.accessToken}&accountId=${invoiceData.accountId}`;
  invoiceSettings.data = invoiceDataSend;

  $.ajax(memberSettings).done(function (response) {

    if(response[0].Name)
    {
      localStorage.setItem("Invoices", response[0].Name);
      ;


    }
    else{
        alert('No invoices');
    }

  });
}

//Function for Member Data
function getMemberData(){

  let memberDataSend = `accessToken=${memberData.accessToken}&accountId=${memberData.accountId}`;
  memberSettings.data = memberDataSend;

  $.ajax(memberSettings).done(function (response) {

    if(response[0].Name)
    {
      localStorage.setItem("MemberType", response[0].Name);
      window.location.href = "home.html";


    }
    else{
        alert('Not registered with member type.');
    }

  });
}




}

var mType = localStorage.getItem("MemberType");




function disconnectISCCaccount(){

  localStorage.removeItem("access_token");
  window.location.href = "home.html";

}
