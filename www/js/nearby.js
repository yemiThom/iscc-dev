var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( tid ); 
    

    var nearbyTogState = localStorage.getItem("nearbyTogState");

    if(nearbyTogState == "online"){
        console.log("toggle state: online");
        onlineCheck();
        changeTestIndicator("online");

    }else if(nearbyTogState == "busy"){
        console.log("toggle state: busy");
        testIndicator.classList.add("away");
        testIndicator.classList.remove("available");
        testIndicator.classList.remove("inactive");
        busyCheck();
        changeTestIndicator("busy");

    }else{
        console.log("toggle state: invisible");
        testIndicator.classList.add("inactive");
        testIndicator.classList.remove("available");
        testIndicator.classList.remove("away");
        invisibleCheck();  
        changeTestIndicator("invisible");      
    }

}, 100 );

function onlineCheck() {
    document.getElementById("online").checked = true;
    document.getElementById("busy").checked = false;
    document.getElementById("invisible").checked = false;
    document.getElementById("toggle-candy").className = "switch-candy-magenta";

    changeTestIndicator("online");

    localStorage.setItem("nearbyTogState", "online");
}

function busyCheck() {
    document.getElementById("online").checked = false;
    document.getElementById("busy").checked = true;
    document.getElementById("invisible").checked = false;
    document.getElementById("toggle-candy").className = "switch-candy-blue";

    changeTestIndicator("busy");

    localStorage.setItem("nearbyTogState", "busy");
}

function invisibleCheck() {
    document.getElementById("online").checked = false;
    document.getElementById("busy").checked = false;
    document.getElementById("invisible").checked = true;
    document.getElementById("toggle-candy").className = "switch-candy-grey";

    changeTestIndicator("invisible");
    
    localStorage.setItem("nearbyTogState", "invisible");
}

function changeTestIndicator(str){
    
    var testIndicator = document.getElementById("devTest");

    if(str == "online"){

        testIndicator.classList.add("available");
        testIndicator.classList.remove("away");
        testIndicator.classList.remove("inactive");
    }else if(str == "busy"){

        testIndicator.classList.remove("available");
        testIndicator.classList.add("away");
        testIndicator.classList.remove("inactive");
    }else{
        
        testIndicator.classList.remove("available");
        testIndicator.classList.remove("away");
        testIndicator.classList.add("inactive");
    }
}


function showAlert(message, title){
    if(navigator.notification){
        navigator.notification.alert(message, null, title, 'Ok');
    }else{
        alert(title ? (title + ": " + message) : message);
    }
}