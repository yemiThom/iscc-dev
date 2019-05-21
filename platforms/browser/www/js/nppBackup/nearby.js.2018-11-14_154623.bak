var tid = setInterval(function () {
    if (document.readyState !== 'complete') return;
    clearInterval(tid);


    var nearbyTogState = localStorage.getItem("nearbyTogState");

    if (nearbyTogState == "online") {
        console.log("toggle state: online");
        onlineCheck();
        //changeTestIndicator("devTest", "online");

    } else if (nearbyTogState == "busy") {
        console.log("toggle state: busy");
        /*testIndicator.classList.add("away");
        testIndicator.classList.remove("available");
        testIndicator.classList.remove("inactive");*/
        busyCheck();
        //changeTestIndicator("devTest", "busy");

    } else {
        console.log("toggle state: invisible");
        /*testIndicator.classList.add("inactive");
        testIndicator.classList.remove("available");
        testIndicator.classList.remove("away");*/
        invisibleCheck();
        //changeTestIndicator("devTest", "invisible");
    }

}, 100);

function onlineCheck() {
    document.getElementById("online").checked = true;
    document.getElementById("busy").checked = false;
    document.getElementById("invisible").checked = false;
    document.getElementById("toggle-candy").className = "switch-candy-magenta";

    document.getElementById("friends").classList.remove("invisible-friends");

    changeTestIndicator("online");

    setTimeout(setOnlineStatus("online"), 100);

    localStorage.setItem("nearbyTogState", "online");
}

function busyCheck() {
    document.getElementById("online").checked = false;
    document.getElementById("busy").checked = true;
    document.getElementById("invisible").checked = false;
    document.getElementById("toggle-candy").className = "switch-candy-blue";

    document.getElementById("friends").classList.remove("invisible-friends");

    changeTestIndicator("busy");

    setTimeout(setOnlineStatus("busy"), 100);

    localStorage.setItem("nearbyTogState", "busy");
}

function invisibleCheck() {
    document.getElementById("online").checked = false;
    document.getElementById("busy").checked = false;
    document.getElementById("invisible").checked = true;
    document.getElementById("toggle-candy").className = "switch-candy-grey";

    document.getElementById("friends").classList.add("invisible-friends");

    //document.getElementById("render-msg") = "<h3>You are currently offline...</h3>"

    changeTestIndicator("invisible");

    setTimeout(setOnlineStatus("invisible"), 100);

    localStorage.setItem("nearbyTogState", "invisible");
}

function changeTestIndicator(id, str) {

    var testIndicator = document.getElementById(id);

    if (str == "online") {

        testIndicator.classList.add("online");
        testIndicator.classList.remove("busy");
        testIndicator.classList.remove("invisible");
    } else if (str == "busy") {

        testIndicator.classList.remove("online");
        testIndicator.classList.add("busy");
        testIndicator.classList.remove("invisible");
    } else {

        testIndicator.classList.remove("online");
        testIndicator.classList.remove("busy");
        testIndicator.classList.add("invisible");
    }
}


function showAlert(message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'Ok');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}
//$(document).ready(function () {
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
//});