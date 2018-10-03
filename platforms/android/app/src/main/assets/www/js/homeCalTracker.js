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
    if(document.getElementById("bowel-high").checked){
        healthtrackerBowels = document.getElementById("bowel-high").value;
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
    console.log(localStorage.getItem("test"));
    //var blob = new Blob([healthTrackerContentData], {type: "text/plain;charset=utf-8"});
    //saveAs(blob, "test.txt");
    /*var content, text = document.getElementsByName("text")[0].value;
    var pic = document.getElementById("pic").value, filename = document.getElementsByName("name")[0].value;
    content = text + "<br><br>" + pic;

    var a = document.getElementById("a");
    var file = new Blob([content], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = filename + ".txt";*/
}

/*; (function ($) {
    $.fn.toJSON = function () {
        var $elements = {};
        var $form = $(this);
        $form.find('input, select, textarea').each(function () {
            var name = $(this).attr('name')
            var type = $(this).attr('type')
            if (name) {
                var $value;
                if (type == 'radio') {
                    $value = $('input[name=' + name + ']:checked', $form).val()
                } else if (type == 'checkbox') {
                    $value = $(this).is(':checked')
                } else {
                    $value = $(this).val()
                }
                $elements[$(this).attr('name')] = $value
            }
        });
        return JSON.stringify($elements)
    };
    $.fn.fromJSON = function (json_string) {
        var $form = $(this)
        var data = JSON.parse(json_string)
        $.each(data, function (key, value) {
            var $elem = $('[name="' + key + '"]', $form)
            var type = $elem.first().attr('type')
            if (type == 'radio') {
                $('[name="' + key + '"][value="' + value + '"]').prop('checked', true)
            } else if (type == 'checkbox' && (value == true || value == 'true')) {
                $('[name="' + key + '"]').prop('checked', true)
            } else {
                $elem.val(value)
            }
        })
    };
}(jQuery));

$(document).ready(function () {
    $("#submit").on('click', function () {
        console.log("Saving form data...")
        var data = $("form#healthtracker_day").toJSON()
        console.log(data);
        localStorage['form_data'] = data;

        return false;
    })

    $("#_load").on('click', function () {
        if (localStorage['form_data']) {
            console.log("Loading form data...")
            console.log(JSON.parse(localStorage['form_data']))
            $("form#healthtracker_day").fromJSON(localStorage['form_data'])
        } else {
            console.log("Error: Save some data first")
        }

        return false;
    })
});*/

/** End save input datas **/

/*var trackerData = new Array();

window.onload = init;

function init(){
    var submitbitton = document.getElementById("submit");
    submitbitton.onclick = getFormData;
    //getTrackerData();
}

function getFormData(){

}*/


/*$(function() {
    $(document).ready(function() {
    // load event sinto json
    var events = [
        {
        title: "Zauberware Technologies Team Event",
        localeStartDate: "2018-10-20",
        localeStartTime: "18:00",
        localeEndDate: "2018-10-20",
        localeEndTime: "20:00",
        date: "2018-10-20",
        url: "http://www.zauberware.com/"
        },
        {
        title: "JS User Group",
        localeStartDate: "2018-10-25",
        localeStartTime: "18:00",
        localeEndDate: "2018-10-25",
        localeEndTime: "20:00",
        date: "2018-10-25",
        url: "http://www.zauberware.com/"
        }
    ];

        $(".daySlider").clndr({
        // Start the week on Monday (1), instead of Sunday (0)
        weekOffset: 1,
        // Use the 'touchstart' event instead of 'click'
        useTouchEvents: false,
        // An array of event objects
        events: events,
        clickEvents: {
            click: function(target) {
            if (target.events.length > 0) {
                window.location = target.events[0].url;
            }
            }
        },

        startWithMonth: "2018-10-20",

        doneRendering: function() {
            $(".daySlider")
            .find(".clndr-next-button")
            .text("");
            $(".daySlider")
            .find(".clndr-previous-button")
            .text("");
            $(".calendar-day-2018-10-20").addClass("selected");
        }
        });
    });
});*/