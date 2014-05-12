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
	    comments = $('#textarea').val();
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
	            $('#wireframe').css("background-image", "url('/Content/nexus_nooz" + data.image + ".jpg')");

	            id = id + 1;
	            $('#coordinates').text("");
	            xcoord = -1;
	            ycoord = -1;
	            $('#textarea').val("");

	            $("#thanks").fadeIn();
	            $("#thanks").delay(500).fadeOut();

	            circle.hide();
	            setcircle.hide();
	            layer.draw();
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
	        return false;
        }

	    function emailerrorFunc(xhr, ajaxOptions, thrownError, request, error) {
	        alert('xrs.status = ' + xhr.status + '\n' +
                  'thrown error = ' + thrownError + '\n' +
                  'xhr.statusText = ' + xhr.statusText + '\n' +
                  'request = ' + request + '\n' +
                  'error = ' + error);
	    }

	    return false;
	});



	var stage = new Kinetic.Stage({
	    container: 'wireframe',
	    width: 312,
	    height: 614,
	    listening: true
	});
	var layer = new Kinetic.Layer({
	    listening: true
	});

	var circle = new Kinetic.Circle({
	    x: stage.getWidth() / 2,
	    y: stage.getHeight() / 2,
	    radius: 25,
	    fill: 'grey',
	    stroke: 'black',
	    strokeWidth: 2,
	    draggable: true
	});

	var setcircle = new Kinetic.Circle({
	    x: stage.getWidth() / 2,
	    y: stage.getHeight() / 2,
	    radius: 25,
	    fill: 'red',
	    stroke: 'black',
	    strokeWidth: 2,
	});

	circle.opacity(0.5);
	setcircle.opacity(0.5);
	circle.hide();
	setcircle.hide();

    // add the shape to the layer
	layer.add(circle);
	layer.add(setcircle);



    // add the layer to the stage
	stage.add(layer);

	stage.getContent().addEventListener('mousemove', function () {
	    circle.show();
	    circle.setPosition(stage.getPointerPosition());
	    layer.draw();
	});

	stage.getContent().addEventListener('click', function () {
	    setcircle.show();
	    setcircle.setPosition(stage.getPointerPosition());
	    layer.draw();
	});

});