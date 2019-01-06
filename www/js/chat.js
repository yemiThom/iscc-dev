var status = localStorage.getItem("nearbyTogState");
var username = localStorage.getItem("username");
var userID = localStorage.getItem("userID");
var userLat = localStorage.getItem("userLat");
var userLng = localStorage.getItem("userLng");
var bearhugSticker = '<div id="bearHug" class="bearHugSticker"></div>';
var convosID = '';
var currNumRequests = 0;
//User goes online/busy
//status = "online";
//lng = 34.6;
//lat = 25.4;
//user = "testusername";

//5bf7058553557b001671ef56



function getUserLocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position){
			userLat = position.coords.latitude;
			userLng = position.coords.longitude;
			localStorage.setItem("userLat", userLat);
			localStorage.setItem("userLng", userLng);
			console.log("lat: "+userLat+"; lng: "+userLng);
		});
	}

}
	 
/*var getDistance = function(p1, p2) {
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(p2.lat() - p1.lat());
	var dLong = rad(p2.lng() - p1.lng());
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	  Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
	  Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d; // returns the distance in meter
};*/

function clearChatView(){
	document.getElementById("chat-messages").innerHTML = '';
}
function clearDatachannel(){
	document.getElementById("dataChannelSend").value = '';
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
	//console.log("getUserList called");
	$.ajax("https://fast-garden-93601.herokuapp.com/api/chatusers", {
		data: { get_param: 'value' },
		contentType: "application/json",
		method: "GET",
		success: function (data) {
			//iterate through all the elements
			$.each(data, function (index, element) {
				
			console.log("Stringified username: "+JSON.stringify(element.username));
				
				// Converts numeric degrees to radians
				function toRad(Value) {
					return Value * Math.PI / 180;
				}

				function calcDistance(lat1,lng1,lat2,lng2) {
					var R = 6371; // km
					var dLat = toRad(lat2-lat1);
					var dLon = toRad(lng2-lng1);
					var lat1 = toRad(lat1);
					var lat2 = toRad(lat2);

					var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
						Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					var d = R * c;
					return Math.floor(d*100)/100;
				};
				//console.log("elemLat: "+element.lat+"; elemLng:"+element.lng);

				//console.log(calcDistance(13.4877472,59.3293371,element.lat,element.lng));
				var distBetween = calcDistance(userLat,userLng,element.lat,element.lng);

				//if location is within 5km
				//if(distBetween < 6){
					//console.log("distance is less than 5km");
					//if status is not invisible and username is not mine
					if(element.status != "invisible"){
						if(element.username != username){
							// then show element.username and element.status
							if(distBetween >= 1){
								document.getElementById("friends").innerHTML += '<div id="' + element.username + '" class="friend" onClick="checkConvoRequest()"><!--img src="img/profile/1_copy.jpg" /--><p class="usernameTo"><strong>' +
									element.username + '</strong><span>IS '+distBetween+'km away</span></p><div class="status ' + element.status + '"></div></div>';
								makeFriendsClickable();
							}else{
								document.getElementById("friends").innerHTML += '<div id="' + element.username + '" class="friend" onClick="checkConvoRequest()"><!--img src="img/profile/1_copy.jpg" /--><p class="usernameTo"><strong>' +
									element.username + '</strong><span>IS '+distBetween+'m away</span></p><div class="status ' + element.status + '"></div></div>';
								makeFriendsClickable();
							}
						}
					}
				//}
			});
		},
		error: function () {
			//go away come back tomorrow 
		}
	});

}

