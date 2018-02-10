function guest_list() {
	var self = this;
	var config = self.get_config();
	firebase.initializeApp(config);
	var database = firebase.database();
  
	var guest_list_table = document.getElementById('admin_guest_list_table');
  
  
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
			});
		});
	debugger;

}
