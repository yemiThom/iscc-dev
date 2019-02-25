

function initMap() {
    //element to dump it in (id Map) and options
    var username = localStorage.getItem("username");
    //start of content href
    var contStart = "<a href = 'https://google.com/maps/place/";
    //end of content href
    var contEnd = "'>Get Directions</a>";
    //map options
    var options = {
        zoom: 16,

        //styling the map.
        styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "lightness": 33 }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2e5d4" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#c5dac6" }] }, { "featureType": "poi.park", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#c5c6c6" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#e4d7c6" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#fbfaf7" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#acbcc9" }] }]

        //  center:{lat:42.3601, lng:-71.0589}
    }

    infoWindow = new google.maps.InfoWindow;
    //new map
    var map = new google.maps.Map(document.getElementById('map'), options);



    //Get current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
            infoWindow.setPosition(initialLocation);
            infoWindow.setContent('You are here');
            infoWindow.open(map);

            document.getElementById("placeLat").value = position.coords.latitude;
            document.getElementById("placeLng").value = position.coords.longitude;
        });
    }


    //$("#bathroomData").click(function () {

    function addBathroom() {
        var title = document.getElementById("placeName").value;
        var rating = document.getElementById("rating").value;
        var btype = document.getElementById("btype").value;
        var lat = document.getElementById("placeLat").value;
        var lng = document.getElementById("placeLng").value;
        var created_date = new Date();



        var bathroom = {
            "lat": lat,
            "lng": lng,
            "title": title,
            "content": contStart + lat + ',' + lng + contEnd,
            "rating": 2,
            "votes": 0,
            "btype": btype,
            "review": 1,
            "created_date": created_date
        };

        alert(JSON.stringify(bathroom));

        console.log(JSON.stringify(bathroom));


        //SUBMIT BATHROOM
        $.ajax("https://fast-garden-93601.herokuapp.com/api/bathrooms", {
            data: JSON.stringify(bathroom),
            accept: "application/json",
            contentType: "application/json",
            method: "POST",
            success: function () {
                alert("Added");
                console.log(bathroom);
            },
            error: function () {
                alert("Not added");
            }
        });
    }
    //});

    getMap();

    var lat = document.getElementById("placeLat").value;
    var lng = document.getElementById("placeLng").value;
    console.log("LATLNG:" + lat + "" + lng);


    // Add Marker Function
    function addMarker(props) {
        var markerIcon;
        //Check for custom icon
<<<<<<< HEAD
        console.log("props.btype: "+props.btype);
        if (props.rating >= 3.5) {
            //set Icon Image to public
            //marker.setIcon(props.iconImage);
            markerIcon = "https://s3-eu-west-1.amazonaws.com/iscc-imgs/icons/restroom1.png";
        }else if(props.rating >= 2){
=======
        console.log("props.btype: " + props.btype);
        if (props.rating < 2) {
            //set Icon Image to public
            //marker.setIcon(props.iconImage);
            markerIcon = "https://s3-eu-west-1.amazonaws.com/iscc-imgs/icons/restroom1.png";
<<<<<<< HEAD
        } else if (props.rating > 2 && props.rating < 3.5) {
=======
        } else if (props.rating > 2 && < 3.5) {
>>>>>>> 7ce28377d96e46dc42d47fd315a94ad900d29642
>>>>>>> b0240b138236c0defe84070d5322ed130e0d732c
            //set Icon Image to business
            markerIcon = "https://s3-eu-west-1.amazonaws.com/iscc-imgs/icons/restroom2.png";
        } else {
            //set Icon Image to private
            markerIcon = "https://s3-eu-west-1.amazonaws.com/iscc-imgs/icons/restroom3.png";
        }

        var myLatLng = new google.maps.LatLng(props.lat, props.lng);
        console.log(myLatLng);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: markerIcon
            //without icon image icon is undefined, not ideal
            //icon:props.iconImage
        });

        //Check for content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: "Title: " + props.title + "<br><br> Establishment: " + props.btype + "<br><br> Review: " + props.review + "<br><br> Rating: " + props.rating + "<br><br> " + props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);

            });
        }
    }

    //GET ALL MAP DATA
    function getMap() {
        var markers = [];
        $.ajax("https://fast-garden-93601.herokuapp.com/api/bathrooms", {
            data: { get_param: 'value' },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, element) {
                    console.log(element);
                    markers.push(JSON.stringify(element));
                    console.log("markers:" + markers);
                    addMarker(element);
                });
            }
        });
        //Loop through markers
        for (var i = 0; i < markers.length; i++) {
            //Add marker
            addMarker(markers[i]);
        }
    }


    //GET ALL REVIEWS FOR USER
    $("#getAllReviews").click(function () {
        $.ajax("https://fast-garden-93601.herokuapp.com/api/reviews", {
            data: { get_param: 'value' },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, element) {
                    if (element.username == username) {
                        console.log(element);
                    }
                });
            }
        });
    });



    //GET ALL REVIEWS
    $("#bathroomData").click(function () {
        console.log("check the restroom input function");
        
        var lat = document.getElementById("placeLat").value;
        var lng = document.getElementById("placeLng").value;
        var bRmCount = 0;

        console.log("lat: " + lat + "; lng: " + lng);

        $.ajax("https://fast-garden-93601.herokuapp.com/api/bathrooms", {
            data: { get_param: 'value' },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, element) {
                    console.log(element);
                    console.log(data.length);
                    if (element.lng == lng && element.lat == lat) {
                        alert("lng and lat same")
                        //updateBathroom();
                        return;
                    }else if (element.lng != lng && element.lat != lat){
                        if(bRmCount == data.length){
                            addBathroom();
                        }
                    }

                    bRmCount ++;
                });
            }
        });
    });


    //SUBMIT REVIEW
    $("#reviewData").click(function () {
        $.ajax("https://fast-garden-93601.herokuapp.com/api/review", {
            data: JSON.stringify(bathroom),
            accept: "application/json",
            contentType: "application/json",
            method: "POST",
            success: function () {
                alert("Day added");
                console.log(bathroom);
            },
            error: function () {
                alert("Not added");
            }
        });
    });
}