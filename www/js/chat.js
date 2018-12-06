var status = localStorage.getItem("nearbyTogState");
var username = localStorage.getItem("username");
var userID = localStorage.getItem("userID");
var bearhugSticker = '<div id="bearHug" class="bearHugSticker"></div>';
var convosID = '';
var currNumRequests = 0;
//User goes online/busy
//status = "online";
//lng = 34.6;
//lat = 25.4;
//user = "testusername";

//5bf7058553557b001671ef56

function clearChatView(){
	document.getElementById("chat-messages").innerHTML = '';
}
function enableInputs(){
	document.getElementById("dataChannelSend").disabled = false;
	document.getElementById("sendHugButton").disabled = false;
	document.getElementById("sendButton").disabled = false;
}
function disableInputs(){
	document.getElementById("dataChannelSend").disabled = true;
	document.getElementById("sendHugButton").disabled = true;
	document.getElementById("sendButton").disabled = true;
}

//pull data out
function getUserList() {
	console.log("getUserList called");
	$.ajax("https://fast-garden-93601.herokuapp.com/api/chatusers", {
		data: { get_param: 'value' },
		contentType: "application/json",
		method: "GET",
		success: function (data) {
			var elementID = '';
			//iterate through all the elements
			$.each(data, function (index, element) {
				//get element.id put that in global variable
				elementID = element.id;
				console.log("elementID: " + elementID);
				//if location is within 5km and username is not mine
				// then show element.username and element.status
				if(element.status != "invisible"){
					if(element.username != username){
						document.getElementById("friends").innerHTML += '<div id="' + element.username + '" class="friend" onClick="checkConvoRequest()"><!--img src="img/profile/1_copy.jpg" /--><p class="usernameTo"><strong>' +
							element.username + '</strong><span>Distance Unknown</span></p><div class="status ' + element.status + '"></div></div>';
						makeFriendsClickable();
					}
				}
			});
		},
		error: function () {
			//go away come back tomorrow 
		}
	});

}

function addUser() {
	console.log("username to add:" + username);
	console.log("status to add: " + status);
	console.log("userid to add: " + userID);

	var user = {
		"username": username,
		"lng": "here",
		"lat": "here",
		"status": status
	}

	$.ajax("https://fast-garden-93601.herokuapp.com/api/chatusers/"+userID, {
		data: JSON.stringify(user),
		accept: "application/json",
		contentType: "application/json",
		method: "PUT",
		success: function () {
			console.log("Added User: " + JSON.stringify(user));
		},
		error: function () {
			console.log("ALERT: User not added!");
		}
	});
}

