var inAppBrowserRef;
function openURL(url) {
    //alert("successfully called openURL()");

    var target = "_system";

    var options = "location=yes,hidden=yes,closebuttoncaption=Close,";

    inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);

    inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);

    inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);

    inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);

}
function loadStartCallBack() {
    //alert("loadStartCallBack()");

    $('#status-message').text("loading please wait ...");

}
function loadStopCallBack() {
    //alert("loadStopCallBack()");

    if (inAppBrowserRef != undefined) {

        inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;" });

        $('#status-message').text("");

        inAppBrowserRef.show();
    }

}
function loadErrorCallBack(params) {
    //aler("loadErrorCallBack()");

    $('#status-message').text("");

    var scriptErrorMesssage =
        "alert('Sorry we cannot open that page. Message from the server is : "
        + params.message + "');"

    inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);

    inAppBrowserRef.close();

    inAppBrowserRef = undefined;

}

function executeScriptCallBack(params) {

    if (params[0] == null) {

        $('#status-message').text(
            "Sorry we couldn't open that page. Message from the server is : '"
            + params.message + "'");
    }

}

function beforeloadCallBack(params, callback) {

    if (params.url.startsWith("http://www.example.com/")) {

        // Load this URL in the inAppBrowser.
        callback(params.url);
    } else {

        // The callback is not invoked, so the page will not be loaded.
        $('#status-message').text("This browser only opens pages on http://www.example.com/");
    }

}

function messageCallBack(params) {
    $('#status-message').text("message received: " + params.data.my_message);
}