

function getEventInformation(){
    debugger;
    var memberData = {
      accessToken :  localStorage.getItem("access_token"),
      accountId : localStorage.getItem("account_id"),
      eventId : $('#inputEventId').val(),
    
    }

    
  
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://frozen-savannah-60393.herokuapp.com/event/getEvent",
    //"url": "http://localhost:3000/event/getEvent",
    
    "method": "POST",
    "headers": {
      "content-type": "application/json"
  
    },
    "processData": false,
    "data": JSON.stringify({memberData}) 
  }

  debugger;
$.ajax(settings).done(function (response) {
  debugger;
    
    $("#eventInformation").text(`Event Name = ${response.Name} ,

    Event Type : ${response.EventType} Location : ${response.Location}
    `);

});


}



function registerUser(){
    debugger;
    var registerUser = {
      accessToken :  localStorage.getItem("access_token"),
      "Id":0,
  "Url":`https://api.wildapricot.org/v2/Accounts/${localStorage.getItem("account_id")}`,
  "Event": {
    "Id":$('#inputEventId').val()
  },
  "Contact": {
    "Id": 48153718
  },
  "RegistrationTypeId": 4436109,
  "GuestRegistrationsSummary": {
    "NumberOfGuests": 11,
    "NumberOfGuestsCheckedIn": 11,
    "GuestRegistrations": [
      {
        "Id": 1,
        "Url": ""
      }
    ]
  },
  "IsCheckedIn": false,
  "RegistrationFields": [
    {
      "FieldName": "string",
      "SystemCode": "string",
      "Value": {}
    }
  ],
  "ShowToPublic": false,
  "RegistrationDate": "string",
  "Memo": "string",
  "RecreateInvoice": false
    
    }
  
  
  
  
  var settings = {
    "async": true,
    "crossDomain": true,
    //"url": "https://frozen-savannah-60393.herokuapp.com/event/getEvent",
  "url": "http://localhost:3000/event/registerEvent",
    
    "method": "POST",
    "headers": {
      "content-type": "application/json"
  
    },
    "processData": false,
    "data": JSON.stringify(registerUser) 
  }

  debugger;
$.ajax(settings).done(function (response) {
  debugger;
    
    $("#eventInformation").text(`Display Name = ${response.DisplayName} ,

    Registration Fee : ${response.RegistrationFee}
    `);

});


}
  
