var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( tid ); 
    

    var nearbyTogState = localStorage.getItem("nearbyTogState");

    if(nearbyTogState == "online"){
        console.log("toggle state: online");
        onlineCheck();

    }else if(nearbyTogState == "busy"){
        console.log("toggle state: busy");
        busyCheck();

    }else{
        console.log("toggle state: invisible");
        invisibleCheck();        
    }

}, 100 );

function onlineCheck() {
    document.getElementById("online").checked = true;
    document.getElementById("busy").checked = false;
    document.getElementById("invisible").checked = false;
    document.getElementById("toggle-candy").className = "switch-candy-magenta";

    localStorage.setItem("nearbyTogState", "online");
}

function busyCheck() {
    document.getElementById("online").checked = false;
    document.getElementById("busy").checked = true;
    document.getElementById("invisible").checked = false;
    document.getElementById("toggle-candy").className = "switch-candy-blue";

    localStorage.setItem("nearbyTogState", "busy");
}

function invisibleCheck() {
    document.getElementById("online").checked = false;
    document.getElementById("busy").checked = false;
    document.getElementById("invisible").checked = true;
    document.getElementById("toggle-candy").className = "switch-candy-grey";
    
    localStorage.setItem("nearbyTogState", "invisible");
}


function showAlert(message, title){
    if(navigator.notification){
        navigator.notification.alert(message, null, title, 'Ok');
    }else{
        alert(title ? (title + ": " + message) : message);
    }
}