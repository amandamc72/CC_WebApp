var SettingsVM = function (data){
    var ageRange = [data.settings.ageLowerBound, data.settings.ageHigherBound];
    var self = this;
    self.school = ko.observable(data.settings.defaultSchool);
    self.isMale = ko.observable(data.settings.isMale == 1);
    self.isFemale = ko.observable(data.settings.isFemale == 1);
    self.ageLow = ko.observable(data.settings.ageLowerBound);
    self.ageHigh = ko.observable(data.settings.ageHigherBound);
    self.messageNoti = ko.observable(data.settings.messages == 1);
    self.swipeNoti = ko.observable(data.settings.swipeMatch == 1);
};
var settingsVM;
$(function() {
    console.log("Get Settings");
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: rootURL + '/settings',
        dataType: 'json',
        success: function(data){
            if(!data.error) {
                console.log(data);
                settingsVM = new SettingsVM(data);
                ko.applyBindings(settingsVM);
            }
        }
    });
});

$(function() {
    $(window).bind('beforeunload', function(){
        var data = ko.toJSON(settingsVM);
        console.log(data);
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: rootURL + '/settings',
            dataType: 'json',
            data: data,
            success: function(data){
                    console.log(data);
            }
        });
    });
});

