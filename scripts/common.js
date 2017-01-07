// The root URL for the RESTful services
var rootURL = "http://75.128.92.169:8080/CCService/v1/index.php";

// Logout callback to API
function logOut(){
    console.log('log out');
    $.ajax({
        type: "GET",
        contentType: 'application/json',
        url: rootURL + '/logout',
        dataType: "json",
        success: function(data){
            console.log(data.message);
        }
    })
}

// Session callback to API
function whoIs(){
    $.ajax({
        type: "GET",
        contentType: 'application/json',
        url: rootURL + '/member',
        dataType: "json",
        success: function(data){
            if (!data.error){
                profilePopulation(data.id.memberId);
            }
            else{
                console.log("You are not logged in");
            }
        }
    })
}