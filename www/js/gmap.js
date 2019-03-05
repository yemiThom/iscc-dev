function initMap() {
    //element to dump it in (id Map) and options
    var username = localStorage.getItem("username");
    //start of content href
    var contStart = "<a href = 'https://google.com/maps/place/";
    //end of content href
    var contEnd = "'>Get Directions</a>";
    var lngpos, latpos;
    var bRmCount = 0;
    var bathroomID;
    var bathroomVote;
    var bathroomRating;
    var bathroomReview;
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
            latpos = position.coords.latitude;
            lngpos = position.coords.longitude;
        });
    }

	getMap();


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


    //$("#bathroomData").click(function () {

    function addBathroom() {
        var title = document.getElementById("placeName").value;
        var rating = document.querySelector('input[name="stars"]:checked').value;
        var btype = document.getElementById("btype").value;
        var lat = document.getElementById("placeLat").value;
        var lng = document.getElementById("placeLng").value;
        var review = document.getElementById("review").value; 
        var created_date = new Date();



        var bathroom = {
            "lat": lat,
            "lng": lng,
            "title": title,
            "content": contStart + lat + ',' + lng + contEnd,
            "rating": rating,
            "votes": 1,
            "btype": btype,
            "review": review,
            "created_date": created_date
        };

        alert("Adding following bathroom: " + JSON.stringify(bathroom));

        console.log(JSON.stringify(bathroom));


        //SUBMIT BATHROOM
        $.ajax("https://fast-garden-93601.herokuapp.com/api/bathrooms/", {
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

    

    function updateOrAdd(){
        alert("In helper");
        if( bRmCount == 1){
         //alert("Update"); 
         var title = document.getElementById("placeName").value;
                                var rating = document.querySelector('input[name="stars"]:checked').value;
                                var btype = document.getElementById("btype").value;
                                var lat = document.getElementById("placeLat").value;
                                var lng = document.getElementById("placeLng").value;
                                var review = document.getElementById("review").value + '. Rating: ' + rating + ' <br> ' + 'Review: ' + bathroomReview; 
                                var votes = parseInt(bathroomVote, 10) + 1;
                                var starRating = parseInt( bathroomRating, 10 ) + parseInt(rating, 10);
                                var created_date = new Date();


                                var bathroomUpdate = {
                                    "lat": lat,
                                    "lng": lng,
                                    "title": title,
                                    "content": contStart + lat + ',' + lng + contEnd,
                                    "rating": starRating,
                                    "votes": votes,
                                    "btype": btype,
                                    "review":  review,
                                    "created_date": created_date
                                };

                                alert(JSON.stringify(bathroomUpdate));

                                console.log(JSON.stringify(bathroomUpdate));


                                //UPDATE BATHROOM
                                $.ajax("https://fast-garden-93601.herokuapp.com/api/bathrooms/"+bathroomID, {
                                    data: JSON.stringify(bathroomUpdate),
                                    accept: "application/json",
                                    contentType: "application/json",
                                    method: "PUT",
                                    success: function () {
                                        alert("Updated");
                                        //console.log(bathroom);
                                    },
                                    error: function () {
                                        alert("Not added");
                                    }
                                });

        }
        else{
           alert(bRmCount);
            addBathroom();
        }
    }

    var lat = document.getElementById("placeLat").value;
    var lng = document.getElementById("placeLng").value;
    //console.log("LATLNG:" + lat + "" + lng);


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


     //GET ALL REVIEWS
    $("#bathroomData").click(function () {
            console.log("check the restroom input function");

             var lat = document.getElementById("placeLat").value;
             var lng = document.getElementById("placeLng").value;
            

            //alert("lat: " + lat + "; lng: " + lng);

            $.ajax("https://fast-garden-93601.herokuapp.com/api/bathrooms", {
                data: { get_param: 'value' },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, element) {
                         //if (element.lng == lng && element.lat == lat) {
                            //alert(JSON.stringify(element));
                            //alert(latpos);
                            //alert(lngpos);
                            var distBetween = calcDistance(latpos,lngpos,element.lat,element.lng);
                            //alert(distBetween);
                            if(distBetween <= 200){
                                alert("This bathroom is close to another");                                
                                bRmCount = 1;
                                //alert(bRmCount);
                                bathroomID = element.id;
                                alert("ID of other bathroom:" + bathroomID);
                                bathroomVote = element.votes;
                                bathroomRating = element.rating;
                                bathroomReview = element.review;

                            }

                            else {
                                bRmCount = 0;
                                
                                //addBathroom();
                            }
                            //bathroomID = element.id;
                            // alert(element.id);                    
                    });   
                        updateOrAdd();   


                         
                }

         
            });

       


        });


    // Add Marker Function
    function addMarker(props) {
        var markerIcon;
        //Check for custom icon
        console.log("Rating: " + props.rating/props.votes);
//        if (props.rating/props.votes >= 3.5) {
            //set Icon Image to public
            //marker.setIcon(props.iconImage);
  //          markerIcon = "https://s3-eu-west-1.amazonaws.com/iscc-imgs/icons/restroom1.png";
    //    } else if (props.rating/props.votes >= 2) {
      //      console.log("props.rating: " + props.rating);
            if (props.rating/props.votes >= 3.5) {
                //set Icon Image to public
                //marker.setIcon(props.iconImage);
                markerIcon = "https://s3-eu-west-1.amazonaws.com/iscc-imgs/icons/restroom1.png";
            } else if (props.rating/props.votes > 2 && props.rating/props.votes < 3.5) {
                //set Icon Image to yellow
                markerIcon = "https://s3-eu-west-1.amazonaws.com/iscc-imgs/icons/restroom2.png";
            } else {
                //set Icon Image to red
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


                    content: "Title: " + props.title + "<br><br> Establishment: " + props.btype + "<br><br> Review: " + props.review + "<br><br> Rating: " + (props.rating/props.votes) + "<br><br> " + props.content + "<br><br> Votes: " + props.votes
                });

                marker.addListener('click', function () {
                    infoWindow.open(map, marker);

                });
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
//}