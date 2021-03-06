function guest_list() {
	var self = this;
	var config = self.get_config();
	firebase.initializeApp(config);
	var database = firebase.database();
  
  
	var guests = [];
	var firebase_guests = database.ref("guests").orderByKey();
	firebase_guests.once("value")
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var user = childSnapshot.val();
				user.id = childSnapshot.key;
				/*{
					'id': childSnapshot.key,
					'email': childSnapshot.val().email,
					'first_name': childSnapshot.val().first_name,
					'last_name': childSnapshot.val().last_name,
					'number_of_guests':
						childSnapshot.val().number_of_guests ? childSnapshot.val().number_of_guests : '1',
				};
				if (childSnapshot.val().guest1) {
					user.guest1 = childSnapshot.val().guest1;
				}
				if (childSnapshot.val().guest2) {
					user.guest2 = childSnapshot.val().guest2;
				} 
				if (childSnapshot.val().guest3) {
					user.guest3 = childSnapshot.val().guest3;
				} 
				if (childSnapshot.val().guest4) {
					user.guest4 = childSnapshot.val().guest4;
				} 
				if (childSnapshot.val().guest5) {
					user.guest5 = childSnapshot.val().guest5;
				} 
				if (childSnapshot.val().guest6) {
					user.guest6 = childSnapshot.val().guest6;
				} */
				guests.push(user);
			});
			decorate_guest_list_table(guests);
		});
}

