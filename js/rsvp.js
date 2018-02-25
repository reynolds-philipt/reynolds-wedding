function rsvp() {
	var self = this;
	var config = self.get_config();
	firebase.initializeApp(config);
	self.database = firebase.database();

	debugger;
	var user_saved = self.load_local("user");
	if (user_saved) {
		update_user_data();
	} else {
		decorate_user_login();
	}
}

function decorate_rsvp_page() {
	var guest_number_select_div = document.getElementById('guest_number_select_div');
	decorate_instruction_guest_block(guest_number_select_div);
	var child_number_select_div = document.getElementById('child_number_select_div');
	decorate_instruction_child_block(child_number_select_div);
	decorate_guest_input_blocks_calculation();
	var rsvp_child_input_div = document.getElementById('rsvp_child_input_div');
	decorate_child_input_block(rsvp_child_input_div);
	decorate_save_button();
}

function decorate_guest_input_blocks_calculation() {
	var self = this;
	var selected_number_of_guests = window.user.selected_number_of_guests;
	var rsvp_guest_input_div = document.getElementById('rsvp_guest_input_div');
	if (selected_number_of_guests && +selected_number_of_guests > 0) {
		rsvp_guest_input_div.style.display = '';
		for (var i = 0; i < +selected_number_of_guests; i++) {
			var guest_input_div = document.createElement('div');
			guest_input_div.classList.add('rsvp_guest_inputs');
			decorate_guest_input_block(guest_input_div, i + 1);
			rsvp_guest_input_div.appendChild(guest_input_div);
		}
	} else {
		rsvp_guest_input_div.style.display = 'none';
	}
}

function decorate_instruction_guest_block(parent) {
	var self = this;
	debugger;
	var guest_select_div = parent.lastElementChild;
	var guest_numbers_options = [{'code': 'unselected', 'value': 'Number of guests'},
				     {'code': 0, 'value': 'Unable to attend'},
				     {'code': 1, 'value': 1},
				     {'code': 2, 'value': 2},
				     {'code': 3, 'value': 3},
				     {'code': 4, 'value': 4},
				     {'code': 5, 'value': 5},
				     {'code': 6, 'value': 6}];
	var number_of_guests = window.user.number_of_guests;
	
	var guest_select = document.createElement('select');
	for (var i = 0; i < +number_of_guests + 2; i++) {
		var option = document.createElement('option');
		option.value = guest_numbers_options[i].code;
		option.text = guest_numbers_options[i].value;
		guest_select.appendChild(option);
	}
	guest_select.addEventListener('change', function(value) {
		window.user.selected_number_of_guests = this.value;
		var rsvp_guest_input_div = document.getElementById('rsvp_guest_input_div');
		rsvp_guest_input_div.innerHTML = '';
		self.decorate_guest_input_blocks_calculation();
	});
	guest_select.classList.add('guest_number_select');
	guest_select_div.appendChild(guest_select);
	parent.appendChild(guest_select_div);
}

function decorate_instruction_child_block(parent) {
	if (window.user.number_of_children && +window.user.number_of_children > 1) {
		var child_select_div = parent.lastElementChild;
		var child_numbers = [{'code': 'unselected', 'value': 'Number of children attending'},
				     {'code': 0, 'value': 0},
				     {'code': 1, 'value': 1},
				     {'code': 2, 'value': 2},
				     {'code': 3, 'value': 3},
				     {'code': 4, 'value': 4},
				     {'code': 5, 'value': 5},
				     {'code': 6, 'value': 6}];
		
		var child_select = document.createElement('select');
		for (var i = 0; i < +window.user.number_of_children + 2; i++) {
			var option = document.createElement('option');
			option.value = child_numbers[i].code;
			option.text = child_numbers[i].value;
			child_select.appendChild(option);
		}
		child_select.addEventListener('change', function(value) {
			window.user.selected_number_of_children = this.value;
			var rsvp_child_input_div = document.getElementById('rsvp_child_input_div');
			rsvp_child_input_div.innerHTML = '';
			var rsvp_child_input_div = document.getElementById('rsvp_child_input_div');
			self.decorate_child_input_block(rsvp_child_input_div);
		});
		child_select.classList.add('child_number_select');
		child_select_div.appendChild(child_select);
		parent.appendChild(child_select_div);
	} else {
		parent.style.display = 'none';
		var child_menu_option = document.getElementById('child_menu');
		child_menu_option.display = 'none';
	}
}

