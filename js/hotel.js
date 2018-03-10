function hotel() {
  
}

function initMap() {
	var uluru = {lat: 40.0517, lng: -85.6506};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}
