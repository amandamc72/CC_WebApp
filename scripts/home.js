var listviewVM;
var UserMatchVM = function (data) {
    var self = this;
    self.theirThumbnail = ko.observable(data.targetPic);
    self.theirName = ko.observable(data.targetName);
};

$(function() {
    console.log("Get List");
    var jsonOffset = JSON.stringify({"offset": 0});
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: rootURL + '/home',
        dataType: "json",
        data: jsonOffset,
        success: function (data) {
            console.log(data);
            listviewVM = new ListViewVM(data, 'home', jsonOffset);
            ko.applyBindings(listviewVM);
            /**
             * jTinder initialization
             */
            $("#tinderslide").jTinder({
                onDislike: function (item) {
                    console.log('Dislike image ' + (item.index()+1));
                    var target = listviewVM.items(item.index()+1);
                    console.log(target);
                    //swipeRequest('left', target);
                },
                onLike: function (item) {
                    console.log('Like image ' + (item.index()+1));
                    var target = listviewVM(item.index()+1);
                    console.log(target);
                   // swipeRequest('right', target);
                },
                animationRevertSpeed: 200,
                animationSpeed: 400,
                threshold: 1,
                likeSelector: '.like',
                dislikeSelector: '.dislike'
            });

            /**
             * Set button action to trigger jTinder like & dislike.
             */
            $('.actions .like, .actions .dislike').click(function(e){
                e.preventDefault();
                $("#tinderslide").jTinder($(this).attr('class'));
            });
            /*
             * End
             */
        }
    });
});

function swipeRequest(swipeType, who) {
    var swipeData = JSON.stringify({"swipeType": swipeType, "target": who});
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL + '/swipe',
        dataType: 'json',
        data: swipeData,
        success: function (data) {
            console.log(data);
            if(data.match){
                conole.log("Its a match");
                //show match modal
                th
            }
            else{
                console.log("No match");
                //carry on
            }
        }
    })
}