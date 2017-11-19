function header() {
	var self = this;
	var headerText = document.createElement("div");
	// Initialize Firebase
	debugger;
	var config = {
	  apiKey: "AIzaSyBAPX4ORn6MWiFyNXUhg-eZ07awM4UeY9w",
	  authDomain: "wedding-360af.firebaseapp.com",
	  databaseURL: "https://wedding-360af.firebaseio.com",
	  projectId: "wedding-360af",
	  storageBucket: "",
	  messagingSenderId: "833865959590"
	};
	firebase.initializeApp(config);
	
	document.getElementById('date_header_button');

	var header_user_login = document.getElementById('header_user_login_out');
	
	var user = self.get('user');
	if (user) {
		header_user_login.innerHTML(user.first_name + ' ' + user.last_name + ' (Sign out)';
	}
}