//click username. send request. POST to conversation table.
//$("#userSendConversationRequest").click(function () {
function userSendConvoRequest(){
	var conversation = [{
		"user1": username,
		"user2": document.getElementById("chatTo").innerHTML,
		"accepted": "pending",
	}];

	//put the data in 
	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversations", {
		data: JSON.stringify(conversation),
		contentType: "application/json",
		method: "POST",
		success: function () {
			console.log("Sent Convo Request");
			document.getElementById("chat-messages").innerHTML = '<div class="announcement"><h2 class="color-blue-dark">Chat Request with '+username2+':</h2><br/><h3 class="color-blue-dark">Sent/Pending</h3></div>';
		},
		error: function () {
			alert("Request not sent");
		}

	});
}
//});
function checkConvoRequest(){
	var username2 = '';
	
	$('#friends').each(function(){
		$(this).find(".friend").each(function(){
			$(this).on( 'click', function () {
				var id  = $(this).attr("id");
				username2 = id;
				console.log(id);
	  		});
	 	});
   	});

	//alert(username2);

	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversations", {
		data: { get_param: 'value' },
		method: 'GET',
		contentType: 'application/json',
		success: function (data) {
			console.log("Checking Convo Exists");
			console.log("username2 check 1: "+username2);
			$.each(data, function (index, element) {
				console.log(element.user1 + " " + element.user2);
				console.log("username2 check 2: "+username2);
				if(element.user1 == username && element.user2 == username2){
					//convo does exist
					//check if pending 
					console.log("Convo exists: check if pending or not");
					if(element.accepted == "pending"){
						console.log("request pending, show request announcement");
						//clear chat view
						clearChatView();
						disableInputs();
						//request still pending 
						//deal
						document.getElementById("chat-messages").innerHTML = '<div class="announcement"><h2 class="color-blue-dark">Chat Request with '+username2+':</h2><br/><h3 class="color-blue-dark">Sent/Pending</h3></div>';
					}else{
						console.log("request not pending, show messages");
						//clear chat view
						clearChatView();
						enableInputs();
						//set convosID
						convosID = element.id;
						//get messages
						getMessages(convosID);
					}
				}else if(element.user1 == username2 && element.user2 == username){
					//convo does exist
					//check if pending
					console.log("Convo exists: check if pending or not");
					if(element.accepted == "pending"){
						console.log("convo request pending...");
						//clear chat view
						clearChatView();
						disableInputs();
						//request still pending 
						//deal
						document.getElementById("chat-messages").innerHTML = '<div class="announcement">'+
						'<h2 class="color-blue-dark">Chat Request with '+username2+':</h2><br/><h3 class="color-blue-dark">Received</h3>'+
						'<div class="requestBtn_div">'+
						'<button id="acceptRequest" class="button" type="button" value="acceptRequest" onClick="acceptRequestCall()">Accept</button>'+
						'<button id="declineRequest" class="button" type="button" value="declineRequest" onClick="declineRequestCall()">Decline</button>'+
						'</div>'+
						'</div>';
						convosID = element.id;
					}else{
						console.log("Go get messages cause it exists");
						//clear chat view
						clearChatView();
						enableInputs();
						//set convosID
						convosID = element.id;
						//get messages
						getMessages(convosID);
					}
				}else if(element.user1 != username && element.user2 != username2 && element.user1 != username2 && element.user2 != username){
					console.log("now to send convo req")
					//no convo 4 you
					userSendConvoRequest();
				}
			});
		},
		error: function () {
			alert("Request not sent");
		}
	});
}

//$("#acceptRequest").click(function () {
function acceptRequestCall(){
		var conversation = {
			"user1": document.getElementById("chatTo").innerHTML,
			"user2": username,
			"accepted": "accepted"
		};

		console.log("converstation object data: "+JSON.stringify(conversation));
	
		//put the data in 
		$.ajax("https://fast-garden-93601.herokuapp.com/api/conversations/"+convosID, {
			data: JSON.stringify(conversation),
			contentType: "application/json",
			method: "PUT",
			success: function () {
				console.log("Accepted Convo Request");
				clearChatView();
				enableInputs();
			},
			error: function () {
				alert("Request not been accepted");
			}
	
		});
}
//});

//$("#declineRequest").click(function () {
	function declineRequestCall(){
	
		//put the data in 
		$.ajax("https://fast-garden-93601.herokuapp.com/api/conversations/"+convosID, {
			method: "DELETE",
			success: function () {
				console.log("Deleted Convo & Request");
				clearChatView();
			},
			error: function () {
				alert("Request not been deleted");
			}
	
		});
}
//});

function getMessages(cid){
	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversations/"+cid+"/messages", {
		data: { get_param: 'value' },
		contentType: "application/json",
		method: "GET",
		success: function (data) {
			//iterate through all the elements
			$.each(data, function (index, element) {
				//when you get conv by ID//
				//list all the messages//

				//if message from = username
				if(element.from == username){
					//show sent div
					//if message is bearhug tag
					if(element.message == ":bearhug:"){
						document.getElementById("chat-messages").innerHTML += '<div class="message right"><div class="bubble sent"><span>'+element.date+'</span>'+bearhugSticker+'</div></div>';
					}else{
						document.getElementById("chat-messages").innerHTML += '<div class="message right"><div class="bubble sent"><span>'+element.date+'</span>'+element.message+'</div></div>';
					}
				//else message being received
				}else{
					//show received div
					//if message is bearhug tag
					if(element.message == ":bearhug:"){
						document.getElementById("chat-messages").innerHTML += '<div class="message right"><div class="bubble sent"><span>'+element.date+'</span>'+bearhugSticker+'</div></div>';
					}else{
						document.getElementById("chat-messages").innerHTML += '<div class="message"><div class="bubble received"><span>'+element.date+'</span>'+element.message+'</div></div>';
					}
				}

			});
		},
		error: function () {
			//go away come back tomorrow 
		}
	});
}

