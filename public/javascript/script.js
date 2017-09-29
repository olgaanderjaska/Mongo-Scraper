$(".article").on("click", ".save-art", function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    var panel = $(this).closest(".panel");
    panel.hide();

    $.ajax({
            method: "POST",
            url: "/article",
            data: {
                title: panel.find('#artTitle').text(),
                post: panel.find('#artPost').text()
            }
        })
        // With that done
        .done(function (data) {
            // Log the response
            console.log(data);
        });
});

$(document).on('submit', '#srap', function (event) {
    event.preventDefault();

    var thisId = $(this).attr("data-id");

    $('#art-id').text(thisId)

    $('#note-form').attr("action", "/article/" + thisId + "?method=put");

    $(".notes").empty();

    $.ajax({
            method: "GET",
            url: "/article/" + thisId
        })
        // With that done, add the note information to the page
        .done(function (data) {
            console.log(data);
            if (data.note.length === 0) {
                $(".notes").append('<div class="text-center note"><h4>No notes for article.</h4></div>')
            } else {
                data.note.forEach(function (notes) {
                    $(".notes").append('<div class="text-center note"><h4>' + notes.body + '</div>')
                });
            }
        });
})