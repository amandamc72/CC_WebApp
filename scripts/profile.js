var profilevm;
var wasThumbnailClicked;
var hasChanged;

//Set on page load
$(function() {
    wasThumbnailClicked = false;
    hasChanged = false;
});


// Profile View Model
var ProfileVM = function (data){
    var self = this;
    self.thumbnail = ko.observable(data.thumbnail);
    self.image2 = ko.observable(data.picture[0].relPath);
    self.image3 = ko.observable(data.picture[1].relPath);
    self.image4 = ko.observable(data.picture[2].relPath);
    self.image5 = ko.observable(data.picture[3].relPath);
    self.image6 = ko.observable(data.picture[4].relPath);
    self.image7 = ko.observable(data.picture[5].relPath);
    self.name = ko.observable(data.name);
    self.city = ko.observable(data.city);
    self.state = ko.observable(data.state);
    self.school = ko.observable(data.school);
    self.standing = ko.observable(data.standing);
    self.major = ko.observable(data.major);
    self.minor = ko.observable(data.minor);
    self.age = ko.observable(data.age);
    self.about = ko.observable(data.about);
    self.courses = ko.observableArray(data.courses);
    self.interests = ko.observableArray(data.interests);

    self.newInterestText = ko.observable();
    self.newCourseText = ko.observable();

    self.addInterest = function() {
        self.interests.push({
            interestDescription: self.newInterestText().toString().toLowerCase(),
            interestLink: '/Website/search/'+self.newInterestText().toString().toLowerCase()+'/'
        });
        self.newInterestText("");
    };

    self.addCourse = function() {
        self.courses.push({
            courseName: self.newCourseText()
        });
        self.newCourseText("");
    };

    self.removeInterest = function(interest) {
        var data = JSON.stringify({
            "name": interest.interestDescription,
            "flag": "true"
        });
        $.ajax({
            type: 'DELETE',
            contentType: 'application/json',
            url: rootURL + '/remove',
            dataType: 'json',
            data: data,
            success: function (data) {
                console.log(data);
            }
        });
        self.interests.remove(interest);
    };

    self.removeCourse = function(course) {
        var data = JSON.stringify({
            "name": course.courseName,
            "flag": "false"
        });
        $.ajax({
            type: 'DELETE',
            contentType: 'application/json',
            url: rootURL + '/remove',
            dataType: 'json',
            data: data,
            success: function(data){
                console.log(data);
            }
        });
        self.courses.remove(course);
    };
};

// Get profile request
function profilePopulation(id){
    $.ajax({
        type: "GET",
        contentType: 'application/json',
        url: rootURL + '/profile/' + id,
        dataType: "json",
        success: function(data){
            if(!data.error) {
                //console.log(data);
                profilevm = new ProfileVM(data);
                ko.applyBindings(profilevm);
            }
        }
    });
}

//update image upload thumbnails on change
var openFile = function(event, id) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("image"+id.slice(-1)).src = e.target.result;
        if (id == "file1"){
            hasChanged = true;
        }
    };
    reader.readAsDataURL(input.files[0]);
};

//Upload photos request
$(function() {
    $('#image-upload-form').submit(function (e) {
        e.preventDefault();
        var form = $('form')[0];
        var data = new FormData(form);
        if(wasThumbnailClicked && hasChanged){
            data.append('isDefault', "true");
        }
        else{
            data.append('isDefault', "false");
        }

        $.ajax({
            type: "POST",
            url: rootURL + '/upload',
            cache: false,
            contentType: false,
            processData: false,
            data : data,
            success: function(data) {
                window.location.reload(true);
            }
        });
    });
});

//Set when thumbnail upload button is clicked
$(function() {
    $('#thumbnail-upload-button').click(function () {
        wasThumbnailClicked = true;
    });
});

