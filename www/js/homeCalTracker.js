/*** Home Calendar Date Picker ***/

// add calendar pop-out when input text is focused on //
/*jQuery(function () {
    jQuery('#datepicker').datepicker();

    jQuery("input").bind("change", function () {
        console.error("change detected");
    });


});*/

var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
var date = new Date();

$(function () {
    $('#datepicker').val(date.toLocaleDateString("en-en", options));

    $('#cal-prev').click(function () {
        date.setDate(date.getDate() - 1);
        $('#datepicker').val(date.toLocaleDateString("en-en", options))
    });
    $('#cal-next').click(function () {
        date.setDate(date.getDate() + 1);
        $('#datepicker').val(date.toLocaleDateString("en-en", options))
    });
});

/*** End Home Calendar Date Picker ***/

// Show local storage data in results element
//localStorage.removeItem("test");
document.getElementById("htOutput").innerHTML = localStorage.getItem("test");
// Show local storage data in results element

/** save input datas **/
function saveHTInputData() {
    var healthTrackerDay;
    var healthTrackerPain;
    var healthTrackerStress;
    var healthTrackerStool;
    var healthTrackerBowels;

    var healthTrackerBFDescipt;
    var healthTrackerBFPain;

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
        console.log("good day has been checked");
        healthtrackerDay = document.getElementById("good").value;
    }
    if(document.getElementById("okay").checked){
        healthtrackerDay = document.getElementById("okay").value;
    }
    if(document.getElementById("bad").checked){
        healthtrackerDay = document.getElementById("bad").value;
    }
    
    if(document.getElementById("pain-low").checked){
        healthtrackerPain = document.getElementById("pain-low").value;
    }
    if(document.getElementById("pain-medium").checked){
        healthtrackerPain = document.getElementById("pain-medium").value;
    }
    if(document.getElementById("pain-high").checked){
        healthtrackerPain = document.getElementById("pain-high").value;
    }

    if(document.getElementById("stress-low").checked){
        healthtrackerStress = document.getElementById("stress-low").value;
    }
    if(document.getElementById("stress-medium").checked){
        healthtrackerStress = document.getElementById("stress-medium").value;
    }
    if(document.getElementById("stress-high").checked){
        healthtrackerStress = document.getElementById("stress-high").value;
    }

    if(document.getElementById("hard-lumps").checked){
        healthtrackerStool = document.getElementById("hard-lumps").value;
    }
    if(document.getElementById("lumpy-sausage").checked){
        healthtrackerStool = document.getElementById("lumpy-sausage").value;
    }
    if(document.getElementById("cracked-sausage").checked){
        healthtrackerStool = document.getElementById("cracked-sausage").value;
    }
    if(document.getElementById("snake").checked){
        healthtrackerStool = document.getElementById("snake").value;
    }
    if(document.getElementById("soft-blobs").checked){
        healthtrackerStool = document.getElementById("soft-blobs").value;
    }
    if(document.getElementById("mushy").checked){
        healthtrackerStool = document.getElementById("mushy").value;
    }
    if(document.getElementById("liquid").checked){
        healthtrackerStool = document.getElementById("liquid").value;
    }

    if(document.getElementById("bowel-light").checked){
        healthtrackerBowels = document.getElementById("bowel-light").value;
    }
    if(document.getElementById("bowel-medium").checked){
        healthtrackerBowels = document.getElementById("bowel-medium").value;
    }
    if(document.getElementById("bowel-heavy").checked){
        healthtrackerBowels = document.getElementById("bowel-heavy").value;
    }

    healthtrackerBFDescipt = document.getElementById("healthtracker_describe-bf").value;
    healthtrackerBFPain = document.getElementById("healthtracker_pain-bf").checked;

    healthtrackerLUDescipt = document.getElementById("healthtracker_describe-lu").value;
    healthtrackerLUPain = document.getElementById("healthtracker_pain-lu").checked;

    healthtrackerDIDescipt = document.getElementById("healthtracker_describe-di").value;
    healthtrackerDIPain = document.getElementById("healthtracker_pain-di").checked;

    healthTrackerMedName = document.getElementById("medicationName").value;
    healthTrackerMedsDoseNum = document.getElementById("dosageNum").value;
    healthtrackerMedsSelect = document.getElementById("medsDoseSel");
    healthtrackerMedsSelectVal = healthtrackerMedsSelect.options[healthtrackerMedsSelect.selectedIndex].text;
    healthTrackerMedsComments = document.getElementById("meds-comment").value;
    healthTrackerCompletePrescipt = document.getElementById("completePrescription").checked;


    //console.log(healthtrackerBFDescipt);

    healthTrackerContentData1 = "1: " + healthTrackerDay + "; 2: " + healthTrackerPain + "; 3: " + healthTrackerStress + "; 4: " + healthTrackerStool + "; 5: " + healthTrackerBowels + "; 6: " + healthTrackerBFDescipt + "; 7: " + healthTrackerBFPain;
    healthTrackerContentData2 = "; 8: " + healthTrackerLUDescipt + "; 9: " + healthTrackerLUPain + "; 10: " + healthTrackerDIDescipt + "; 11: " + healthTrackerDIPain + "; 12: " + healthTrackerMedName + "; 13: " + healthTrackerMedsDoseNum + "; 14: " + healthTrackerMedsSelectVal + "; 15: " + healthTrackerMedsComments + "; 16: " + healthTrackerCompletePrescipt;

    localStorage.setItem("test", healthTrackerContentData1 + healthTrackerContentData2);
    //var blob = new Blob([healthTrackerContentData], {type: "text/plain;charset=utf-8"});
    //saveAs(blob, "test.txt");
    /*var content, text = document.getElementsByName("text")[0].value;
    var pic = document.getElementById("pic").value, filename = document.getElementsByName("name")[0].value;
    content = text + "<br><br>" + pic;

    var a = document.getElementById("a");
    var file = new Blob([content], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = filename + ".txt";*/
	
    var textToSaveAsBlob = new Blob([healthTrackerContentData1], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
	var d = new Date();
 
    var downloadLink = document.createElement("a");
    downloadLink.download = "healthData " + d;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();

}
 
function destroyClickedElement(event){
    document.body.removeChild(event.target);
}