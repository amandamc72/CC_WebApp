var listviewVM;

$(function() {
    console.log("Get List");
    var jsonOffset = JSON.stringify({"offset": 0});
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: rootURL + '/home',
        dataType: "json",
        data: jsonOffset,
        success: function(data){
            console.log(data);
            listviewVM = new ListViewVM(data, 'home', jsonOffset);
            ko.applyBindings(listviewVM);
        }
    });
});
