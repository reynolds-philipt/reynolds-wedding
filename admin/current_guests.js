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
				} 
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
	
	for (var i = 0; i < guests.length; i++) {
		var updated_guest = guests[i];
		var tr = document.createElement('TR');
		for (var j = 0; j < heading.length; j++) {
			var td = document.createElement('TD');
			td.width = '75';
			if (heading[j].code.substr(0, heading[j].code.length - 1) === 'guest') {
				td.appendChild(document.createTextNode(guests[i][heading[j].code].name));
			} else {
				td.appendChild(document.createTextNode(guests[i][heading[j].code]));
			}
			tr.appendChild(td);
		}
		table_body.appendChild(tr);
	}
	current_guests_div.appendChild(current_guests_table);
}
