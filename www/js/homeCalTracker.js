//FOOD VARIABLES
var username = localStorage.getItem("username");
var meal;
var foodInput = document.getElementById("foodnameInput").value;
var created_date = new Date();



$("#addFood").click(function () {

    var preBarcode = getBarcodeNum();
    var barcode = preBarcode;
    var brand = document.getElementById("brand").value;
    var foodname = document.getElementById("foodname").value;
    //var servingsize = document.getElementById("servingsize").value;
    var servingsPerContainer = document.getElementById("servingsPerContainer").value;
    var created_date = new Date();

    var food = {
        "brand": brand,
        "foodname": foodname,
        "servingsPerContainer": servingsPerContainer,
        "barcode": barcode,
        "created_date": created_date
    };

    console.log(JSON.stringify(food));

    console.log(food);
   // alert(food);

    $.ajax("https://fast-garden-93601.herokuapp.com/api/food", {
        data: JSON.stringify(food),
        accept: "application/json",
        contentType: "application/json",
        method: "POST",
        success: function () {
            console.log(data);
            console.log("Added");
            $("#foodDatabase").hide();
            $("#showFoodAdd").show();
        },
        error: function () {
            console.log("Not added");
            $("#foodDatabase").hide();
            $("#showFoodAdd").show();
        }
    });
});

//GET ALL FOOD DATA
function getFood() {
    //$("#getAllFoodData").click(function() {
    $.ajax("https://fast-garden-93601.herokuapp.com/api/food", {
        data: { get_param: 'value' },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rows = '';
            $("#selector").empty();
            $("#selector2").empty();
            $.each(data, function (index, element) {
                console.log(element);
                foodrow = '<option>' + element.foodname + '</option>';
                idrow = '<option>' + element.id + '</option>';
                console.log(element.foodname);
                $("#selector").append(foodrow);
                $("#selector2").append(idrow);
            });
        }
    });
    //});
}

//GET SPECIFIC FOOD DATA BASED ON SELECTOR
function getFoodItem() {
    var fName = $("#selector").val();
    console.log("selector foodname: "+fName)
    $.ajax("https://fast-garden-93601.herokuapp.com/api/food/", {
        data: { get_param: 'value' },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, element) {
                console.log(element);
                if(element.foodname == fName){
                    document.getElementById("brandInput").value = element.brand;
                    document.getElementById("foodnameInput").value = element.foodname;
                    //document.getElementById("servingsizeInput").value = element.servingsize;
                    document.getElementById("servingsPerContainerInput").value = element.servingsPerContainer;
                    document.getElementById("trackingCodeInput").value = element.barcode;
                    return false;
                }else{
                    document.getElementById("brandInput").value = "";
                    document.getElementById("foodnameInput").value = "";
                    //document.getElementById("servingsizeInput").value = element.servingsize;
                    document.getElementById("servingsPerContainerInput").value = "";
                    document.getElementById("trackingCodeInput").value = "";
                }
            });
        }
    });

}



//DIET LOG VARIABLES


//LOG DIET
$("#logDiet").click(function () {
    var pain = document.getElementById("healthtracker_pain-bf").checked;
    var foodInput = document.getElementById("foodnameInput").value;
    var servingInput = document.getElementById("servingsPerContainerInput").value;
    
    console.log("servingsPerContainerInput value: " + servingsPerContainerInput);

    /*if (document.getElementById("healthtracker_pain-bf").checked = "false") {
        pain = "no";
    }
    else {
        pain = "yes";
    }*/
    
    if (document.getElementById("tab1-1").checked == true) {
        meal = "breakfast";
    }
    if (document.getElementById("tab2-1").checked == true) {
        meal = "lunch"
    }
    if (document.getElementById("tab3-1").checked == true) {
        meal = "dinner"
    }

    if (document.getElementById("good").checked) {
        day = document.getElementById("good").value;
    }
    if (document.getElementById("okay").checked) {
        day = document.getElementById("okay").value;
    }

    var dietlog = {
        "username": username,
        "date": date,
        "meal": meal,
        "food": foodInput,
        "pain": pain,
        "servingsize": servingInput,
        "created_date": created_date
    };

    console.log("Stringified: " + JSON.stringify(dietlog));

    console.log(dietlog);
    console.log(dietlog);

    $.ajax("https://fast-garden-93601.herokuapp.com/api/dietlogs", {
        data: JSON.stringify(dietlog),
        accept: "application/json",
        contentType: "application/json",
        method: "POST",
        success: function () {
            console.log(dietlog);
            console.log("Added");
            
            document.getElementById("popup2-title").innerHTML = "Success";
            document.getElementById("popup2-content").innerHTML = "Your Diet Log for the day has been successfully added.";
            location.href = "#popup2";
        },
        error: function () {
            console.log("Not added");

            document.getElementById("popup2-title").innerHTML = "Error";
            document.getElementById("popup2-content").innerHTML = "Unfortunately an error occured while trying to add your Diet Log for the day. Please Try again.";
            location.href = "#popup2";
        }
    });

});



