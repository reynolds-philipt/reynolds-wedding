function current_guests() {
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
				/*
				var user = {
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
				}*/
				guests.push(user);
			});
			decorate_current_guests_table(guests);
		});
}

function decorate_current_guests_table(guests) {
	var self = this;
	var current_guests_div = document.getElementById('admin_current_guests_div');
	
	
	var current_guests_table = document.createElement('TABLE');
	var table_body = document.createElement('TBODY');
	
	current_guests_table.border = '1';
	current_guests_table.appendChild(table_body);
	var heading = new Array();
	heading[0] = {'name': "ID", 'code': 'id'};
	heading[1] = {'name': "Email", 'code': 'email'};
	heading[2] = {'name': "First Name", 'code': 'first_name'};
	heading[3] = {'name': "Last Name", 'code': 'last_name'};
	heading[4] = {'name': "Number of guests", 'code': 'number_of_guests'};
	heading[5] = {'name': "Number of children", 'code': 'number_of_children'};
	heading[6] = {'name': "Guest1", 'code': 'guest1_name'};
	heading[7] = {'name': "Guest1 Dinner", 'code': 'guest1_dinner'};
	heading[8] = {'name': "Guest1 Allergies", 'code': 'guest1_allergies'};
	heading[9] = {'name': "Guest2", 'code': 'guest2_name'};
	heading[10] = {'name': "Guest2 Dinner", 'code': 'guest2_dinner'};
	heading[11] = {'name': "Guest2 Allergies", 'code': 'guest2_allergies'};
	heading[12] = {'name': "Guest3", 'code': 'guest3_name'};
	heading[13] = {'name': "Guest3 Dinner", 'code': 'guest3_dinner'};
	heading[14] = {'name': "Guest3 Allergies", 'code': 'guest3_allergies'};
	heading[15] = {'name': "Guest4", 'code': 'guest4_name'};
	heading[16] = {'name': "Guest4 Dinner", 'code': 'guest4_dinner'};
	heading[17] = {'name': "Guest4 Allergies", 'code': 'guest4_allergies'};
	heading[18] = {'name': "Guest5", 'code': 'guest5_name'};
	heading[19] = {'name': "Guest5 Dinner", 'code': 'guest5_dinner'};
	heading[20] = {'name': "Guest5 Allergies", 'code': 'guest5_allergies'};
	heading[21] = {'name': "Guest6", 'code': 'guest6_name'};
	heading[22] = {'name': "Guest6 Dinner", 'code': 'guest6_dinner'};
	heading[23] = {'name': "Guest6 Allergies", 'code': 'guest6_allergies'};
	heading[24] = {'name': "Song", 'code': 'song'};
	heading[25] = {'name': "Comment", 'code': 'comment'};
	
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
	
	for (var i = 0; i < guests.length; i++) {
		var updated_guest = guests[i];
		var tr = document.createElement('TR');
		for (var j = 0; j < heading.length; j++) {
			var td = document.createElement('TD');
			td.width = '75';
			td.id = heading[j].code;
			var split_code = heading[j].code.split('_');
			if (split_code[0] === 'guest' && split_code[1] === 'name' && guests[i][split_code[0]] && guests[i][split_code[0]].name) {
				td.appendChild(document.createTextNode(guests[i][heading[j].code].name));
			} else if (split_code[0] === 'guest' && split_code[1] === 'dinner' && guests[i][split_code[0]] && guests[i][split_code[0]].dinner) {
				td.appendChild(document.createTextNode(guests[i][heading[j].code].dinner));
			} else if (split_code[0] === 'guest' && split_code[1] === 'dinner' && guests[i][split_code[0]] && guests[i][split_code[0]].allergies) {
				td.appendChild(document.createTextNode(guests[i][heading[j].code].allergies));
			} else {
				td.appendChild(document.createTextNode(guests[i][heading[j].code]));
			}
			tr.appendChild(td);
		}
		var td = document.createElement('TD');
		var name_input = document.createElement('input');
		name_input.type = 'text';
		name_input.id = 'name_input_' + i;
		td.appendChild(name_input);
		tr.appendChild(td);

		table_body.appendChild(tr);
	}
	current_guests_div.appendChild(current_guests_table);
}
