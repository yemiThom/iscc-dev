



function loginOnApi(){
  var data = {
    username : $('#inputUsername').val(),
    password : $('#inputPassword').val()
  }

  var memberData = {
    accessToken : '',
    accountId : ''
  
  }



  if(data.username == ""){
    alert('Please enter user email.');
    return;203.

  }
  else if (data.password == ""){
    alert('Please enter user password or password is too short.');
    return;
  }

  var loginData = 'username='+data.username+'&password='+data.password;

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://frozen-savannah-60393.herokuapp.com/login",
  //  "url": "http://localhost:3000/login",
  
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"

  },
  "processData": false,
  "data": loginData 
}


var memberSettings = {
  "async": true,
  "crossDomain": true,
  "url": "https://frozen-savannah-60393.herokuapp.com/login/MemberData",
  //"url": "http://localhost:3000/login/MemberData",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"

  },
  "processData": false,
  "data": memberData 
}




$.ajax(settings).done(function (response) {
  if(response.access_token)
  {

    localStorage.setItem("access_token", response.access_token);
    memberData.accessToken = response.access_token;
    memberData.accountId = response.Permissions[0].AccountId;
    getMemberData();
  
  }
  else{
      alert(response.error_description);
  }

});


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
