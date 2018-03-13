function rsvp() {
	var self = this;
	var config = self.get_config();
	firebase.initializeApp(config);
	self.database = firebase.database();

	var user_saved = self.load_local("user");
	if (user_saved) {
		update_user_data();
	} else {
		decorate_user_login();
	}
}

function decorate_rsvp_page() {
	decorate_save_button();
	var guest_number_select_div = document.getElementById('guest_number_select_div');
	decorate_instruction_guest_block(guest_number_select_div);
	var child_number_select_div = document.getElementById('child_number_select_div');
	decorate_instruction_child_block(child_number_select_div);
	decorate_guest_input_blocks_calculation();
	var rsvp_child_input_div = document.getElementById('rsvp_child_input_div');
	decorate_child_input_block(rsvp_child_input_div);
	var rsvp_comment_input_div = document.getElementById('rsvp_comment_input_div');
	decorate_comment_input_block(rsvp_comment_input_div);
}

function decorate_guest_input_blocks_calculation() {
	var self = this;
	var selected_number_of_guests = window.user.selected_number_of_guests;
	var rsvp_guest_input_div = document.getElementById('rsvp_guest_input_div');
	if (selected_number_of_guests && +selected_number_of_guests > 0) {
		rsvp_guest_input_div.style.display = '';
		for (var i = 0; i < +selected_number_of_guests; i++) {
			var guest_input_div = document.createElement('div');
			guest_input_div.id = 'guest_input_div_' + (+i + 1);
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
		var rsvp_comment_input_div = document.getElementById('rsvp_comment_input_div');
		debugger;
		if (this.value === '0') {
			rsvp_comment_input_div.style.display = none;
		} else {
			rsvp_comment_input_div.style.display = '';
		}
	});
	if (window.user && window.user.selected_number_of_guests) {
		guest_select.value = window.user.selected_number_of_guests;
	}
	guest_select.classList.add('guest_number_select');
	guest_select.style['margin-top'] = '4px';
	guest_select_div.appendChild(guest_select);
	parent.appendChild(guest_select_div);
}