//GET ALL DIET LOG DATA
var x = document.getElementById('tabletest');
var x2 = document.getElementById('tabletest2');
var x3 = document.getElementById('tabletest3');
var x4 = document.getElementById('tabletest4');
$("#getAllDietlogData").click(function () {
    $.ajax("https://fast-garden-93601.herokuapp.com/api/dietlogs", {
        data: { get_param: 'value' },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#dietLogTable').empty();
            $.each(data, function (index, element) {
                console.log(element);
                if (element.username == username) {
                    console.log(element.pain);
                    var elemPain;
                    
                    if(element.pain == "true"){
                        elemPain = "YES";
                    }else{
                        elemPain = "NO";
                    }
                    
                    var tr = (
                        '<tr>' +
                        '<td>' + element.date.toString().substring(0, 10) +
                        '<td>' + element.meal +
                        '<td>' + element.food +
                        '<td>' + elemPain +
                        '<td>' + element.servingsize.toString()
                        + '</tr>'
                    );
                    $('#dietLogTable').append(tr);
                }
            });
            if (x.style.display === 'none') {
                x.style.display = 'block';
            }
        },
        error: function () {
            console.log("Data missing");
        }
    });
});


var options = { day: 'numeric', month: 'numeric', year: 'numeric' };
var date = new Date();

//DATE PICKER
$('#datepicker').attr('value', date);

$(function () {
    $('#datepicker').val(date.toLocaleDateString("en-gb"));
    $('#cal-prev').click(function () {
        date.setDate(date.getDate() - 1);
        $('#datepicker').val(date.toLocaleDateString("en-gb", options));
        getForDate();
        getDoclog();
    });

    $('#cal-next').click(function () {
        date.setDate(date.getDate() + 1);
        $('#datepicker').val(date.toLocaleDateString("en-gb", options));
        getForDate();
        getDoclog();
    });
});


$("#getAllDocLogData").click(function () {
    $.ajax("https://fast-garden-93601.herokuapp.com/api/doclogs", {
        data: { get_param: 'value' },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#docLogTable').empty();
            $.each(data, function (index, element) {
                if (element.username == username) {
                    console.log(element);
                    var elemComplete;
                    if(element.complete == "true"){
                        elemComplete = "YES";
                    }else{
                        elemComplete = "NO";
                    }
                    
                    var tr = (
                        '<tr>' +
                        '<td>' + element.date.toString().substring(0, 10) +
                        '<td>' + element.medication +
                        '<td>' + element.dosage +
                        '<td>' + element.comment +
                        '<td>' + elemComplete +
                        '</tr>'
                    );
                    $('#docLogTable').append(tr);
                }
            });
            if (x3.style.display === 'none') {
                x3.style.display = 'block';
            }
        },
        error: function () {
            console.log("Data missing");
            ;
        }
    });
});

