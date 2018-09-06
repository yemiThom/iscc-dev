$(function() {
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
});