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
				var user = {
					'id': childSnapshot.key,
					'email': childSnapshot.val().email,
					'first_name': childSnapshot.val().first_name,
					'last_name': childSnapshot.val().last_name,
					'number_of_guests': childSnapshot.val().number_of_guests ? childSnapshot.val().number_of_guests : '1',
				};
				guests.push(user);
			});
			decorate_guest_list_table(guests);
		});
}

function decorate_guest_list_table(guests) {
	var guest_list_div = document.getElementById('admin_guest_list_div');
	
	var save_button = document.createElement('BUTTON');
	save_button.innerHTML = 'Save';
	guest_list_div.appendChild(save_button);
	save_button.addEventListener('click', function() {
		debugger;
	});
	
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
	heading[5] = {'name': "Guest1", 'code': 'guest1'};
	heading[6] = {'name': "Guest2", 'code': 'guest2'};
	heading[7] = {'name': "Guest3", 'code': 'guest3'};
	heading[8] = {'name': "Guest4", 'code': 'guest4'};
	heading[9] = {'name': "Guest5", 'code': 'guest5'};
	heading[10] = {'name': "Guest6", 'code': 'guest6'};
	
	var guest_numbers = ['1', '2', '3', '4', '5', '6'];
	
	//TABLE COLUMNS
	var tr = document.createElement('TR');
	table_body.appendChild(tr);
	for (i = 0; i < heading.length; i++) {
		var th = document.createElement('TH')
		th.width = '75';
		th.appendChild(document.createTextNode(heading[i].name));
		tr.appendChild(th);
	}
	
	var updated_guests = [];
	for (var i = 0; i < guests.length; i++) {
		var updated_guest = guests;
		var tr = document.createElement('TR');
		for (var j = 0; j < heading.length; j++) {
			var td = document.createElement('TD');
			td.width = '75';
			if (heading[j].code === 'number_of_guests'){
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
				} 
				select.addEventListener('change', function(value) {
					//this.id is 'num_guests_' + i
					var guest_id = this.id.substr(11);
					updated_guest[guest_id].number_of_guests = this.value;
				});
			} else if (heading[j].code.substr(0, heading[j].code.length - 1) === 'guest') {
				var name_input = document.createElement('input');
				name_input.type = 'text';
				name_input.id = 'name_input_' + heading[j].code + '_' + i;
				td.appendChild(name_input);
				var guest_name = null;
				if (heading[j].code === 'guest1' && !guests[i][heading[j]]) {
					guest_name = (guests[i].first_name + ' ' + guests[i].last_name);
				} else if (guests[i][heading[j]]) {
					guest_name = guests[i][heading[j]].name;
				}
				name_input.value = guest_name;
				if (guest_name) {
					if (!updated_guest[i][heading[j].code]) {
						updated_guest[i][heading[j].code] = {};
					}
					updated_guest[i][heading[j].code].first_name = guest_name;
				}
				name_input.addEventListener('change', function(value) {
					debugger;
				});
				name_input.addEventListener('blur', function(value) {
					debugger;
				});
			} else {
				td.appendChild(document.createTextNode(guests[i][heading[j].code]));
			}
			tr.appendChild(td);
		}
		table_body.appendChild(tr);
		updated_guests[i] = updated_guest;
	}
	debugger;
	guest_list_div.appendChild(guest_list_table);
}
