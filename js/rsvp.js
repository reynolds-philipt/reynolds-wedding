function rsvp() {
	var self = this;
	var config = self.get_config();
	firebase.initializeApp(config);
	var database = firebase.database();

	var guest_input_div = document.getElementById('guest_input_div');
	decorate_guest_input_block(guest_input_div, 1);

}

function decorate_guest_input_block(parent, guest_number) {
	// guest attending
	var guest_attending_div = document.createElement('DIV');
	guest_attending_div.class = 'rsvp_guest_input_divs';
	var guest_attending_label = document.createTextNode('Unfotunately, unable to attend');
	guest_attending_div.appendChild(guest_attending_label);
	var guest_attending_toggle = document.createElement('BUTTON');
	guest_attending_toggle.innerHTML = 'Testing';
	guest_attending_div.appendChild(guest_attending_toggle);
	var guest_attending_label = document.createTextNode('Happily able to attend');
	guest_attending_div.appendChild(guest_attending_label);
	parent.appendChild(guest_attending_div);
	
	// Guest Name
	var guest_name_div = document.createElement('DIV');
	guest_name_div.class = 'rsvp_guest_input_divs';
	var guest_name_label = document.createTextNode('Guest\'s name');
	parent.appendChild(guest_name_label);
	var guest_name_input = document.createElement('input');
	guest_name_input.type = 'text';
	parent.appendChild(guest_name_input);
	
	//Dinner select
	var dinner_select_div = document.createElement('DIV');
	dinner_select_div.class = 'rsvp_guest_input_divs';
	var dinner_select_label = document.createTextNode('Guest\'s selection for dinner');
	dinner_select_div.appendChild(dinner_select_label);
	var dinner_options = ['', 'Beef', 'Pork', 'Gluten Free/Vegan', 'Child'];
	var dinner_select = document.createElement('select');
	for (var i = 0; i < dinner_options.length; i++) {
		var option = document.createElement('option');
		option.value = dinner_options[i];
		option.text = dinner_options[i];
		dinner_select.appendChild(option);
	}
	dinner_select_div.appendChild(dinner_select);
	parent.appendChild(dinner_select_div);
	
	// Allergies
	var allergies_div = document.createElement('DIV');
	allergies_div.class = 'rsvp_guest_input_divs';
	var allergies_label = document.createTextNode('Any food allergies the cook should be aware of?');
	allergies_div.appendChild(allergies_label);
	var allergies_text = document.createElement('input');
	allergies_text.type = 'text';
	allergies_div.appendChild(allergies_text);
	parent.appendChild(allergies_div);
}
