//Start of document ready function
$(document).ready(function () {
    getForDate();
    getDoclog();
    getFood();


    var created_date = new Date();

    //DOC LOG VARIABLES


    //ADD SYMPTOMS
    $("#submitData").click(function () {

        var day;
        var pain;
        var stress;
        var stool;
        var bowelm;
        var bowelf;
        var bvisit;

        if (document.getElementById("good").checked) {
            day = document.getElementById("good").value;
        }
        if (document.getElementById("okay").checked) {
            day = document.getElementById("okay").value;
        }
        if (document.getElementById("bad").checked) {
            day = document.getElementById("bad").value;
        }

        if (document.getElementById("pain-Low").checked) {
            pain = document.getElementById("pain-Low").value;
        }
        if (document.getElementById("pain-Medium").checked) {
            pain = document.getElementById("pain-Medium").value;
        }
        if (document.getElementById("pain-High").checked) {
            pain = document.getElementById("pain-High").value;
        }

        if (document.getElementById("stress-Low").checked) {
            stress = document.getElementById("stress-Low").value;
        }
        if (document.getElementById("stress-Medium").checked) {
            stress = document.getElementById("stress-Medium").value;
        }
        if (document.getElementById("stress-High").checked) {
            stress = document.getElementById("stress-High").value;
        }

        if (document.getElementById("stool-Hard").checked) {
            stool = document.getElementById("stool-Hard").value;
        }
        if (document.getElementById("stool-Medium").checked) {
            stool = document.getElementById("stool-Medium").value;
        }
        if (document.getElementById("stool-Soft").checked) {
            stool = document.getElementById("stool-Soft").value;
        }

        if (document.getElementById("bowel-light").checked) {
            bowelm = document.getElementById("bowel-light").value;
        }
        if (document.getElementById("bowel-Medium").checked) {
            bowelm = document.getElementById("bowel-Medium").value;
        }
        if (document.getElementById("bowel-heavy").checked) {
            bowelm = document.getElementById("bowel-heavy").value;
        }

        if (document.getElementById("1-4").checked) {
            bowelf = document.getElementById("1-4").value;
        }
        if (document.getElementById("5-8").checked) {
            bowelf = document.getElementById("5-8").value;
        }
        if (document.getElementById("9OrMore").checked) {
            bowelf = document.getElementById("9OrMore").value;
        }

        if (document.getElementById("1-2").checked) {
            bvisit = document.getElementById("1-2").value;
        }
        if (document.getElementById("3-4").checked) {
            bvisit = document.getElementById("3-4").value;
        }
        if (document.getElementById("5OrMore").checked) {
            bvisit = document.getElementById("5OrMore").value;
        }


        var symptomdata = [{
            "username": username,
            "day": day,
            "date": date,
            "pain": pain,
            "stress": stress,
            "stool": stool,
            "bowelm": bowelm,
            "bowelf": bowelf,
            "bvisit": bvisit,
            "created_date": created_date
        }];

        //POST STATEMENT FOR SYMPTOMS
        $.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
            data: JSON.stringify(symptomdata),
            accept: "application/json",
            contentType: "application/json",
            method: "POST",
            success: function () {
                console.log("Day added");
                //dateList.push(date);
                console.log(symptomdata);
                //if(isInArray(dateList, date)){
                //    document.getElementById("submitData").disabled = true;
                //}
                //console.log(dateList);

                document.getElementById("popup2-title").innerHTML = "Success";
                document.getElementById("popup2-content").innerHTML = "Your Symptoms for the day has been successfully added.";
                location.href = "#popup2";
            },
            error: function () {
                console.log("Not added");

                document.getElementById("popup2-title").innerHTML = "Error";
                document.getElementById("popup2-content").innerHTML = "Unfortunately an error occured while trying to add your Symptoms for the day. Please Try again.";
                location.href = "#popup2";
            }
        });

    });

    //POST STATEMENT FOR DOCDATA
    $("#submitDocData").click(function () {
        var medication = document.getElementById("medicationName").value;
        var dosage = document.getElementById("dosageNum").value;
        var dosageMeasure = document.getElementById("medsDoseSel");
        var dosageMeasureValue = document.getElementById("medsDoseSel").value;
        var comment = document.getElementById("meds-comment").value;
        var complete = document.getElementById("healthtracker_prescription").checked;
        
        console.log("complete value: " + complete);

        var docdata = [{
            "username": username,
            "date": date,
            "medication": medication,
            "dosage": dosage,
            "comment": comment,
            "complete": complete,
            "created_date": created_date
        }];

        $.ajax("https://fast-garden-93601.herokuapp.com/api/doclogs", {
            data: JSON.stringify(docdata),
            accept: "application/json",
            contentType: "application/json",
            method: "POST",
            success: function () {
                console.log("Day added");
                console.log(docdata);
                console.log(docdata);

                document.getElementById("popup2-title").innerHTML = "Success";
                document.getElementById("popup2-content").innerHTML = "Your Doctor's Log for the day has been successfully added.";
                location.href = "#popup2";
            },
            error: function () {
                console.log("Not added");

                document.getElementById("popup2-title").innerHTML = "Error";
                document.getElementById("popup2-content").innerHTML = "Unfortunately an error occured while trying to add your Doctor's Log for the day. Please Try again.";
                location.href = "#popup2";
            }
        });
    });

    //GET ALL SYMPTOM DATA
    $("#getData").click(function () {
        $.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
            data: { get_param: 'value' },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, element) {
                    console.log(element);
                });
            }
        });
    });

    //GET SYMPTOM DATA   
    $("#getAllSymptomData").click(function () {
        $.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
            data: { get_param: 'value' },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#symptomTable').empty();
                $.each(data, function (index, element) {
                    if (element.username == username) {
                        console.log(element);
                        var tr = (
                            '<tr>' +
                            '<td>' + element.date.toString().substring(0, 10) +
                            '<td>' + element.day + ' ' +
                            '<td>' + element.pain + ' ' +
                            '<td>' + element.stress + ' ' +
                            '<td>' + element.stool + ' ' +
                            '<td>' + element.bowelm + ' ' +
                            '<td>' + element.bowelf + ' ' +
                            '<td>' + element.bvisit + ' </tr>'
                        );
                        $('#symptomTable').append(tr);
                    }
                });
                if (x2.style.display === 'none') {
                    x2.style.display = 'block';
                }
            },
            error: function () {
                console.log("Data missing");
            }
        });
    });



    var graph = document.getElementById('graph');
    $("#getGraphData").click(function () {
        $("#showGraph").show();
        $.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
            data: { get_param: 'value' },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#graphTable').empty();
                $.each(data, function (index, element) {
                    if (element.username == username) {
                        console.log(element);

                        if (element.day == "good") {
                            var dayGraph = 3;
                        }
                        if (element.day == "okay") {
                            dayGraph = 2;
                        }
                        if (element.day == "bad") {
                            dayGraph = 1;
                        }
                        if (element.day == undefined) {
                            dayGraph = "";
                        }
                        if (element.pain == "Low") {
                            var painGraph = 1;
                        }
                        if (element.pain == "Medium") {
                            painGraph = 2;
                        }
                        if (element.pain == "High") {
                            painGraph = 3;
                        }
                        if (element.pain == undefined) {
                            painGraph = "";
                        }
                        if (element.stress == "Low") {
                            var stressGraph = 1;
                        }
                        if (element.stress == "Medium") {
                            stressGraph = 2;
                        }
                        if (element.stress == "High") {
                            stressGraph = 3;
                        }
                        if (element.stress == undefined) {
                            stressGraph = "";
                        }
                        if (element.stool == "Soft") {
                            var stoolGraph = 1;
                        }
                        if (element.stool == "Medium") {
                            stoolGraph = 2;
                        }
                        if (element.stool == "Hard") {
                            stoolGraph = 3;
                        }
                        if (element.stool == undefined) {
                            stoolGraph = "";
                        }
                        if (element.bowelm == "Light") {
                            var bowelmGraph = 1;
                        }
                        if (element.bowelm == "Medium") {
                            bowelmGraph = 2;
                        }
                        if (element.bowelm == "Heavy") {
                            bowelmGraph = 3;
                        }
                        if (element.bowelm == undefined) {
                            bowelmGraph = "";
                        }
                        if (element.bowelf == "1-4") {
                            var bowelfGraph = 1;
                        }
                        if (element.bowelf == "5-8") {
                            bowelfGraph = 2;
                        }
                        if (element.bowelf == "9OrMore") {
                            bowelfGraph = 3;
                        }
                        if (element.bowelf == undefined) {
                            bowelfGraph = "";
                        }
                        if (element.bvisit == "1-2") {
                            var bvisitGraph = 1;
                        }
                        if (element.bvisit == "3-4") {
                            bvisitGraph = 2;
                        }
                        if (element.bvisit == "5 or more") {
                            bvisitGraph = 3;
                        }
                        if (element.bvisit == undefined) {
                            bvisitGraph = "";
                        }

                        var tr = (
                            '<tr>' +
                            '<td>' + element.date.toString().substring(0, 10) +
                            '<td>' + dayGraph + ' ' +
                            '<td>' + painGraph + ' ' +
                            '<td>' + stressGraph + ' ' +
                            '<td>' + stoolGraph + ' ' +
                            '<td>' + bowelmGraph + ' ' +
                            '<td>' + bowelfGraph + ' ' +
                            '<td>' + bvisitGraph + ' '
                            + '</tr>'
                        );
                        $('#graphTable').append(tr);
                    }
                });
                if (x4.style.display === 'none') {
                    x4.style.display = 'block';
                }
            },
            error: function () {
                console.log("Data missing");
            }
        });
    });

    //GET ALL DOCLOG DATA
    // $("#getAllDoclogData").click(function() {
    //     $.ajax("https://fast-garden-93601.herokuapp.com/api/doclog", {
    //         data: { get_param: 'value' }, 
    //         type: 'GET',  
    //         dataType: 'json',
    //         success: function (data) { 
    //             $.each(data, function(index, element) {
    //                 console.log(element);
    //             });
    //         }
    //     });
    // });


    //End of Document on load 
});

