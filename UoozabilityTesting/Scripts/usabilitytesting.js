$(document).ready(function(e) {

	$('#wireframe').click(function(e) {
		var posX = $(this).offset().left;
		var posY = $(this).offset().top;
		$('#coordinates').text("(" + (e.pageX - posX)+ ", " + (e.pageY - posY) + ")");
	});

});