var offset = 0;

var ListViewVM = function(data, endpoint, jsonData){
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
    });

    self.addItems = function() {
        console.log("Get more");
        var jsonObj = JSON.parse(jsonData);
        offset = offset+24;
        jsonObj.offset = offset;
        var data = JSON.stringify(jsonObj);
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: rootURL + '/' + endpoint,
            dataType: "json",
            data: data,
            success: function(data){
                console.log(data);
                for(i = 0; i < data.members.length; i++) {
                    self.items.push(data.members[i]);
                }
            }
        });
    };

    $(window).scroll(function() {
        //at bottom
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
         self.addItems();
        }

        /*if($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
            self.addItems();
        }*///near bottom
    })
};