//GET HEALTH TRACKER FOR SPECIFIC DATE
function getForDate() {
    $.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
        data: { get_param: 'value' },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, element) {
                if (element.username == username) {
                    console.log("elemtn.date: "+element.date.toString().substring(0, 10));
                    var datadate = element.date.toString().substring(0, 10); 
                    var pickerDate = document.getElementById('datepicker').value;
                    console.log("DATE ARRAY: " + pickerDate);
                    var splitDate = pickerDate.split("/");
                    var newdate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
                    console.log("newdate: "+newdate);
                    if (datadate == newdate) {
                        //alert(datadate);
                        //    alert("Data exists");
                        //alert(newdate);
                        //alert(JSON.stringify(element));
                        document.getElementById("submitData").disabled = true;
                        if (element.day == "good") {
                            document.getElementById("good").checked = true;
                            $("#toggleReveal-day").slideDown();
                        }else if (element.day == "okay") {
                            document.getElementById("okay").checked = true;
                            $("#toggleReveal-day").slideDown();
                        }else if (element.day == "bad") {
                            document.getElementById("bad").checked = true;
                            $("#toggleReveal-day").slideDown();
                        }

                        if (element.pain == "Low") {
                            document.getElementById("pain-Low").checked = true;
                            $("#toggleReveal-pain").slideDown();
                        }else if (element.pain == "Medium") {
                            document.getElementById("pain-Medium").checked = true;
                            $("#toggleReveal-pain").slideDown();
                        }else if (element.pain == "High") {
                            document.getElementById("pain-High").checked = true;
                            $("#toggleReveal-pain").slideDown();
                        }

                        if (element.stress == "Low") {
                            document.getElementById("stress-Low").checked = true;
                            $("#toggleReveal-stress").slideDown();
                        }else if (element.stress == "Medium") {
                            document.getElementById("stress-Medium").checked = true;
                            $("#toggleReveal-stress").slideDown();
                        }else if (element.stress == "High") {
                            document.getElementById("stress-High").checked = true;
                            $("#toggleReveal-stress").slideDown();
                        }

                        if (element.stool == "Soft") {
                            document.getElementById("stool-Soft").checked = true;
                            $("#toggleReveal-stool").slideDown();
                        }else if (element.stool == "Medium") {
                            document.getElementById("stool-Medium").checked = true;
                            $("#toggleReveal-stool").slideDown();
                        }else if (element.stool == "Hard") {
                            document.getElementById("stool-Hard").checked = true;
                            $("#toggleReveal-stool").slideDown();
                        }

                        if (element.bowelm == "Light") {
                            document.getElementById("bowel-light").checked = true;
                            $("#toggleReveal-movement").slideDown();
                        }else if (element.bowelm == "Medium") {
                            document.getElementById("bowel-Medium").checked = true;
                            $("#toggleReveal-movement").slideDown();
                        }else if (element.bowelm == "Heavy") {
                            document.getElementById("bowel-heavy").checked = true;
                            $("#toggleReveal-movement").slideDown();
                        }

                        if (element.bowelf == "1-4") {
                            document.getElementById("1-4").checked = true;
                            $("#toggleReveal-frequency").slideDown();
                        }else if (element.bowelf == "5-8") {
                            document.getElementById("5-8").checked = true;
                            $("#toggleReveal-frequency").slideDown();
                        }else if (element.bowelf == "9OrMore") {
                            document.getElementById("9OrMore").checked = true;
                            $("#toggleReveal-frequency").slideDown();
                        }

                        if (element.bvisit == "1-2") {
                            document.getElementById("1-2").checked = true;
                        }else if (element.bvisit == "3-4") {
                            document.getElementById("3-4").checked = true;
                        }else if (element.bvisit == "5OrMore") {
                            document.getElementById("5OrMore").checked = true;
                        }
                        
                        document.getElementById("good").disabled = true;
                        document.getElementById("okay").disabled = true;
                        document.getElementById("bad").disabled = true;
                        document.getElementById("pain-Low").disabled = true;
                        document.getElementById("pain-Medium").disabled = true;
                        document.getElementById("pain-High").disabled = true;
                        document.getElementById("stress-Low").disabled = true;
                        document.getElementById("stress-Medium").disabled = true;
                        document.getElementById("stress-High").disabled = true;
                        document.getElementById("stool-Soft").disabled = true;
                        document.getElementById("stool-Medium").disabled = true;
                        document.getElementById("stool-Hard").disabled = true;
                        document.getElementById("bowel-light").disabled = true;
                        document.getElementById("bowel-Medium").disabled = true;
                        document.getElementById("bowel-heavy").disabled = true;
                        document.getElementById("1-4").disabled = true;
                        document.getElementById("5-8").disabled = true;
                        document.getElementById("9OrMore").disabled = true;
                        document.getElementById("1-2").disabled = true;
                        document.getElementById("3-4").disabled = true;
                        document.getElementById("5OrMore").disabled = true;
                        document.getElementById("submitDiv").style.display = "none";

                        return false;
                    } else {
                        console.log("No data for this date");
                        document.getElementById("good").checked = false;
                        document.getElementById("submitDiv").style.display = "block";
                        document.getElementById("submitData").disabled = false;

                        document.getElementById("good").disabled = false;
                        document.getElementById("okay").disabled = false;
                        document.getElementById("bad").disabled = false;
                        document.getElementById("pain-Low").disabled = false;
                        document.getElementById("pain-Medium").disabled = false;
                        document.getElementById("pain-High").disabled = false;
                        document.getElementById("stress-Low").disabled = false;
                        document.getElementById("stress-Medium").disabled = false;
                        document.getElementById("stress-High").disabled = false;
                        document.getElementById("stool-Soft").disabled = false;
                        document.getElementById("stool-Medium").disabled = false;
                        document.getElementById("stool-Hard").disabled = false;
                        document.getElementById("bowel-light").disabled = false;
                        document.getElementById("bowel-Medium").disabled = false;
                        document.getElementById("bowel-heavy").disabled = false;
                        document.getElementById("1-4").disabled = false;
                        document.getElementById("5-8").disabled = false;
                        document.getElementById("9OrMore").disabled = false;
                        document.getElementById("1-2").disabled = false;
                        document.getElementById("3-4").disabled = false;
                        document.getElementById("5OrMore").disabled = false;

                        if (element.bvisit == "1-2") {
                            document.getElementById("1-2").checked = false;
                        }else if (element.bvisit == "3-4") {
                            document.getElementById("3-4").checked = false;
                        }else if (element.bvisit == "5OrMore") {
                            document.getElementById("5OrMore").checked = false;
                        }

                        if (element.bowelf == "1-4") {
                            document.getElementById("1-4").checked = false;
                            $("#toggleReveal-frequency").slideUp();
                        }else if (element.bowelf == "5-8") {
                            document.getElementById("5-8").checked = false;
                            $("#toggleReveal-frequency").slideUp();
                        }else if (element.bowelf == "9OrMore") {
                            document.getElementById("9OrMore").checked = false;
                            $("#toggleReveal-frequency").slideUp();
                        }

                        if (element.bowelm == "light") {
                            document.getElementById("bowel-light").checked = false;
                            $("#toggleReveal-movement").slideUp();
                        }else if (element.bowelm == "Medium") {
                            document.getElementById("bowel-Medium").checked = false;
                            $("#toggleReveal-movement").slideUp();
                        }else if (element.bowelm == "heavy") {
                            document.getElementById("bowel-heavy").checked = false;
                            $("#toggleReveal-movement").slideUp();
                        }
                       
                        if (element.stool == "Soft") {
                            document.getElementById("stool-Soft").checked = false;
                            $("#toggleReveal-stool").slideUp();
                        }else if (element.stool == "Medium") {
                            document.getElementById("stool-Medium").checked = false;
                            $("#toggleReveal-stool").slideUp();
                        }else if (element.stool == "Hard") {
                            document.getElementById("stool-Hard").checked = false;
                            $("#toggleReveal-stool").slideUp();
                        }

                        if (element.stress == "Low") {
                            document.getElementById("stress-Low").checked = false;
                            $("#toggleReveal-stress").slideUp();
                        }else if (element.stress == "Medium") {
                            document.getElementById("stress-Medium").checked = false;
                            $("#toggleReveal-stress").slideUp();
                        }else if (element.stress == "Hard") {
                            document.getElementById("stress-High").checked = false;
                            $("#toggleReveal-stress").slideUp();
                        }

                        if (element.pain == "Low") {
                            document.getElementById("pain-Low").checked = false;
                            $("#toggleReveal-day").slideUp();
                        }else if (element.pain == "Medium") {
                            document.getElementById("pain-Medium").checked = false;
                            $("#toggleReveal-day").slideUp();
                        }else if (element.pain == "High") {
                            document.getElementById("pain-High").checked = false;
                            $("#toggleReveal-day").slideUp();
                        }

                        if (element.day == "good") {
                            document.getElementById("good").checked = false;
                            $("#toggleReveal-day").slideUp();
                        }else if (element.day == "okay") {
                            document.getElementById("okay").checked = false;
                            $("#toggleReveal-day").slideUp();
                        }else if (element.day == "bad") {
                            document.getElementById("bad").checked = false;
                            $("#toggleReveal-day").slideUp();
                        }

                        
                        $("#toggleReveal-frequency").slideUp();
                        $("#toggleReveal-movement").slideUp();
                        $("#toggleReveal-stool").slideUp();
                        $("#toggleReveal-stress").slideUp();
                        $("#toggleReveal-pain").slideUp();
                        $("#toggleReveal-day").slideUp();
                    }
                }
            });
        }
    });
}

