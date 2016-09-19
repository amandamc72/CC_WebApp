var profile = {

	thumbnail:"/Website/assets/img/1.jpg",

	picture:[
	{
		relPath:"/Website/assets/img/2.jpg"
	},
	{
		relPath:"/Website/assets/img/3.jpg"
	},
	{
		relPath:"/Website/assets/img/4.jpg"
	}
],
	name:"Amanda McCarty",
	city:"New Boston",
	state:"Michigan",
	school:"Eastern Michigan University",
	major:"Computer Science",
	minor:"Computer Information Systems",
	age:25,
	standing:"Senior",
	about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam suscipit egestas eros, ut maximus magna blandit ut. Suspendisse vel molestie sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sit amet egestas dui, vitae tincidunt justo.\n\nEtiam eleifend massa congue magna pretium, id blandit dui pulvinar. Nam et pulvinar risus, vel blandit risus. Maecenas tristique volutpat ante, aliquet hendrerit felis aliquet nec. Curabitur rutrum tincidunt erat, ac feugiat libero gravida ac. Suspendisse ut varius quam, vitae rutrum metus.",
	courses:[
	{
		courseName:"COSC 444"
	},
	{
		courseName:"IS 315"
	},
	{
		courseName:"MATH 205"
	},
	{
		courseName:"IS 415"
	}
],
	interests:[
	{
		interestDescription:"Reading",
		interestLink:"/Website/Search/Reading/"
	},
	{
		interestDescription:"Golf",
		interestLink:"/Website/Search/Golf/"
	},
	{
		interestDescription:"Running",
		interestLink:"/Website/Search/Running/"
	},
	{
		interestDescription:"Movies",
		interestLink:"/Website/Search/Movies/"
	}
]
};

//properties that are observable
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

$(function () {
        var profileVMObject = new profileVM();
        profileVMObject.thumbnail(profile.thumbnail)
					  .picture(profile.picture)
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
