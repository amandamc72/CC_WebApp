var profile = {
error: "false",
picture: "TODO picture",
name: "Amanda McCarty",
city: "New Boston",
state: "Michigan",
school: "Eastern Michigan University",
major: "Computer Science",
minor: "Computer Information Systems",
age: "1991-05-13",
status: "Senior",
about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam suscipit egestas eros, ut maximus magna blandit ut. Suspendisse vel molestie sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sit amet egestas dui, vitae tincidunt justo. Etiam eleifend massa congue magna pretium, id blandit dui pulvinar. Nam et pulvinar risus, vel blandit risus. Maecenas tristique volutpat ante, aliquet hendrerit felis aliquet nec. Curabitur rutrum tincidunt erat, ac feugiat libero gravida ac. Suspendisse ut varius quam, vitae rutrum metus.",
courses: "TODO courses",
interests: "TODO interests",
};

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
