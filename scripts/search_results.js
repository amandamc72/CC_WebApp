var searchviewVM;

$(function() {
    $("#age").slider({focus: true});
    $("#search-result").hide();

    $('#search-form').submit(function(e) {
        e.preventDefault();
        if($('#city').val() && $('#state').val() === ""){
            $('#state').popover('show')
            return;
        }
        console.log("Get List");
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: rootURL + '/search',
            dataType: "json",
            data: searchFormToJSON(),
            success: function (data) {
                console.log(data);
                searchviewVM = new ListViewVM(data, 'search', searchFormToJSON());
                ko.applyBindings(searchviewVM);
                $("#search-result").show();
                $("#search-form").hide();
            }
        });
    });
});

function searchFormToJSON() {
    var ageRange = $("#age").data('slider').getValue();
    return JSON.stringify({
        "offset": 0,
        "school": $('#school').val(),
        "major": $('#major').val(),
        "minor": $('#minor').val(),
        "ageLow": ageRange[0],
        "ageHigh": ageRange[1],
        "gender": $('input[name=gender]:checked').val(),
        "city": $('#city').val(),
        "state": $('#state').val()
    });
}