// The root URL for the RESTful services
var rootURL = "http://75.128.92.169:8080/CCService/v1/index.php";

// Check for .edu email
function emailCheck(email){
	if (email.includes("@") && email.endsWith(".edu")){
		return true;
	}
	return false;
}

// Login form listener
$(function() {
	$('#loginForm').submit(function (e) {
		e.preventDefault();
		console.log('form submitted');
		var email = document.getElementById("loginEmail").value;
		var validEmail = emailCheck(email);
		if (validEmail) {
			logIn();
		} else {
			$('#loginEmail').effect( "shake", {times:4}, 1000 );
			$("#error").html("Invalid email address");
		}
	});
});

// Login callback to API
function logIn(){
	console.log('login');
	$.ajax({
		type: "POST",
		contentType: 'application/json',
		url: rootURL + '/login',
		dataType: "json",
		data: loginFormToJSON(),
		success: function(data){
			console.log(data);
			if(!data.error) {				
				window.location.href = "/Website/home/";
			} else {
				$('#loginPassword').effect( "shake", {times:4}, 1000 );
				$("#error").html(data.message);
			}
		}
	});
}

// Login form to a JSON
function loginFormToJSON() {
	return JSON.stringify({
		"email": $('#loginEmail').val(),
		"password": $('#loginPassword').val()
	});
}

// Register form listener
$(function() {
	$('#registerForm').submit(function(e) {
		e.preventDefault();
		console.log('form submitted');
		var email = document.getElementById("registerEmail").value;
		var validEmail = emailCheck(email);
		if (!validEmail){
			register();
		} else {
			$('#registerEmail').effect( "shake", {times:4}, 1000 );
			$("#error").html("Invalid email address");
		}
	});
});

// Register callback to API
function register(){
	console.log('register');
	$.ajax({
		type: "POST",
		contentType: 'application/json',
		url: rootURL + '/register',
		dataType: "json",
		data: registerFormToJSON(),
		success: function(data){
			console.log(data);
			if(!data.error) {
				console.log('success');
				$("#error").html("");
				$("#success").html(data.message);
			} else {
				console.log('error');
				$("#error").html(data.message);
				$("#success").html("");
			}
		}
	});
}

// Register form to a JSON
function registerFormToJSON() {
	return JSON.stringify({
		"email": $('#registerEmail').val()
	});
}

// Sign up form listener
$(function() {
	$('#signUpForm').submit(function(e) {
		e.preventDefault();
		console.log('form submitted');
		signUp ();
	});
});

// Sign up callback to API
function signUp (){
	console.log('signUp');
	$.ajax({
		type: "POST",
		contentType: 'application/json',
		url: rootURL + '/signup',
		dataType: "json",
		data: signUpFormToJSON(),
		success: function(data){
			console.log(data);
			if(!data.error) {
				console.log('success');
				window.location.href = "/Website/home/";
			} else {
				console.log('error');
				$("#error").html(data.message);
			}
		}
	});
}
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
// Sign up form helpers
function getCode(str){
	return str.split('/')[5];
}

function getDob() {
	var month = $("#month").val();
	var day = $("#day").val();
	var year = $("#year").val();

	return (year + "/" + month + "/" + day);
}

// Profile properties that are observable
var profileVM = function(){
	var self = this;
	self.thumbnail = ko.observable();
	self.picture = ko.observableArray();
	self.name = ko.observable();
	self.city = ko.observable();
	self.state = ko.observable();
	self.school = ko.observable();
	self.standing = ko.observable();
	self.major = ko.observable();
	self.minor = ko.observable();
	self.age = ko.observable();
	self.about = ko.observable();
	self.courses = ko.observableArray();
	self.interests = ko.observableArray();
}

// Profile population callback to API
function profilePopulation(id){
	console.log('Profile Pop');
	$.ajax({
		type: "GET",
		contentType: 'application/json',
		url: rootURL + '/profile/' + id,
		dataType: "json",
		success: function(data){
			if(!data.error) {
				$(function () {
					var profileVMObject = new profileVM();
					profileVMObject.thumbnail(data.thumbnail)
						.picture(data.picture)
						.name(data.name)
						.city(data.city)
						.state(data.state)
						.school(data.school)
						.standing(data.standing)
						.major(data.major)
						.minor(data.minor)
						.age(data.age)
						.about(data.about)
						.courses(data.courses)
						.interests(data.interests);
					ko.applyBindings(profileVMObject);
				});
			} else {
				console.log('error profile not found');
			}
		}
	});
}

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
	console.log('Who am i?');
	$.ajax({
		type: "GET",
		contentType: 'application/json',
		url: rootURL + '/member',
		dataType: "json",
		success: function(data){
			if (!data.error){
				console.log(data.id.memberId);
				profilePopulation(data.id.memberId);
			}
			else{
				console.log("You are not logged in");
			}		
		}
	})
}

