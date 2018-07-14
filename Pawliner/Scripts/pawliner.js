
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

$(function () {

    var tokenKey = "tokenInfo";

    $('#submitRegister').click(function (e) {
        e.preventDefault();
        var data = {
            UserName: $('#login').val(),
            Email: $('#email').val(),
            Password: $('#password').val(),
            ConfirmPassword: $('#confirmPassword').val()
        };

        var loginData = {
            grant_type: 'password',
            UserName: $('#login').val(),
            Password: $('#password').val()
        }

        $.ajax({
            type: 'POST',
            url: '/api/Account/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: $.ajax({
                type: 'POST',
                url: '/Token',
                data: loginData,
                success: function (data) {
                    $('#username').text(data.userName);

                    $('#userInfoBlock').css('display', 'block');
                    $('#loginBlock').css('display', 'none');

                    sessionStorage.setItem(tokenKey, data.access_token);
                },
                error: function (data) {
                    alert("Ошибка входа");
                }
            }),
            error: function(data) {
                alert("В процесе регистрации возникла ошибка");
            }
        });
    });
})

$(function () {

    var tokenKey = "tokenInfo";

    $('#submitLogin').click(function (e) {
        e.preventDefault();

        var loginData = {
            grant_type: 'password',
            UserName: $('#usernameLogin').val(),
            Password: $('#passwordLogin').val()
        };

        $.ajax({
            type: 'POST',
            url: '/Token',
            data: loginData,
            success: function (data) {
                $('#username').text(data.userName);

                $('#userInfoBlock').css('display', 'block');
                $('#loginBlock').css('display', 'none');

                sessionStorage.setItem(tokenKey, data.access_token);
            },
            error: function (data) {
                alert("Ошибка входа");
            }
        });
    });

    $('#logout').click(function (e) {
        e.preventDefault();

        $("#userInfoBlock").css('display', 'none');
        $("#loginBlock").css('display', 'block');

        sessionStorage.removeItem(tokenKey);
    });
})
