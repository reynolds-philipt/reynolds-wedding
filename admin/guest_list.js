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
				};
				guests.push(user);
				decorate_guest_list_table(guests);
			});
		});
}

function decorate_guest_list_table(guests) {
	var guest_list_table = document.getElementById('admin_guest_list_table');
	
	var table_body = document.createElement('TBODY');
	
	guest_list_table.border = '1';
	guest_list_table.appendChild(table_body);
	var heading = new Array();
	heading[0] = {'name': "ID", 'code': 'id'};
	heading[1] = {'name': "Email", 'code': 'email'};
	heading[2] = {'name': "First Name", 'code': 'first_name'};
	heading[3] = {'name': "Last Name", 'code': 'last_name'};
	heading[4] = {'name': "Number of guests", 'code': 'number_of_guests'};
	heading[5] = {'name': "Email", 'code': 'email'};
	
	
	//TABLE COLUMNS
	var tr = document.createElement('TR');
	tableBody.appendChild(tr);
	for (i = 0; i < heading.length; i++) {
		var th = document.createElement('TH')
		th.width = '75';
		th.appendChild(document.createTextNode(heading[i].name));
		tr.appendChild(th);
	}
	
	for (var i = 0; i < guests.length; i++) {
		var tr = document.createElement('TR');
		for (var j = 0; j < heading.length; j++) {
			var td = document.createElement('TD');
			td.width = '75';
			td.appendChild(document.createTextNode(guests[i][heading[j].code]);
			tr.appendChild(td);
		}
		table_body.appendChild(tr);
	}
	
}