function decorate_instruction_child_block(parent) {
	if (window.user.number_of_children && +window.user.number_of_children > 1) {
		var child_select_div = parent.lastElementChild;
		var child_numbers = [{'code': 'unselected', 'value': 'Children attending'},
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
		if (window.user && window.user.selected_number_of_children) {
			child_select.value = window.user.selected_number_of_children;
		}
		child_select.classList.add('child_number_select');
		child_select.style['margin-top'] = '4px';
		child_select_div.appendChild(child_select);
		parent.appendChild(child_select_div);
	} else {
		parent.style.display = 'none';
		var child_menu_option = document.getElementById('child_menu');
		child_menu_option.style.display = 'none';
	}
}

function decorate_guest_input_block(parent, guest_number) {
	var guest_number_string = 'guest' + guest_number;
	var current_guest = window.user[guest_number_string];
	
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
	guest_name_input.style['margin-top'] = '4px';
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
	
	var dinner_options = ['', 'Beef', 'Pork', 'Vegetable stack'];
	var dinner_select = document.createElement('select');
	dinner_select.id = 'dinner_select_' + guest_number;
	dinner_select.classList.add('rsvp_guest_dinner_select');
	dinner_select.style.width = '100%';
	dinner_select.style['margin-top'] = '4px';
	for (var i = 0; i < dinner_options.length; i++) {
		var option = document.createElement('option');
		option.value = dinner_options[i];
		option.text = dinner_options[i];
		dinner_select.appendChild(option);
	}
	if (current_guest && current_guest.dinner) {
		dinner_select.value = current_guest.dinner;
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
	allergies_input.style['margin-top'] = '4px';
	if (current_guest && current_guest.allergies) {
		allergies_input.value = current_guest.allergies;
	}
	allergies_div.appendChild(allergies_input);
	parent.appendChild(allergies_div);
}

function decorate_child_input_block(parent) {
	var number_of_children = window.user.selected_number_of_children;
	if (number_of_children && +number_of_children > 0) {
		parent.style.display = '';

		for (var i = 0; i < +number_of_children; i++) {
			var child_input_div = document.createElement('div');
			child_input_div.classList.add('rsvp_child_inputs');
			var current_child = window.user['child' + (i + 1)];

			// Children names
			var child_name_div = document.createElement('DIV');
			child_name_div.classList.add('rsvp_guest_input_divs');
			child_name_div.style.width = 'fit-content';
			child_name_div.style.display = 'block';

			var child_name_label_div = document.createElement('DIV');
			var child_name_label_text = document.createTextNode('Child name');
			child_name_label_div.appendChild(child_name_label_text);
			child_name_div.appendChild(child_name_label_div);
			
			var child_name_input = document.createElement('input');
			child_name_input.id = 'child_name_input_' + i;
			child_name_input.classList.add('rsvp_guest_name_input');
			child_name_input.type = 'text';
			child_name_input.style.width = '100%';
			child_name_input.style['margin-top'] = '4px';
			if (current_child && current_child.name) {
				child_name_input.value = current_child.name;
			}
			child_name_div.appendChild(child_name_input);
			child_input_div.appendChild(child_name_div);
			
			// Children Allergies
			var child_allergies_div = document.createElement('DIV');
			child_allergies_div.classList.add('rsvp_guest_input_divs');
			child_allergies_div.style.width = 'fit-content';
			child_allergies_div.style.display = 'block';

			var child_allergies_label_div = document.createElement('DIV');
			var child_allergies_label_text = document.createTextNode('Any food allergies?');
			child_allergies_label_div.appendChild(child_allergies_label_text);
			child_allergies_div.appendChild(child_allergies_label_div);
			
			var child_allergies_input = document.createElement('input');
			child_allergies_input.id = 'child_allergies_input_' + i;
			child_allergies_input.classList.add('rsvp_guest_name_input');
			child_allergies_input.type = 'text';
			child_allergies_input.style.width = '100%';
			child_allergies_input.style['margin-top'] = '4px';
			if (current_child && current_child.allergies) {
				child_allergies_input.value = current_child.allergies;
			}
			
			child_allergies_div.appendChild(child_allergies_input);
			child_input_div.appendChild(child_allergies_div);
			
			parent.appendChild(child_input_div);
		}
		
	} else {
		parent.style.display = 'none';
	}
}

function decorate_comment_input_block(parent) {
	var comment_input_div = document.createElement('div');
	comment_input_div.classList.add('rsvp_comment_inputs');

	// Comment song
	var comment_song_div = document.createElement('DIV');
	comment_song_div.classList.add('rsvp_guest_input_divs');
	comment_song_div.style.display = 'block';

	var comment_song_label_div = document.createElement('DIV');
	var comment_song_label_text = document.createTextNode('Any song you would like to hear at the reception?');
	comment_song_label_div.appendChild(comment_song_label_text);
	comment_song_div.appendChild(comment_song_label_div);

	var comment_song_input = document.createElement('input');
	comment_song_input.id = 'comment_song_input';
	comment_song_input.classList.add('rsvp_guest_name_input');
	comment_song_input.type = 'text';
	comment_song_input.style.width = '100%';
	comment_song_input.style['margin-top'] = '4px';
	if (window.user && window.user.song) {
		comment_song_input.value = window.user.song;
	}
	comment_song_div.appendChild(comment_song_input);
	comment_input_div.appendChild(comment_song_div);

	// Children Allergies
	var comment_div = document.createElement('DIV');
	comment_div.classList.add('rsvp_guest_input_divs');
	comment_div.style.display = 'block';

	var comment_label_div = document.createElement('DIV');
	var comment_label_text = document.createTextNode('Any comments for Kailtyn or Philip?');
	comment_label_div.appendChild(comment_label_text);
	comment_div.appendChild(comment_label_div);

	var comment_input = document.createElement('input');
	comment_input.id = 'comment_input';
	comment_input.classList.add('rsvp_guest_name_input');
	comment_input.type = 'text';
	comment_input.style.width = '100%';
	comment_input.style['margin-top'] = '4px';
	if (window.user && window.user.comment) {
		comment_input.value = window.user.comment;
	}

	comment_div.appendChild(comment_input);
	comment_input_div.appendChild(comment_div);

	parent.appendChild(comment_input_div);
}

function decorate_save_button() {
	var self = this;
	var rsvp_save_button_div = document.getElementById('rsvp_save_button');
	self.save_button = document.createElement('button');
	self.save_button.innerHTML = 'Save';
	self.save_button.classList.add('save_button');
	self.save_button.addEventListener('click', function() {
		var errors = [];
		// Guests
		var selected_number_of_guests = window.user.selected_number_of_guests;
		if (selected_number_of_guests) {
			for (var i = 0; i < +selected_number_of_guests; i++) {
				var guest_name_input_div = document.getElementById('guest_name_input_' + (i + 1));
				if (guest_name_input_div && guest_name_input_div.value && guest_name_input_div.value !== '') {
					window.user['guest' + (i + 1)].name = guest_name_input_div.value;
				} else {
					errors.push('No name input for Guest ' + (i + 1));
				}
				var guest_dinner_select_div = document.getElementById('dinner_select_' + (i + 1));
				if (guest_dinner_select_div && guest_dinner_select_div.value && guest_dinner_select_div.value !== '') {
					window.user['guest' + (i + 1)].dinner = guest_dinner_select_div.value;
				} else {
					var current_guest_name = 'Guest ' + (i + 1);
					if (window.user['guest' + (i + 1)].name) {
						current_guest_name = window.user['guest' + (i + 1)].name;
					}
					errors.push('No dinner selected for ' + current_guest_name);
				}
				var guest_allergies_input_div = document.getElementById('allergies_input_' + (i + 1));
				if (guest_allergies_input_div && guest_allergies_input_div.value && guest_allergies_input_div.value !== '') {
					window.user['guest' + (i + 1)].allergies = guest_allergies_input_div.value;
				} else {
					// intentionally left blank.  Don't need to have an error.
				}
			}
		} else {
			errors.push('Please select how many guests will be attending');
		}
		
		// Children
		var number_of_children = window.user.number_of_children;
		if (number_of_children && number_of_children > 0) {
			var selected_number_of_children = window.user.selected_number_of_children;
			debugger;
			if (selected_number_of_children && selected_number_of_children >= 0) {
				for (var j = 0; j < selected_number_of_children; j++) {
					var child_name_input_div = document.getElementById('child_name_input_' + (j));
					if (child_name_input_div && child_name_input_div.value && child_name_input_div.value !== '') {
						if (!window.user['child' + (j + 1)]) {
							window.user['child' + (j + 1)] = {};
						}
						window.user['child' + (j + 1)].name = child_name_input_div.value;
					} else {
						errors.push('No name input for Child ' + (j + 1));
					}
					
					var child_allergies_input_div = document.getElementById('child_allergies_input_' + (j));
					if (child_allergies_input_div && child_allergies_input_div.value && child_allergies_input_div.value !== '') {
						if (!window.user['child' + (j + 1)]) {
							window.user['child' + (j + 1)] = {};
						}
						window.user['child' + (j + 1)].allergies = child_allergies_input_div.value;
					} else {
						// intentionally left blank.  Don't need to have an error.
					}
				}
			} else {
				errors.push('Please select how many children will be attending');
			}
		}
		
		var comment_song_div = document.getElementById('comment_song_input');
		if (comment_song_div && comment_song_div.value && comment_song_div.value !== '') {
			window.user.song = comment_song_div.value;
		}
		
		var comment_div = document.getElementById('comment_input');
		if (comment_div && comment_div.value && comment_div.value !== '') {
			window.user.comment = comment_div.value;
		}
		
		if (errors.length > 0) {
			var errors_string = '';
			for (var k = 0; k < errors.length; k++) {
				errors_string = errors_string + ((k > 0) ? ', ' : '') + errors[k];
			}
			alert(errors_string);
		} else {
			save_user();
		}
	});
	rsvp_save_button_div.appendChild(self.save_button);
}

function decorate_user_login() {
	
}

function save_user() {
	var current_user = Object.assign({}, window.user);
	delete current_user.id;
	debugger;
	
	var new_user = database.ref('guests/' + window.user.id).set(
		current_user
	);
	
	var rsvp_inputs_divs = document.getElementById('rsvp_inputs_divs');
	rsvp_inputs_divs.innerHTML = "";
	
	var rsvp_thank_you = document.createElement('div');
	rsvp_thank_you.id = 'rsvp_thank_you';
	rsvp_thank_you.innerHTML = 'Thank you for RSVP\'ing.  We look forward to celebrating with you May 19th!';
	rsvp_thank_you.classList.add('rsvp_instructions_style');
	rsvp_inputs_divs.appendChild(rsvp_thank_you);
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