//SEND MESSAGE
$("#sendButton").click(function () {
	console.log("Send Button pressed, message should be sent...");
	var todayDate = new Date();
	var messageStr = document.getElementById("dataChannelSend").value;
	var messageTo = document.getElementById("chatTo").innerHTML;

	var message = {
		"date": todayDate,
		"conversationID": convosID,
		"message": messageStr,
		"from": username,
		"to": messageTo
	};

	//put the data in 
	$.ajax("https://fast-garden-93601.herokuapp.com/api/messages", {
		data: JSON.stringify(message),
		contentType: "application/json",
		method: "POST",
		success: function () {
			console.log("Added");
			clearChatView();
			document.getElementById("dataChannelSend").value = '';
			//call for messages to show up in chatview
			getMessages(convosID);
		},
		error: function () {
			console.log("Not added");

		}

	});
});
//SEND BearHug
$("#sendHugButton").click(function () {
	console.log("Send BearHug Button pressed, :bearhug: code should be sent...");
	var todayDate = new Date();
	var messageStr = document.getElementById("dataChannelSend").value;
	var messageTo = document.getElementById("chatTo").innerHTML;

	var message = {
		"date": todayDate,
		"conversationID": convosID,
		"message": ":bearhug:",
		"from": username,
		"to": messageTo
	};

	//put the data in 
	$.ajax("https://fast-garden-93601.herokuapp.com/api/messages", {
		data: JSON.stringify(message),
		contentType: "application/json",
		method: "POST",
		success: function () {
			console.log("Added");
			clearChatView();
			document.getElementById("dataChannelSend").value = '';
			//call for messages to show up in chatview
			getMessages(convosID);
		},
		error: function () {
			console.log("Not added");

		}

	});
});


$("#invisible").click(function () {
	getUserID();
	addUser();

	/*put the data in 
	$.ajax("https://fast-garden-93601.herokuapp.com/api/chatUsers/" + userID, {
		method: "DELETE",
		success: function () {
			console.log(userID+": Should be deleted!");
		},
		error: function () {
			console.log("Couldn't delete - userID: "+userID);
		}

	});*/
});

//pull data out
function getUserID() {
	console.log("getUserID called");
	$.ajax("https://fast-garden-93601.herokuapp.com/api/chatusers", {
		data: { get_param: 'value' },
		contentType: "application/json",
		method: "GET",
		success: function (data) {
			//iterate through all the elements
			$.each(data, function (index, element) {
				//get element.id if username is user's and put that in local variable
				if(element.username == username){
					userID = element.id;
					console.log("userID: " + userID);
					localStorage.setItem("userID", userID);
				}
			});
		},
		error: function () {
			//go away come back tomorrow 
		}
	});

}

// --> Go online --> See list of users --> send invite to user 
// --> get conversations - accept/decline -->  open conversation
// --> list messages in conversation --> send messadw
// -->  go offline

function checkForRequests(){
	var numRequestsChecked = 0;

	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversations", {
		data: { get_param: 'value' },
		contentType: "application/json",
		method: "GET",
		success: function (data) {
			console.log("Checking for chat requests");
			console.log("current number of requests announced: "+ currNumRequests);
			//iterate through all the elements
			$.each(data, function (index, element) {
				//if username = element.username and if request status = pending
				if(element.user2 == username && element.accepted == "pending"){
					numRequestsChecked++;
					//if numRequestsChecked > currNumRequests
					if(numRequestsChecked > currNumRequests){
						console.log("Checked: "+numRequestsChecked+" requests.");
						//send chat request notification
						requestToChat(element.user1+' sent you a request');						
						//update currNumRequests
						currNumRequests = numRequestsChecked;
						console.log("current number of requests announced: "+ currNumRequests);
					}
				}
			});
		},
		error: function () {
			//go away come back tomorrow 
		}
	});
}

/*//TEMPLATE
$('#buttonID').click(function () {

	$.ajax("URL", {
		data: '',
		contentType: "application/json",
		method: "GET/DELETE/POST",
		success: function () {

		},
		error: function () {

		}


	});

});*/

//Start of document ready function
$(document).ready(function () {
	//localStorage.removeItem('userID');
	getUserList();

	if (localStorage.getItem("nearbyTogState") == "online" || localStorage.getItem("nearbyTogState") == "busy") {
		//find userid
		getUserID();
		//add username to users
		//addUser();
		setInterval(function(){ checkForRequests(); }, 5000);
	}
});