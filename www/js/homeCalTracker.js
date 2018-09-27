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
document.getElementById("htOutput").innerHTML = localStorage.getItem("test");
// Show local storage data in results element

/** save input datas **/
function saveHTInputData() {
    var healthtrackerDay;
    var healthtrackerSymptoms;
    var healthtrackerBowels;

    var healthtrackerBFDescipt;
    var healthtrackerBFPain;

    var healthtrackerLUDescipt;
    var healthtrackerLUPain;

    var healthtrackerDIDescipt;
    var healthtrackerDIPain;

    var healthTrackerMedName;
    var healthTrackerMedsDoseNum;
    var healthTrackerMedsSelect;
    var healthtrackerMedsSelectVal;
    var healthTrackerMedsComments;
    var healthTrackerCompletePrescipt;

    var healthTrackerContentData;

    if(document.getElementById("good").checked){
        healthtrackerDay = document.getElementById("good").val;
    }
    if(document.getElementById("okay").checked){
        healthtrackerDay = document.getElementById("okay").val;
    }
    if(document.getElementById("bad").checked){
        healthtrackerDay = document.getElementById("bad").val;
    }
    
    if(document.getElementById("abdominal-pain").checked){
        healthtrackerSymptoms = document.getElementById("abdominal-pain").val;
    }
    if(document.getElementById("cramping").checked){
        healthtrackerSymptoms = document.getElementById("cramping").val;
    }
    if(document.getElementById("fatigue").checked){
        healthtrackerSymptoms = document.getElementById("fatigue").val;
    }
    if(document.getElementById("headache").checked){
        healthtrackerSymptoms = document.getElementById("headache").val;
    }
    if(document.getElementById("nausea").checked){
        healthtrackerSymptoms = document.getElementById("nausea").val;
    }
    if(document.getElementById("vomitting").checked){
        healthtrackerSymptoms = document.getElementById("vomitting").val;
    }

    if(document.getElementById("hardLumps").checked){
        healthtrackerSymptoms = document.getElementById("hardLumps").val;
    }
    if(document.getElementById("lumpySausage").checked){
        healthtrackerSymptoms = document.getElementById("lumpySausage").val;
    }
    if(document.getElementById("crackedSausage").checked){
        healthtrackerSymptoms = document.getElementById("crackedSausage").val;
    }
    if(document.getElementById("snake").checked){
        healthtrackerSymptoms = document.getElementById("snake").val;
    }
    if(document.getElementById("softBlobs").checked){
        healthtrackerSymptoms = document.getElementById("softBlobs").val;
    }
    if(document.getElementById("mushy").checked){
        healthtrackerSymptoms = document.getElementById("mushy").val;
    }
    if(document.getElementById("liquid").checked){
        healthtrackerSymptoms = document.getElementById("liquid").val;
    }

    healthtrackerBFDescipt = document.getElementById("healthtracker_describe-bf").value;
    healthtrackerBFPain = document.getElementById("healthtracker_pain-bf").value;

    healthtrackerLUDescipt = document.getElementById("healthtracker_describe-lu").value;
    healthtrackerLUPain = document.getElementById("healthtracker_pain-lu").value;

    healthtrackerDIDescipt = document.getElementById("healthtracker_describe-di").value;
    healthtrackerDIPain = document.getElementById("healthtracker_pain-di").value;

    healthtrackerMedsSelect = document.getElementById("medsDoseSel");
    healthtrackerMedsSelectVal = healthtrackerMedsSelect.options[healthtrackerMedsSelect.selectedIndex].text;

    //console.log(healthtrackerBFDescipt);

    healthTrackerContentData = healthtrackerDay + " " + healthtrackerSymptoms + " " + healthtrackerBowels + " " + healthtrackerBFDescipt + " " + healthtrackerBFPain + " " + healthtrackerLUDescipt + " " + healthtrackerLUPain
    + " " + healthtrackerDIDescipt + " " + healthtrackerDIPain + " " + healthTrackerMedName + " " + healthTrackerMedsDoseNum + " " + healthtrackerMedsSelectVal + " " + healthTrackerMedsComments + " " + healthTrackerCompletePrescipt;

    localStorage.setItem("test", healthTrackerContentData);
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