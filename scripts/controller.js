// The root URL for the RESTful services
var rootURL = "http://192.168.101.111:8080/CCService/v1/index.php";

// Register listeners
//login form
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

//register form
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

//sign up form
$(function() {
	$('#signUpForm').submit(function(e) {
		e.preventDefault();
		console.log('form submitted');
		signUp ();
	});
});

// Check for .edu email
function emailCheck(email){
	if (email.includes("@") && email.endsWith(".edu")){
		return true;
	}
	return false;
}

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
				//TODO log in to session
				window.location.href = "/Website/home/";
			} else {
				$('#loginPassword').effect( "shake", {times:4}, 1000 );
				$("#error").html(data.message);
			}
		}
	});
}

// Serialize login form fields into a JSON string
function loginFormToJSON() {
	return JSON.stringify({
		"email": $('#loginEmail').val(), 
		"password": $('#loginPassword').val()
	});
}

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

// Serialize register form fields into a JSON string
function registerFormToJSON() {
	return JSON.stringify({
		"email": $('#registerEmail').val()
	});
}

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
				//TODO log in to session
				window.location.href = "/Website/home/";
			} else {
				console.log('error');
				$("#error").html(data.message);
			}
		}		
	});
}

function getCode(str){
	return str.split('/')[5];
}

function getDob() {
	var month = $("#month").val();
	var day = $("#day").val();
	var year = $("#year").val();

	return (year + "/" + month + "/" + day);
}

// Serialize sign up form fields into a JSON string
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