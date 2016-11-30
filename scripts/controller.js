// The root URL for the RESTful services
var rootURL = "http://75.128.92.169:8080/CCService/v1/index.php";

// Check for .edu email
function emailCheck(email){
	//TODO toook out email check for testing
	//if (email.includes("@") && email.endsWith(".edu")){
	if (email.includes("@")){
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
		if (validEmail){
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
function profileVM(data){
	var self = this;
	self.thumbnail = ko.observable(data.thumbnail);
	self.picture = ko.observableArray(data.picture);
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
	
	self.addInterest = function() {
		self.interests.push({
			interestDescription: this.newInterestText,
			interestLink: "/Website/search/"+this.newInterestText.toString().toLowerCase()+"/"
		});
	self.newInterestText("");
	};
	
	self.removeInterest = function(interest) {self.interests.remove(interest)};

};

function profileVMBind(data) {
	$(function () {
		ko.applyBindings(new profileVM(data));
	});
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
				console.log(data);
				profileVMBind(data);
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
