function onlineCheck() {
    document.getElementById("online").checked = true;
    document.getElementById("busy").checked = false;
    document.getElementById("invisible").checked = false;
    document.getElementById("toggle-candy").className = "switch-candy-green";
}

function busyCheck() {
    document.getElementById("online").checked = false;
    document.getElementById("busy").checked = true;
    document.getElementById("invisible").checked = false;
    document.getElementById("toggle-candy").className = "switch-candy-yellow";
}

function invisibleCheck() {
    document.getElementById("online").checked = false;
    document.getElementById("busy").checked = false;
    document.getElementById("invisible").checked = true;
    document.getElementById("toggle-candy").className = "switch-candy-red";
}