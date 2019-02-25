updateBathroom() {
        $.ajax("https://fast-garden-93601.herokuapp.com/api/reviews", {
            data: { get_param: 'value' },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, element) {
                    console.log(element);
                    if(element.lng = ""){
                        alert("lng same");
                            if(element.lng = ""){
                                alert("lng and lat same")
                                   
                                var title = document.getElementById("placeName").value;
                                var rating = document.getElementById("rating").value;
                                var btype = document.getElementById("btype").value;
                                var lat = document.getElementById("placeLat").value;
                                var lng = document.getElementById("placeLng").value;
                                var review = document.getElementById("review").value; 
                                var created_date = new Date();



                                var bathroomUpdate = {
                                    "content": contStart + lat + ',' + lng + contEnd,
                                    "rating": element.rating + rating,
                                    "votes": element.votes + 1,
                                    "btype": btype,
                                    "review":  + '//' review,
                                    "created_date": created_date
                                };

                                alert(JSON.stringify(bathroomUpdate));

                                console.log(JSON.stringify(bathroomUpdate));


                                //UPDATE BATHROOM
                                $.ajax("https://fast-garden-93601.herokuapp.com/api/bathrooms", {
                                    data: JSON.stringify(bathroomUpdate),
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
                    }
                                    


                });
            }
        });
    });