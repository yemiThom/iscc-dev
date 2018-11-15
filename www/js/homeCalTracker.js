 var dateList=[]; 
 var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
 var date = new Date();
  var today = new Date(); 
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy +'-'+ mm+ '-' +dd;
    $('#datepicker').attr('value', today);
$(function () {
    $('#datepicker').val(date.toLocaleDateString("en-en"));

    $('#cal-prev').click(function () {
        date.setDate(date.getDate() - 1);
        $('#datepicker').val(date.toLocaleDateString("en-en", options));
		getForDate();
    });
	
    $('#cal-next').click(function () {
        date.setDate(date.getDate() + 1);
        $('#datepicker').val(date.toLocaleDateString("en-en", options));
    });
}); 

$(document).ready(function(){
  
    



//ADD SYMPTOMS

  $("#submitData").click(function() {

    //Sumbit health tracker data for particular day
    

        var username = document.getElementById("email_value").innerHTML;
        
        //  var day = "good";
        var pain;
        var stress;
        var stool;
        var bowelm;

        var bowelf;
        var bvisit;


        var created_date = new Date();

        var healthTrackerLUDescipt;
        var healthTrackerLUPain;

        var healthTrackerDIDescipt;
        var healthTrackerDIPain;

        var healthTrackerMedName;
        var healthTrackerMedsDoseNum;
        var healthTrackerMedsSelect;
        var healthTrackerMedsSelectVal;
        var healthTrackerMedsComments;
        var healthTrackerCompletePrescipt;

        var healthTrackerContentData1;
        var healthTrackerContentData2;


        if(document.getElementById("good").checked){
            day = document.getElementById("good").value;
        }
        if(document.getElementById("okay").checked){
            day = document.getElementById("okay").value;
        }
        if(document.getElementById("bad").checked){
            day = document.getElementById("bad").value;
        }
        
        if(document.getElementById("pain-low").checked){
            pain = document.getElementById("pain-low").value;
        }
        if(document.getElementById("pain-medium").checked){
            pain = document.getElementById("pain-medium").value;
        }
        if(document.getElementById("pain-high").checked){
            pain = document.getElementById("pain-high").value;
        }

        if(document.getElementById("stress-low").checked){
            stress = document.getElementById("stress-low").value;
        }
        if(document.getElementById("stress-medium").checked){
            stress = document.getElementById("stress-medium").value;
        }
        if(document.getElementById("stress-high").checked){
            stress = document.getElementById("stress-high").value;
        }

        if(document.getElementById("stool-hard").checked){
            stool = document.getElementById("stool-hard").value;
        }
        if(document.getElementById("stool-medium").checked){
            stool = document.getElementById("stool-medium").value;
        }
        if(document.getElementById("stool-soft").checked){
            stool = document.getElementById("stool-soft").value;
        }

        if(document.getElementById("bowel-light").checked){
            bowelm = document.getElementById("bowel-light").value;
        }
        if(document.getElementById("bowel-medium").checked){
            bowelm = document.getElementById("bowel-medium").value;
        }
        if(document.getElementById("bowel-heavy").checked){
            bowelm = document.getElementById("bowel-heavy").value;
        }

        if(document.getElementById("1-4").checked){
            bowelf = document.getElementById("1-4").value;
        }
        if(document.getElementById("5-8").checked){
            bowelf = document.getElementById("5-8").value;
        }
        if(document.getElementById("9OrMore").checked){
            bowelf = document.getElementById("9OrMore").value;
        }

        if(document.getElementById("1-2").checked){
            bvisit = document.getElementById("1-2").value;
        }
        if(document.getElementById("3-4").checked){
            bvisit = document.getElementById("3-4").value;
        }
        if(document.getElementById("5OrMore").checked){
            bvisit = document.getElementById("5OrMore").value;
        }




        var data = [{
                "username":username, 
                "date":date, 
                "pain":pain,
                "stress":stress, 
                "stool":stool, 
                "bowelm":bowelm, 
                "bowelf":bowelf, 
                "bvisit":bvisit, 
                "created_date":created_date
            }];

        

$.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
        data: JSON.stringify(data),
        accept: "application/json",
        contentType: "application/json",
        method: "POST",
        success: function () {
            alert("Day added");
            dateList.push(date);
			console.log(data);
            //if(isInArray(dateList, date))
        {
            document.getElementById("submitData").disabled = true;       
        }
            console.log(dateList);
        },
        error: function(){
                alert("Not added");
            }
    });



    });


//GET ALL DATA
$("#getAllData").click(function() {


$.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
    data: { get_param: 'value' }, 
    type: 'GET',  
    dataType: 'json',
    success: function (data) { 
        $.each(data, function(index, element) {
            console.log(element);
            
        });
    }
});

});
//Get for specific date

   });
	
	function getForDate(){
	//$("#getData").click(function() {


		$.ajax("https://fast-garden-93601.herokuapp.com/api/symptoms", {
			data: { get_param: 'value' }, 
			type: 'GET',  
			dataType: 'json',
			success: function (data) { 
				$.each(data, function(index, element) {
					if(element.username == "testuser"){
					console.log(element);
					console.log(element.date.toString().substring(0,10));
					var datadate = element.date.toString().substring(0,10)
					var datearray = document.getElementById("datepicker").value.split("/");
					var newdateorder = datearray[2] + '/' + datearray[0] + '/' + datearray[1];
					var newdate = newdateorder.replace(/\//g, '-');
					console.log(newdate);
						if (datadate = newdate){
							alert("Data exists");
						}else{
							alert("No Data for this date");
						}
					}
				})
			}

		});
	//});
	}

	function isInArray(array, search)
{
    return array.indexOf(search) >= 0;
}