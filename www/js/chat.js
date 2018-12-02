var status;
var username;
//User goes online/busy
//status = "online";
//lng = 34.6;
//lat = 25.4;
//user = "testusername";

//5bf7058553557b001671ef56

$("#userWantsToChat").click(function () {

	var userChat = [{
		// "username": user,
		// "lng": lng,
		// "lat": lat,
		// "status": status

		"username": "user",
		"lng": "lng",
		"lat": "lat",
		"status": "online"
	}];

	//put the data in 
	$.ajax("https://fast-garden-93601.herokuapp.com/api/messages", {
		data: JSON.stringify(userChat),
		contentType: "application/json",
		method: "POST",
		success: function () {
			alert("Added");
		},
		error: function () {
			alert("Not added");

		}

	});
});

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
				document.getElementById("friends").innerHTML += '<div class="friend"><!--img src="img/profile/1_copy.jpg" /--><p><strong>'+
                element.username +'</strong><span>Distance Unknown</span></p><div id="' + element.username + '" class="status ' + element.status + '"></div></div>';
			});
		},
		error: function () {
			//go away come back tomorrow 
		}
	});

}

function addUser(){
	username = localStorage.getItem("username");
	console.log("username to add:" + username);
	status = localStorage.getItem("nearbyTogState");
	console.log("status: "+status);

	var user = {
		"username": username,
		"location": "here",
		"status": status,
	}

	$.ajax("https://fast-garden-93601.herokuapp.com/api/chatusers", {
		data: JSON.stringify(user),
		accept: "application/json",
		contentType: "application/json",
		method: "POST",
		success: function(){
			console.log("Added User: "+data);
		},
		error: function(){
			console.log("ALERT: User not added!");
		}
	});
}

//click username. send request. POST to conversation table.
$("#userSendConversationRequest").click(function () {

	var conversation = [{
		"user1": "username1",
		"user2": "selectedUser",
		"accepted": "pending",
	}];

	//put the data in 
	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversation", {
		data: JSON.stringify(userChat),
		contentType: "application/json",
		method: "POST",
		success: function () {
			alert("Added");
		},
		error: function () {
			alert("Not added");

		}

	});
});

//check for invites.
$('#checkForConversation').click(function () {

	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversation", {
		data: { get_param: 'value' },
		contentType: "application/json",
		method: "GET",
		success: function (data) {
			//iterate through all the elements
			$.each(data, function (index, element) {
				//if your username = element.user2 
				//status == pending
				//list INVITES 

				//if your username = element.user1 !! element.user2
				//&& element.status = accepted 
				//list CONVERSATIONS

				//element.id -> put in an a global variable

			});
		},

		error: function () {
			//go away come back tomorrow 
		}
	});

});


//GET MESSAGES FOR PARTICLUAR CONVERSAYION
$("#openMessages").click(function () {
	$.ajax("https://fast-garden-93601.herokuapp.com/api/conversation/{id}", {
		data: { get_param: 'value' },
		contentType: "application/json",
		method: "GET",
		success: function (data) {
			//iterate through all the elements
			$.each(data, function (index, element) {
				//when you get conv by ID
				//list all the messages

			});
		},

		error: function () {
			//go away come back tomorrow 
		}
	});

});

//SEND MESSAGE
$("#sendMessage").click(function () {

	var message = {

	};

	//put the data in 
	$.ajax("https://fast-garden-93601.herokuapp.com/api/messages", {
		data: JSON.stringify(message),
		contentType: "application/json",
		method: "POST",
		success: function () {
			alert("Added");
		},
		error: function () {
			alert("Not added");

		}

	});
});


$("#invisible").click(function () {

	//put the data in 
	$.ajax("https://fast-garden-93601.herokuapp.com/api/chatUsers/id", {
		// id = id,
		data: JSON.stringify(message),
		contentType: "application/json",
		method: "DELETE",
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
$('#buttonID').click(function () {

	$.ajax("URL", {
		data:'',
		contentType: "application/json",
		method: "GET/DELETE/POST",
		success: function () {

		},
		error: function () {

		}


	});

});

//Start of document ready function
$(document).ready(function () {
	getUserList();

	if(localStorage.getItem("nearbyTogState") == "online" || localStorage.getItem("nearbyTogState") == "busy"){
		//add username to users
		addUser();
	}

	function makeFriendsClickable(){
		console.log("Gon make all dese ere clickable");
		$(".friend").each(function () {
			$(this).click(function () {
				var childOffset = $(this).offset();
				var parentOffset = $(this).parent().parent().offset();
				var childTop = childOffset.top - parentOffset.top;
				/*var clone = $(this).find('img').eq(0).clone();*/
				var top = childTop + 12 + "px";
	
				/*$(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatbox");*/
	
				setTimeout(function () { $("#profile p").addClass("animate"); $("#profile").addClass("animate"); }, 100);
				setTimeout(function () {
					$("#chat-messages").addClass("animate");
					$('.cx, .cy').addClass('s1');
					setTimeout(function () { $('.cx, .cy').addClass('s2'); }, 100);
					setTimeout(function () { $('.cx, .cy').addClass('s3'); }, 200);
				}, 150);
	
				/*$('.floatingImg').animate({
					'width': "68px",
					'left':'108px',
					'top':'20px'
				}, 200);*/
	
				var name = $(this).find("p strong").html();
				var email = $(this).find("p span").html();
				$("#profile p").html(name);
				$("#profile span").html(email);
	
				/*$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));*/
				$('#friends').fadeOut();
				$('#chatview').fadeIn();
	
	
				$('#close').unbind("click").click(function () {
					$("#chat-messages, #profile, #profile p").removeClass("animate");
					$('.cx, .cy').removeClass("s1 s2 s3");
					/*$('.floatingImg').animate({
						'width': "40px",
						'top':top,
						'left': '12px'
					}, 200, function(){$('.floatingImg').remove()});*/
	
					setTimeout(function () {
						$('#chatview').fadeOut();
						$('#friends').fadeIn();
					}, 50);
				});
	
			});
		});
	}
});