function addUser() {
	//console.log("username to add:" + username);
	//console.log("status to add: " + status);
	//console.log("userid to add: " + userID);
	//getUserLocation();

	/*var user = {
		"username": username,
		"lng": userLng,
		"lat": userLat,
		"status": status
	}*/

	console.log("username: "+localStorage.getItem("username"));
	console.log("userid: "+userID);
	if(userID == null){
		console.log("userid is null: using POST to add user as new");
		userID ='';
		console.log("userid 2: "+userID);
		var user = {
			"username": username,
			"lng": userLng,
			"lat": userLat,
			"status": status
		}
		console.log(JSON.stringify(user));
		
		$.ajax("https://fast-garden-93601.herokuapp.com/api/chatusers", {
			data: JSON.stringify(user),
			accept: "application/json",
			contentType: "application/json",
			method: "POST",
			success: function () {
				console.log("Added User: " + JSON.stringify(user));
			},
			error: function () {
				console.log("ALERT: User not added!");
			}
		});
	}else{
		console.log("userid is "+userID+": using PUT to update user details");
		var user = {
			"username": username,
			"lng": userLng,
			"lat": userLat,
			"status": status
		}

		console.log("user[JSON.strigify]: "+JSON.stringify(user));

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
			document.getElementById("chat-messages").innerHTML = '<div class="announcement"><h2 class="color-blue-dark">Chat Request with '+document.getElementById("chatTo").innerHTML+':</h2><br/><h3 class="color-blue-dark">Sent/Pending</h3></div>';
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

	var numData = 0;
	//alert(username2);

	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversations", {
		data: { get_param: 'value' },
		method: 'GET',
		contentType: 'application/json',
		success: function (data) {
			console.log("Checking Convo Exists");
			console.log("username2 check 1: "+username2);
			$.each(data, function (index, element) {
				numData++;
				console.log("numData count: "+numData);
				//console.log("Data Obj: "+JSON.stringify(data));
				console.log("Data Obj count: "+Object.keys(data).length);


				console.log(element.user1 + " && " + element.user2);
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
						//set convosID
						convosID = element.id;
						checkConvoStatusChange();
						return false;
					}else{
						console.log("request not pending, show messages");
						//clear chat view
						clearChatView();
						enableInputs();
						//set convosID
						convosID = element.id;
						//get messages
						getMessages(convosID);
						return false;
					}
				}else if(element.user1 == username2 && element.user2 == username){
					//convo does exist
					//check if pending
					console.log("Convo exists: check if pending or not");
					if(element.accepted == "pending"){
						//console.log("convo request pending...");
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
						return false;
					}else{
						console.log("Go get messages cause it exists");
						//clear chat view
						clearChatView();
						enableInputs();
						//set convosID
						convosID = element.id;
						//get messages
						getMessages(convosID);
						return false;
					}
				}else{
					if(numData == Object.keys(data).length){
						console.log("numData == data.length");
						console.log("Usernames do not match conversations found");
						
						//console.log("element.user1: "+element.user1);
						//console.log("element.user2: "+element.user2);
						//if((element.user1 != username && element.user2 != username2) && (element.user1 != username2 && element.user2 != username)){
						
							console.log("now to send convo req")
							console.log("element.id: "+element.id);
							console.log("call userSendConvoRequest()");
							userSendConvoRequest();
						//}
					}
				}
			});
		},
		error: function () {
			console.log("Request not sent");
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
					//calculate which date format to go with
					//console.log("Date: " +new Date().toISOString());
					//console.log("Element Date: " +element.date);
					var dateCheck = new Date().toISOString().substring(0, 10);
					var elemDate = element.date.toString().substring(0, 10);
					if(dateCheck == elemDate){
						console.log("dates are the same, show time instead: "+ element.date.toString().substring(11, 16));
						elemDate = element.date.toString().substring(11, 16);
					}else{
						console.log("show dates...");
						elemDate = element.date.toString().substring(0, 10) + ", " + element.date.toString().substring(11, 16);
					}

					//show sent div
					//if message is bearhug tag
					if(element.message == ":bearhug:"){
						document.getElementById("chat-messages").innerHTML += '<div class="message right"><div class="bubble sent">'+bearhugSticker+'</div><div class="dateBubbleRight"><span>'+elemDate+'</span></div></div>';
						
					}else{
						document.getElementById("chat-messages").innerHTML += '<div class="message right"><div class="bubble sent">'+element.message+'</div><div class="dateBubbleRight"><span>'+elemDate+'</span></div></div>';
						
					}
				//else message being received
				}else{
					//calculate which date format to go with
					//console.log("Date: " +new Date().toISOString());
					//console.log("Element Date: " +element.date);
					var dateCheck = new Date().toISOString().substring(0, 10);
					var elemDate = element.date.toString().substring(0, 10);
					if(dateCheck == elemDate){
						console.log("dates are the same, show time instead: "+ element.date.toString().substring(11, 16));
						elemDate = element.date.toString().substring(11, 16);
					}else{
						console.log("show dates...");
						elemDate = element.date.toString().substring(0, 10) + ", " + element.date.toString().substring(11, 16);
					}

					//show received div
					//if message is bearhug tag
					if(element.message == ":bearhug:"){
						document.getElementById("chat-messages").innerHTML += '<div class="message right"><div class="bubble sent">'+bearhugSticker+'</div><div class="dateBubbleLeft"><span>'+elemDate+'</span></div>';			
						
					}else{
						document.getElementById("chat-messages").innerHTML += '<div class="message"><div class="bubble received">'+element.message+'</div><div class="dateBubbleLeft"><span>'+elemDate+'</span></div>';			
						
					}
				}
				//call scroll to bottom of chat view
				scrollViewToBttm();

			});
		},
		error: function () {
			//go away come back tomorrow 
		}
	});
}

