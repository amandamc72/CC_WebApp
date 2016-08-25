//var profile = json from controller.js

//properties that are observable
var profileVM = function(){
	var self = this;
	self.picture = ko.observable();
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

$(function () {
        var profileVMObject = new profileVM();
        profileVMObject.picture(profile.picture)
                      .name(profile.name)
                      .city(profile.city)
                      .state(profile.state)
					  .school(profile.school)
					  .standing(profile.standing)
					  .major(profile.major)
					  .minor(profile.minor)
					  .age(profile.age)
					  .about(profile.about)
					  .courses(profile.courses)
					  .interests(profile.interests);
        ko.applyBindings(profileVMObject);
});
