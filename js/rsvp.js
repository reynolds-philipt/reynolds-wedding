function rsvp() {
	var self = this;
	var config = self.get_config();
	firebase.initializeApp(config);
	var database = firebase.database();

	var guest_number_select_div = document.getElementById('guest_number_select_div');
	decorate_instruction_guest_block(guest_number_select_div);
	var child_number_select_div = document.getElementById('child_number_select_div');
	decorate_instruction_child_block(child_number_select_div);
	var guest_input_div = document.getElementById('guest_input_div');
	decorate_guest_input_block(guest_input_div, 1);
}

function decorate_instruction_guest_block(parent) {
	var guest_select_div = parent.lastElementChild;
	var guest_numbers_options = [{'code': 'unselected', 'value': 'Select number of guests'},
				     {'code': 0, 'value': 'Unfortunately unable to attend'},
				     {'code': 1, 'value': 1},
				     {'code': 2, 'value': 2},
				     {'code': 3, 'value': 3},
				     {'code': 4, 'value': 4},
				     {'code': 5, 'value': 5},
				     {'code': 6, 'value': 6}];
	
	var guest_select = document.createElement('select');
	for (var i = 0; i < guest_numbers_options.length; i++) {
		var option = document.createElement('option');
		option.value = guest_numbers_options[i].code;
		option.text = guest_numbers_options[i].value;
		guest_select.appendChild(option);
	}
	guest_select_div.appendChild(guest_select);
	parent.appendChild(guest_select_div);
}

function decorate_instruction_child_block(parent) {
	var child_select_div = parent.lastElementChild;
	var guest_numbers = ['', '0', '1', '2', '3', '4', '5', '6'];
	debugger;
	parent.style.display = 'none';
}

function decorate_guest_input_block(parent, guest_number) {
	// Guest attending
	/*
	var guest_attending_div = document.createElement('DIV');
	guest_attending_div.classList.add('rsvp_guest_input_divs');
	
	var guest_not_attending_label_div = document.createElement('DIV');
	guest_not_attending_label_div.style.display = 'inline-block';
	guest_not_attending_label_div.style['padding-right'] = '8px';
	guest_not_attending_label_div.appendChild(document.createTextNode('Unfotunately,'));
	guest_not_attending_label_div.appendChild(document.createElement('br'));
	guest_not_attending_label_div.appendChild(document.createTextNode('unable to attend'));
	guest_attending_div.appendChild(guest_not_attending_label_div);
	
	var guest_attending_toggle_div = document.createElement('DIV');
	var guest_attending_toggle = document.createElement('BUTTON');
	guest_attending_toggle.innerHTML = 'Testing';
	guest_attending_toggle_div.appendChild(guest_attending_toggle);
	guest_attending_div.appendChild(guest_attending_toggle_div);
	
	var guest_attending_label_div = document.createElement('DIV');
	guest_attending_label_div.style.display = 'inline-block';
	guest_attending_label_div.style['padding-left'] = '8px';
	guest_attending_label_div.appendChild(document.createTextNode('Happily able'));
	guest_attending_label_div.appendChild(document.createElement('br'));
	guest_attending_label_div.appendChild(document.createTextNode('to attend'));
	guest_attending_div.appendChild(guest_attending_label_div);
	parent.appendChild(guest_attending_div);
	*/
	
	
	// Guest Name
	var guest_name_div = document.createElement('DIV');
	guest_name_div.classList.add('rsvp_guest_input_divs');
	guest_name_div.style.width = '45%';
	guest_name_div.style.display = 'inline-block';
	
	var guest_name_label_div = document.createElement('DIV');
	var guest_name_label_text = document.createTextNode('Guest\'s name');
	guest_name_label_div.appendChild(guest_name_label_text);
	guest_name_div.appendChild(guest_name_label_div);
	
	var guest_name_input = document.createElement('input');
	guest_name_input.type = 'text';
	guest_name_input.style.width = '100%';
	guest_name_div.appendChild(guest_name_input);
	parent.appendChild(guest_name_div);
	
	
	//Dinner select
	var dinner_select_div = document.createElement('DIV');
	dinner_select_div.classList.add('rsvp_guest_input_divs');
	dinner_select_div.style.width = '45%';
	dinner_select_div.style.display = 'inline-block';
	dinner_select_div.style.float = 'right';
	
	var dinner_select_label_div = document.createElement('DIV');
	var dinner_select_label_text = document.createTextNode('Guest\'s dinner selection');
	dinner_select_label_div.appendChild(dinner_select_label_text);
	dinner_select_div.appendChild(dinner_select_label_div);
	
	var dinner_options = ['', 'Beef', 'Pork', 'Gluten Free/Vegan'];
	var dinner_select = document.createElement('select');
	dinner_select.style.width = '100%';
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
	allergies_div.classList.add('rsvp_guest_input_divs');
	
	var allergies_label_div = document.createElement('DIV');
	var allergies_label_text = document.createTextNode('Any food allergies the cook should be aware of?');
	allergies_label_div.appendChild(allergies_label_text);
	allergies_div.appendChild(allergies_label_div);
	
	var allergies_text = document.createElement('input');
	allergies_text.type = 'text';
	allergies_text.style.width = '100%';
	allergies_div.appendChild(allergies_text);
	parent.appendChild(allergies_div);
}