function decorate_guest_list_table(guests) {
	var self = this;
	var guest_list_div = document.getElementById('admin_guest_list_div');
	
	var save_button = document.createElement('BUTTON');
	save_button.innerHTML = 'Save';
	guest_list_div.appendChild(save_button);
	
	var guest_list_table = document.createElement('TABLE');
	var table_body = document.createElement('TBODY');
	
	guest_list_table.border = '1';
	guest_list_table.appendChild(table_body);
	var heading = new Array();
	heading[0] = {'name': "ID", 'code': 'id'};
	heading[1] = {'name': "Email", 'code': 'email'};
	heading[2] = {'name': "First Name", 'code': 'first_name'};
	heading[3] = {'name': "Last Name", 'code': 'last_name'};
	heading[4] = {'name': "Number of guests", 'code': 'number_of_guests'};
	heading[5] = {'name': "Number of children", 'code': 'number_of_children'};
	heading[6] = {'name': "Guest1", 'code': 'guest1'};
	heading[7] = {'name': "Guest2", 'code': 'guest2'};
	heading[8] = {'name': "Guest3", 'code': 'guest3'};
	heading[9] = {'name': "Guest4", 'code': 'guest4'};
	heading[10] = {'name': "Guest5", 'code': 'guest5'};
	heading[11] = {'name': "Guest6", 'code': 'guest6'};
	
	var guest_numbers = ['1', '2', '3', '4', '5', '6'];
	var children_numbers = ['0', '1', '2', '3', '4'];
	
	//TABLE COLUMNS
	var tr = document.createElement('TR');
	table_body.appendChild(tr);
	for (i = 0; i < heading.length; i++) {
		var th = document.createElement('TH')
		th.width = '75';
		th.appendChild(document.createTextNode(heading[i].name));
		tr.appendChild(th);
	}
	
	this.updated_guests = guests;
	var white_bg = true;
	debugger;
	for (var i = 0; i < guests.length; i++) {
		var updated_guest = guests[i];
		var tr = document.createElement('TR');
		if (white_bg) {
			tr.style.background = '#fff';
			white_bg = !white_bg;
		} else {
			white_bg = !white_bg;
		}
		for (var j = 0; j < heading.length; j++) {
			var td = document.createElement('TD');
			td.width = '75';
			if (heading[j].code === 'id') {
				td.id = 'id_' + i;
				var text_node = document.createTextNode(guests[i][heading[j].code]);
				text_node.style = {'cursor': 'pointer'};
				td.appendChild(text_node);
				td.addEventListener('click', function() {
					var guest_index = this.id.substr(3);
					update_guest_list(self.updated_guests, guest_index);
				});
			} else if (heading[j].code === 'number_of_guests') {
				var select = document.createElement('select');
				select.id = 'num_guests_' + i;
				td.appendChild(select);
				for (var k = 0; k < guest_numbers.length; k++) {
					var option = document.createElement('option');
					option.value = guest_numbers[k];
					option.text = guest_numbers[k];
					select.appendChild(option);
				}
				if (guests[i].number_of_guests) {
					select.value = guests[i].number_of_guests;
					select.index = guests[i].number_of_guests;
				}  else {
					select.value = '1';
					select.index = '1';
					self.updated_guests[i].number_of_guests = '1';
				}
				select.addEventListener('change', function(value) {
					//this.id is 'num_guests_' + i
					var array_split_ids = this.id.split('_');
					var guest_id = array_split_ids[2];
					self.updated_guests[guest_id].number_of_guests = this.value;
					select.index = this.value;
				});
			} else if (heading[j].code === 'number_of_children') {
				var select_children = document.createElement('select');
				select_children.id = 'num_children_' + i;
				td.appendChild(select_children);
				for (var k = 0; k < children_numbers.length; k++) {
					var option = document.createElement('option');
					option.value = children_numbers[k];
					option.text = children_numbers[k];
					select_children.appendChild(option);
				}
				if (guests[i].number_of_children) {
					select_children.value = guests[i].number_of_children;
					select_children.index = guests[i].number_of_children;
				}  else {
					select_children.value = '0';
					select_children.index = '0';
					self.updated_guests[i].number_of_children = '0';
				}
				select_children.addEventListener('change', function(value) {
					//this.id is 'num_guests_' + i
					var array_split_ids = this.id.split('_');
					var guest_id = array_split_ids[2];
					self.updated_guests[guest_id].number_of_children = this.value;
					select_children.index = this.value;
				});
			} else if (heading[j].code.substr(0, heading[j].code.length - 1) === 'guest') {
				var name_input = document.createElement('input');
				name_input.type = 'text';
				name_input.id = 'name_input_' + heading[j].code + '_' + i;
				td.appendChild(name_input);
				var guest_name = null;
				if (heading[j].code === 'guest1' && !guests[i][heading[j].code]) {
					guest_name = (guests[i].first_name + ' ' + guests[i].last_name);
				} else if (guests[i][heading[j].code]) {
					guest_name = guests[i][heading[j].code].name;
				}
				name_input.value = guest_name;
				if (guest_name) {
					if (!updated_guest[heading[j].code]) {
						updated_guest[heading[j].code] = {};
					}
					updated_guest[heading[j].code].name = guest_name;
				}
				name_input.addEventListener('blur', function(value) {
					var array_split_ids = this.id.split('_');
					var guest_id = array_split_ids[3];
					var guest = array_split_ids[2];
					if (!self.updated_guests[guest_id][guest]) {
						self.updated_guests[guest_id][guest] = {};
					}
					self.updated_guests[guest_id][guest].name = this.value;
				});
			} else {
				td.appendChild(document.createTextNode(guests[i][heading[j].code]));
			}
			tr.appendChild(td);
		}
		table_body.appendChild(tr);
		this.updated_guests[i] = updated_guest;
	}
	guest_list_div.appendChild(guest_list_table);
	save_button.addEventListener('click', function() {
		// Do nothing for now
		// update_guest_list(self.updated_guests, null);
	});
}

function update_guest_list(guest_list, guest_index) {
	var self = this;
	// var config = self.get_config();
	// firebase.initializeApp(config);
	var database = firebase.database();
	
	//var current_guest = guest_list[guest_index];
	debugger;
	var current_guest = Object.assign({}, guest_list[guest_index]);
	var current_guest_id = current_guest.id;
	delete current_guest.id;
	/*
	var update_user = [];
	update_user[current_guest.id] = {
		'number_of_guests': current_guest.number_of_guests,
		'number_of_children': current_guest.number_of_children,
	};
	for(var j = 0; j < current_guest.number_of_guests; j++) {
		if (!update_user[current_guest.id]['guest' + (j + 1)]) {
			update_user[current_guest.id]['guest' + (j + 1)] = {};
		}
		if (current_guest['guest' + (j + 1)]) {
			update_user[current_guest.id]['guest' + (j + 1)].name = current_guest['guest' + (j + 1)].name;
		} else {
			update_user[current_guest.id]['guest' + (j + 1)].name = '';
		}
	}*/
	
	var new_user = database.ref('guests/' + current_guest_id).update(current_guest);
}
