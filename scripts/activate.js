$(function() {
    console.log(JSON.stringify({"code": getCode(window.location.href)}));
    $.ajax({
        type: "PUT",
        contentType: 'application/json',
        url: rootURL + '/activate',
        dataType: "json",
        data: JSON.stringify({"code": getCode(window.location.href)}),
        success: function (data) {
            if (!data.error) {
                $("#message").html(data.message);
                $("#sign-up-link").html("You can sign up <a href='#' onclick='RedirectURL();return false;'>here</a> or on mobile.");
            } else {
                $("#message").html(data.message);
            }
        } 
    });
});


function RedirectURL()
{
    window.location= createDynamicURL();
}

function createDynamicURL()
{
    return "/Website/signup/" + getCode(window.location.href);
}