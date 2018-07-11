
$("#registerButton").click(function () {
    $("#loginBlock").hide();
    $("#registerBlock").show();
});

$("#loginButton").click(function () {
    $("#registerBlock").hide();
    $("#loginBlock").show();
});

$('.dropdown-menu').on('click', function (event) {
    var events = $._data(document, 'events') || {};
    events = events.click || [];

    for (var i = 0; i < events.length; i++) {
        if (events[i].selector) {

            
            if ($(event.target).is(events[i].selector)) {
                events[i].handler.call(event.target, event);
            }

            $(event.target).parents(events[i].selector).each(function () {
                events[i].handler.call(this, event);
            });
        }
    }
    event.stopPropagation();
});