//SEND MESSAGE
//$("#sendButton").click(function () {
function sendTxt(){
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
			console.log("Added message: "+JSON.stringify(message));
			clearChatView();
			document.getElementById("dataChannelSend").value = '';
			//call for messages to show up in chatview
			getMessages(convosID);
		},
		error: function () {
			console.log("Not added message: "+JSON.stringify(message));

		}

	});
//});
}

//SEND BearHug
//$("#sendHugButton").click(function () {
function sendBear(){
	//console.log("Send BearHug Button pressed, :bearhug: code should be sent...");
	var todayDate = new Date();
	//var messageStr = document.getElementById("dataChannelSend").value;
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
			//console.log("Added");
			clearChatView();
			//document.getElementById("dataChannelSend").value = '';
			//call for messages to show up in chatview
			getMessages(convosID);
		},
		error: function () {
			//console.log("Not added");

		}

	});
//});
}


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
	//console.log("getUserID called");
	console.log("userID: " + userID);
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
					localStorage.setItem("userID", userID);
					console.log("userID after being set: " + userID);
				}
			});
		},
		error: function () {
			//go away come back tomorrow 
			console.log("couldn't get user id");
		}
	});

}

function checkForRequests(){
	var numRequestsChecked = 0;

	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversations", {
		data: { get_param: 'value' },
		contentType: "application/json",
		method: "GET",
		success: function (data) {
			//console.log("Checking for chat requests");
			//console.log("current number of requests announced: "+ currNumRequests);
			//iterate through all the elements
			$.each(data, function (index, element) {
				//if username = element.username and if request status = pending
				if(element.user2 == username && element.accepted == "pending"){
					numRequestsChecked++;
					//if numRequestsChecked > currNumRequests
					if(numRequestsChecked > currNumRequests){
						//console.log("Checked: "+numRequestsChecked+" requests.");
						//send chat request notification
						requestToChat('<span class="announced-name">'+element.user1+'</span> sent you a request');						
						//update currNumRequests
						currNumRequests = numRequestsChecked;
						//console.log("current number of requests announced: "+ currNumRequests);
					}
				}
			});
		},
		error: function () {
			//go away come back tomorrow 
		}
	});
}

function checkConvoStatusChange(){
	//console.log("convosID: "+convosID);

	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversations/", {
		data: { get_param: 'value' },
		contentType: "application/json",
		method: "GET",
		success: function (data) {
			//console.log("check convos status data: "+ JSON.stringify(data));
			console.log("Checking for convo status change");
			//iterate through all the elements
			$.each(data, function (index, element) {
				//if username = element.username and if request status = pending
				if(element.user1 == username && element.user2 == document.getElementById("chatTo").innerHTML){
				console.log("element.accpeted: "+element.accepted);
					if(element.accepted == "pending"){
						console.log("no change, continue check");
						//restart convo status check
						checkConvoStatusChange();
					}else if(element.accepted != "pending"){
						console.log("convo status changed from pending");
						//clear the chat view
						clearChatView();
						//enable the input elements
						enableInputs();
					}
				}
			});
		},
		error: function () {
			//go away come back tomorrow 
		}
	});
}

function scrollViewToBttm(){
	const view = document.getElementById("chat-messages");
	view.scrollIntoView(false); //go to bottom of div
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
//$(document).ready(function () {
window.onload = function () {
	//localStorage.removeItem('userID');

	if (localStorage.getItem("nearbyTogState") == "online" || localStorage.getItem("nearbyTogState") == "busy") {
		//find userid
		console.log("calling getUserID")
		getUserID();
		//add username to users
		//addUser();
		console.log("calling getUserLocation");
		getUserLocation();
		console.log("calling getUserList");
		getUserList();
		//var intervalList = setInterval(function(){ getUserList(); }, 60000);
		var intervalChecks = setInterval(function(){ checkForRequests(); }, 5000);
		//var intervalScroll = setTimeout(function(){ scrollViewToBttm(); }, 500);

	}else{
		//clearInterval(intervalList);
		clearInterval(intervalChecks);
		//clearInterval(intervalScroll);
	}
}
//});