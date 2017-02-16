var listviewVM;

$(function() {
    console.log("Get List");
    //temp hide for swipe layout testing
    $('#prev-list').hide();
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
                // dislike callback
                onDislike: function (item) {
                    // set the status text
                    $('#status').html('Dislike image ' + (item.index()+1));
                },
                // like callback
                onLike: function (item) {
                    // set the status text
                    $('#status').html('Like image ' + (item.index()+1));
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