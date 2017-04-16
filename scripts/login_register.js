// Validate email
function emailCheck(email){
    //TODO toook out email check for testing
    //if (email.includes("@") && email.endsWith(".edu")){
    if (email.includes("@")){
        return true;
    }
    return false;
}

// Login request
$(function() {
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        var email = document.getElementById("loginEmail").value;
        var validEmail = emailCheck(email);
        if (validEmail) {
            $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: rootURL + '/login',
                dataType: "json",
                data: loginFormToJSON(),
                success: function(data){
                    if(!data.error) {
                        window.location.href = "/Website/home/";
                    } else {
                        $('#loginPassword').effect( "shake", {times:4}, 1000 );
                        $("#error").html(data.message);
                    }
                }
            });
        } else {
            $('#loginEmail').effect( "shake", {times:4}, 1000 );
            $("#error").html("Invalid email address");
        }
    });
});

// Login form to a JSON
function loginFormToJSON() {
    return JSON.stringify({
        "email": $('#loginEmail').val(),
        "password": $('#loginPassword').val()
    });
}

// Register request
$(function() {
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        var email = document.getElementById("registerEmail").value;
        var validEmail = emailCheck(email);
        if (validEmail){
            $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: rootURL + '/register',
                dataType: "json",
                data: registerFormToJSON(),
                success: function(data){
                    console.log(data);
                    if(!data.error) {
                        $("#error").html("");
                        $("#success").html(data.message);
                    } else {
                        $("#error").html(data.message);
                        $("#success").html("");
                    }
                }
            });
        } else {
            $('#registerEmail').effect( "shake", {times:4}, 1000 );
            $("#error").html("Invalid email address");
        }
    });
});

// Register form to a JSON
function registerFormToJSON() {
    return JSON.stringify({
        "email": $('#registerEmail').val()
    });
}

// Sign up request
$(function() {
    $('#signUpForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: rootURL + '/signup',
            dataType: "json",
            data: signUpFormToJSON(),
            success: function(data){
                if(!data.error) {
                    window.location.href = "/Website/home/";
                } else {
                    $("#error").html(data.message);
                }
            }
        });
    });
});

// Sign up form to JSON
function signUpFormToJSON() {
    return JSON.stringify({
        "code": getCode(window.location.href),
        "firstname": $('#firstname').val(),
        "lastname": $('#lastname').val(),
        "password": $('#password').val(),
        "city": $('#city').val(),
        "state": $('#state').val(),
        "school": $('#school').val(),
        "major": $('#major').val(),
        "minor": $('#minor').val(),
        "dob": getDob(),
        "gender": $('input[name=gender]:checked').val()
    });
}

function getDob() {
    var month = $("#month").val();
    var day = $("#day").val();
    var year = $("#year").val();

    return (year + "/" + month + "/" + day);
}