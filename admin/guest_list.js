function guest_list() {
	var self = this;
	var config = self.get_config();
	firebase.initializeApp(config);
	var database = firebase.database();
  
	var guest_list_table = document.getElementById('admin_guest_list_table');
  
  
	var guests = database.ref("guests").orderByKey();
	debugger;

}
