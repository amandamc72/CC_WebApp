var ListViewVM = function(data){
    var self = this;
    self.items = ko.observableArray(data.members);
    self.items_grouped = ko.computed(function () {
        var grouped = [];
        var itemlist = self.items();
        for (var i = 0; i < itemlist.length; i+=3){
            var row = [];
            grouped.push(row);
            for(var j = 0; j < 3; ++j){
                if(itemlist[i+j] == undefined)
                    break;
                row.push(itemlist[i+j]);
            }
        }
        return grouped;
    })
};
var listviewVM;

$(function() {
    console.log("Get List");
    $.ajax({
        type: "GET",
        contentType: 'application/json',
        url: rootURL + '/home',
        dataType: "json",
        success: function(data){
            console.log(data);
            listviewVM = new ListViewVM(data);
            ko.applyBindings(listviewVM);
            console.log((listviewVM.items_grouped()));
        }
    });
});
