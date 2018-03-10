function venue() {
}

function initMap() {
	var uluru = {lat: 39.9769, lng: -85.7527};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}