function decorate_guest_input_block(parent, guest_number) {
	var guest_number_string = 'guest' + guest_number;
	var current_guest = window.user[guest_number_string];
	
	debugger;
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
	guest_name_input.id = 'guest_name_input_' + guest_number;
	guest_name_input.classList.add('rsvp_guest_name_input');
	guest_name_input.type = 'text';
	guest_name_input.style.width = '100%';
	if (current_guest && current_guest.name) {
		guest_name_input.value = current_guest.name;
	}
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
	dinner_select.id = 'dinner_select_' + guest_number;
	dinner_select.classList.add('rsvp_guest_dinner_select');
	dinner_select.style.width = '100%';
	for (var i = 0; i < dinner_options.length; i++) {
		var option = document.createElement('option');
		option.value = dinner_options[i];
		option.text = dinner_options[i];
		dinner_select.appendChild(option);
	}
	if (current_guest && current_guest.dinner_select) {
		dinner_select.value = current_guest.dinner_select;
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
	
	var allergies_input = document.createElement('input');
	allergies_input.id = 'allergies_input_' + guest_number;
	allergies_input.classList.add('rsvp_guest_allergies_input');
	allergies_input.type = 'text';
	allergies_input.style.width = '100%';
	allergies_div.appendChild(allergies_input);
	parent.appendChild(allergies_div);
}

function decorate_child_input_block(parent) {
	var number_of_children = window.user.selected_number_of_children;
	if (number_of_children && +number_of_children > 0) {
		parent.style.display = '';
		var child_input_div = document.createElement('div');
		child_input_div.classList.add('rsvp_child_inputs');
		
		// children names
		var child_name_div = document.createElement('DIV');
		child_name_div.classList.add('rsvp_guest_input_divs');
		child_name_div.style.width = '100%';
		child_name_div.style.display = 'inline-block';
	
		var child_name_label_div = document.createElement('DIV');
		var child_name_label_text = document.createTextNode((window.user.number_of_children > 1) ? 'Children names' : 'Child name');
		child_name_label_div.appendChild(child_name_label_text);
		child_name_div.appendChild(child_name_label_div);

		var child_name_input = document.createElement('input');
		child_name_input.id = 'child_name_input_' + guest_number;
		child_name_input.classList.add('rsvp_guest_name_input');
		child_name_input.type = 'text';
		child_name_input.style.width = '100%';
		if (current_guest && current_guest.name) {
			child_name_input.value = current_guest.name;
		}
		child_name_div.appendChild(child_name_input);
		parent.appendChild(child_name_div);
		
	} else {
		parent.style.display = 'none';
	}
	
}

function decorate_save_button() {
	var self = this;
	var rsvp_background_div = document.getElementById('rsvp_inputs_divs');
	self.save_button = document.createElement('button');
	self.save_button.innerHTML = 'Save';
	self.save_button.classList.add('save_button');
	rsvp_background_div.appendChild(self.save_button);
}

function decorate_user_login() {
	
}

function update_user_data(user) {
	var self = this;
	var window_user = window.user;
	var guests = self.database.ref("guests").orderByKey();
	guests.once("value")
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if (childSnapshot.key === window_user.id) {
					/*
					window.user = {
						'id': childSnapshot.key,
						'email': childSnapshot.val().email,
						'first_name': childSnapshot.val().first_name,
						'last_name': childSnapshot.val().last_name,
						'number_of_guests': childSnapshot.val().number_of_guests,
						'guest1': (childSnapshot.val().guest1 ? childSnapshot.val().guest1 : null),
						'guest2': (childSnapshot.val().guest2 ? childSnapshot.val().guest2 : null),
						'guest3': (childSnapshot.val().guest3 ? childSnapshot.val().guest3 : null),
						'guest4': (childSnapshot.val().guest4 ? childSnapshot.val().guest4 : null),
						'guest5': (childSnapshot.val().guest5 ? childSnapshot.val().guest5 : null),
						'guest6': (childSnapshot.val().guest6 ? childSnapshot.val().guest6 : null),
					};*/
					window.user = childSnapshot.val();
					window.user.id = childSnapshot.key;
					debugger;
					self.save_local("user", window.user);
					return true;
				}
			});
			if (!window.user) {
				decorate_user_login();
			} else {
				decorate_rsvp_page();
			}
		});
}