//GET DIET LOG FOR SPECIFIC DAY
function getDoclog() {
    $.ajax("https://fast-garden-93601.herokuapp.com/api/doclogs", {
        data: { get_param: 'value' },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, element) {
                if (element.username == username) {
                    console.log(element.date);
                    console.log(element.date.toString().substring(0, 10));
                    var datadate = element.date.toString().substring(0, 10);
                    var pickerDate = document.getElementById('datepicker').value;
                    console.log("DATE ARRAY: " + pickerDate);
                    var splitDate = pickerDate.split("/");
                    var newdate = splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
                    console.log(newdate);
                    if (datadate == newdate) {
                        //    alert("Data exists");
                        document.getElementById("medicationName").value = element.medication;
                        document.getElementById("dosageNum").value = element.dosage;
                        document.getElementById("meds-comment").value = element.comment
                        document.getElementById("healthtracker_prescription").checked = element.complete;

                    }

                }
            });
        }
    });
}

function addToLogInput() {
    var foodnameInput = document.getElementById("foodnameInput");
    console.log("foodnameInput: "+foodnameInput);
    var selectorInput = document.getElementById("selector").value;
    foodnameInput.value = selectorInput;
}

function getBarcodeNum(){
    var str = document.getElementById("results").innerHTML;
    //console.log(str.substring(8, str.lastIndexOf("<br>F")));
    var barcodeResult = str.substring(8, str.lastIndexOf("<br>F"));
    return barcodeResult;
}

function showFoodAdd() {
    $("#foodDatabase").show();
    $("#showFoodAdd").hide();
}

$("#close").click(function () {
    x.style.display = 'none';
    $("#tablebody").empty();

});

$("#close2").click(function () {
    x2.style.display = 'none';
    $("#tablebody2").empty();

});

$("#close3").click(function () {
    x3.style.display = 'none';
    $("#tablebody3").empty();

});

$("#close4").click(function () {
    x4.style.display = 'none';
    $("#tablebody4").empty();
    $("#showGraph").hide();

});

$("#showGraph").click(function () {
    makeChart9();
});

function isInArray(array, search) {
    return array.indexOf(search) >= 0;
}

window.onload = function() {
  createChart();
}
