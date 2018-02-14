function rsvp() {
	var self = this;
	var config = self.get_config();
	firebase.initializeApp(config);
	var database = firebase.database();

  debugger;
	var guest_input_div = document.getElementById('guest_input_div');
	decorate_guest_input_block(guest_input_div, 1);

}

function decorate_guest_input_block(parent, guest_number) {
	var guest_attending_toggle = document.createElement('BUTTON');
	guest_attending_toggle.innerHTML = 'Testing';
	parent.appendChild(guest_attending_toggle);
}
