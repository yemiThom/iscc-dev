var status;
var username;
//User goes online/busy
//status = "online";
//lng = 34.6;
//lat = 25.4;
//user = "testusername";



$("#userWantsToChat").click(function() {

var userChat = {
	// "username": user,
	// "lng": lng,
	// "lat": lat,
	// "status": status

	"username": "user",
	"lng": "lng",
	"lat": "lat",
	"status": "online"
};

//put the data in 
$.ajax("https://fast-garden-93601.herokuapp.com/api/messages",{
	data: JSON.stringify(userChat),
	contentType:"application/json",
	method:"POST",
	success: function () {
		alert("Added");
	},
	error: function () {
		alert("Not added");

	}

	});
});

//pull data out
$('#getList').click(function() {

$.ajax("https://fast-garden-93601.herokuapp.com/api/userChat",{
	data: { get_param: 'value' }, 
	contentType: "application/json",
	method:"GET",
	success: function (data) {
		//iterate through all the elements
		$.each(data, function(index, element) {
			//get element.id put that in global variable
			//if location is within 5km and username is not mine
			// then show element.username and element.status
		});
	},
	error: function(){
			//go away come back tomorrow 
	}
});

});

//click username. send request. POST to conversation table.
$("#userSendConversationRequest").click(function() {

var conversation = {
	user1 = usename1,
	user2 = selectedUser,
	accepted = "pending",
};

//put the data in 
$.ajax("https://fast-garden-93601.herokuapp.com/api/conversation",{
	data: JSON.stringify(userChat),
	contentType:"application/json",
	method:"POST",
	success: function () {
		alert("Added");
	},
	error: function () {
		alert("Not added");

	}

	});
});

//check for invites.
$('#checkForConversation').click(function() {

$.ajax("https://fast-garden-93601.herokuapp.com/api/conversation",{
	data: { get_param: 'value' }, 
	contentType: "application/json",
	method:"GET",
	success: function (data) {
		//iterate through all the elements
		$.each(data, function(index, element) {
			//if your username = element.user2 
			//status == pending
			//list INVITES 

			//if your username = element.user1 !! element.user2
			//&& element.status = accepted 
			//list CONVERSATIONS

			//element.id -> put in an a global variable

		});
	},

	error: function(){
			//go away come back tomorrow 
	}
});

});


//GET MESSAGES FOR PARTICLUAR CONVERSAYION
$('#openMessages').click(function() {
	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversation/{id}",{
	data: { get_param: 'value' }, 
	contentType: "application/json",
	method:"GET",
	success: function (data) {
		//iterate through all the elements
		$.each(data, function(index, element) {
			//when you get conv by ID
			//list all the messages

		});
	},

	error: function(){
			//go away come back tomorrow 
	}
	});

});

//SEND MESSAGE
$("#sendMessage").click(function() {

var message = {

};

//put the data in 
$.ajax("https://fast-garden-93601.herokuapp.com/api/messages",{
	data: JSON.stringify(message),
	contentType:"application/json",
	method:"POST",
	success: function () {
		alert("Added");
	},
	error: function () {
		alert("Not added");

	}

	});
});


$("#goOffline").click(function() {

//put the data in 
$.ajax("https://fast-garden-93601.herokuapp.com/api/chatUsers/id",{
	id = id;
	data: JSON.stringify(message),
	contentType:"application/json",
	method:"DELETE",
	success: function () {
		alert("Added");
	},
	error: function () {
		alert("Not added");

	}

	});
});



// --> Go online --> See list of users --> send invite to user 
// --> get conversations - accept/decline -->  open conversation
// --> list messages in conversation --> send messadw
// -->  go offline




//TEMPLATE
$('#buttonID').click(function() {

$.ajax("URL",{
	data:
	contentType: "application/json",
	method:"GET/DELETE/POST",
	success: function () {

	},
	error: function(){

	}


});

});
