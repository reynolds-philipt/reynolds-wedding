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
	// guest attending
	var guest_attending_label = document.createTextNode('Happily able to attend');
	parent.appendChild(guest_attending_label);
	var guest_attending_toggle = document.createElement('BUTTON');
	guest_attending_toggle.innerHTML = 'Testing';
	parent.appendChild(guest_attending_toggle);
	
	// Guest Name
	var guest_name_label = document.createTextNode('Guest\'s name');
	parent.appendChild(guest_name_label);
	var guest_name_input = document.createElement('input');
	guest_name_input.type = 'text';
	parent.appendChild(guest_name_input);
	
	//Dinner select
	var dinner_select_label = document.createTextNode('Guest\'s selection for dinner');
	parent.appendChild(dinner_select_label);
	var dinner_options = ['Beef', 'Pork', 'Gluten Free/Vegan', 'Child'];
	var dinner_select = document.createElement('select');
	for (var i = 0; i < dinner_options.length; i++) {
		var option = document.createElement('option');
		option.value = dinner_options[i];
		option.text = dinner_options[i];
		dinner_select.appendChild(option);
	}
	parent.appendChild(dinner_select);
	
	// Allergies
	var allergies_label = document.createTextNode('Any food allergies the cook should be aware of?');
	parent.appendChild(dinner_select_label);
	var allergies_text = document.createElement('input');
	allergies_text.type = 'text';
	parent.appendChild(allergies_text);
}
