//Set upload/delete buttons
$(function() {
    $('#image1').on('load', function(e) {
        if (ko.dataFor(e.target).thumbnail() == 'http://placehold.it/620x400'){
            $('#thumbnail-upload-button').show(); $('#thumbnail-delete-button').hide();
        }
        else{
            $('#thumbnail-upload-button').hide(); $('#thumbnail-delete-button').show();
        }
    });

    $('#image2').on('load', function(e) {
        if (ko.dataFor(e.target).image2() == 'http://placehold.it/150x150'){
            $('#image2-upload-button').show(); $('#image2-delete-button').hide();
        }
        else{
            $('#image2-upload-button').hide(); $('#image2-delete-button').show();
        }
    });

    $('#image3').on('load', function(e) {
        if (ko.dataFor(e.target).image3() == 'http://placehold.it/150x150'){
            $('#image3-upload-button').show(); $('#image3-delete-button').hide();
        }
        else{
            $('#image3-upload-button').hide(); $('#image3-delete-button').show();
        }
    });

    $('#image4').on('load', function(e) {
        if (ko.dataFor(e.target).image4() == 'http://placehold.it/150x150'){
            $('#image4-upload-button').show(); $('#image4-delete-button').hide();
        }
        else{
            $('#image4-upload-button').hide(); $('#image4-delete-button').show();
        }
    });

    $('#image5').on('load', function(e) {
        if (ko.dataFor(e.target).image5() == 'http://placehold.it/150x150'){
            $('#image5-upload-button').show(); $('#image5-delete-button').hide();
        }
        else{
            $('#image5-upload-button').hide(); $('#image5-delete-button').show();
        }
    });

    $('#image6').on('load', function(e) {
        if (ko.dataFor(e.target).image6() == 'http://placehold.it/150x150'){
            $('#image6-upload-button').show(); $('#image6-delete-button').hide();
        }
        else{
            $('#image6-upload-button').hide(); $('#image6-delete-button').show();
        }
    });

    $('#image7').on('load', function(e) {
        if (ko.dataFor(e.target).image7() == 'http://placehold.it/150x150'){
            $('#image7-upload-button').show(); $('#image7-delete-button').hide();
        }
        else{
            $('#image7-upload-button').hide(); $('#image7-delete-button').show();
        }
    });
});

//Delete photo request
$(function () {
    $(".delete-image-button").click(function(e) {
        e.preventDefault();
        var id = $(this).closest(".upload-thumbnail-wrapper").find(".img-thumbnail").attr("id");
        var img;
        switch(id){
            case "image1":
                img = ko.dataFor(e.target).thumbnail();
                break;
            case "image2":
                img = ko.dataFor(e.target).image2();
                break;
            case "image3":
                img = ko.dataFor(e.target).image3();
                break;
            case "image4":
                img = ko.dataFor(e.target).image4();
                break;
            case "image5":
                img = ko.dataFor(e.target).image5();
                break;
            case "image6":
                img = ko.dataFor(e.target).image6();
                break;
            case "image7":
                img = ko.dataFor(e.target).image7();
                break;
            default:
                break;
        }
        var src = JSON.stringify({"src": img});

        $.ajax({
            type: 'DELETE',
            url: rootURL + '/upload',
            contentType: 'application/json',
            dataType: 'json',
            data: src,
            success:function(data){
                console.log(data);
                switch(id){
                    case "image1":
                        ko.dataFor(e.target).thumbnail("http://placehold.it/620x400");
                        break;
                    case "image2":
                        ko.dataFor(e.target).image2("http://placehold.it/150x150");
                        break;
                    case "image3":
                        ko.dataFor(e.target).image3("http://placehold.it/150x150");
                        break;
                    case "image4":
                        ko.dataFor(e.target).image4("http://placehold.it/150x150");
                        break;
                    case "image5":
                        ko.dataFor(e.target).image5("http://placehold.it/150x150");
                        break;
                    case "image6":
                        ko.dataFor(e.target).image6("http://placehold.it/150x150");
                        break;
                    case "image7":
                        ko.dataFor(e.target).image7("http://placehold.it/150x150");
                        break;
                    default:
                        break;
                }
            }
        });
    });
});

//Update vm on upload pic change
$(function () {
    ko.bindingHandlers.fileSrc = {
        init: function (element, valueAccessor) {
            ko.utils.registerEventHandler(element, "change", function () {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var value = valueAccessor();
                    value(e.target.result);
                };
                reader.readAsDataURL(element.files[0]);
            });
        }
    };
});

//Update profile request
$(function() {
    $('#update_btn').click(function (e) {
        e.preventDefault();
        var profileInfoJson = ko.toJSON(profilevm);
        $.ajax({
            type: 'PUT',
            url: rootURL + '/profile',
            contentType: 'application/json',
            dataType: 'json',
            data: profileInfoJson,
            success:function(data){
                console.log(data);
            }
        });
    });
});

//Edit update buttons control
$(function() {
    $(".edit").hide();
    $("#edit_btn").click(function(){
        $(".view").hide();
        $(".edit").show();
    });
    $("#update_btn").click(function(){
        $(".view").show();
        $(".edit").hide();
    });
});