$(document).ready(function(e) {
    var id = 0;
    var xcoord = -1;
    var ycoord = -1;
    var comments = "";

    var target_recordFeedback = "/Home/RecordFeedback";
    var target_submitEmail = "/Home/RegisterEmail";


    $('#wireframe').click(function (e) {
		var posX = $(this).offset().left;
		var posY = $(this).offset().top;

		xcoord = (e.pageX - posX);
		ycoord = (e.pageY - posY);
		$('#coordinates').text("(" + xcoord + ", " + ycoord + ")");

	});

	$('#btn_next').click(function (e) {
	    comments = $('#comments').val();
	    feedback =
            {
                xcoord: xcoord,
                ycoord: ycoord,
                comments: comments,
                question_id: id,
                user_id: userid
            };

	    json = JSON.stringify(feedback)

	    $.ajax({
	        type: "POST",
	        url: target_recordFeedback,
	        dataType: 'json',
	        data: json,
	        contentType: "application/json; charset=utf-8",
	        success: successFunc,
	        error: errorFunc
	    });

	    function successFunc(data) {

	        if (data.image == "END") {
	            $('.teststuff').hide();
	            $('.finalthanks').show();
	        } else {
	            $('#text_question').text(data.question);
	            $('#image_curr').attr("src", "/Content/nooz" + data.image + ".jpg");

	            id = id + 1;
	            $('#coordinates').text("");
	            xcoord = -1;
	            ycoord = -1;
	            $('#comments').val("");

	            $("#thanks").fadeIn();
	            $("#thanks").delay(500).fadeOut();
	        }
	    }

	    function errorFunc() {
	        alert('Oops! There was an error.');
	    }
	});

	$('#submit_email').click(function (e) {
	    var email = $('#email').val();
	    user =
            {
                id: userid,
                email: email
            };

	    json = JSON.stringify(user)

	    $.ajax({
	        type: "POST",
	        url: target_submitEmail,
	        dataType: 'json',
	        data: json,
	        contentType: "application/json; charset=utf-8",
	        success: emailsuccessFunc,
	        error: emailerrorFunc
	    });

	    function emailsuccessFunc(data) {

	        $("#after_quiz_comm").text("Thanks for your help.");
	        $("#emailsub").hide();
	    }

	    function emailerrorFunc() {
	    }
	});

});