// The root URL for the RESTful services
var rootURL = "http://75.128.92.169:8080/CCService/v1/index.php";
var defaultThumbnail = "http://placehold.it/620x400";
var defaultSubPic = "http://placehold.it/150x150";
var id;
var myBasicInfoVM = function (data) {
    var self = this;
    self.MyThumbnail = ko.observable(data.myPic);
    self.MyName = ko.observable(data.myName);
};

// Logout link
$(function() {
    $('#logoutLink').click(function (e) {
        e.preventDefault();
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
    });
});

// My profile link
$(function() {
    $('#myProfileLink').click(function () {
        document.getElementById("myProfileLink").href = "/Website/profile/" + id;
    });
});

// Session id callback
$(function() {
    $.ajax({
        type: "GET",
        contentType: 'application/json',
        url: rootURL + '/member',
        dataType: "json",
        success: function (data) {
            if (!data.error) {
                getId(data.id.memberId);
            }
        }
    })
});

function getId(data) {
    id = data;
}

// Compute age form dob
function getAge(date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}