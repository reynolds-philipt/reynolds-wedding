function venue() {
	document.getElementById('header_button_venue').style.backgroundColor('#42eef4');
}

function initMap() {
	var uluru = {lat: 39.9769, lng: -85.7527};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}
