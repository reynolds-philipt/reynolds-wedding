function header() {
	var self = this;
	// Initialize Firebase
	/*
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
*/
	var header_user_login = document.getElementById('header_user_login_out');
	
	var user_saved = self.load('user');
	if (user_saved) {
		header_user_login.innerHTML = window.user.first_name + ' ' + window.user.last_name + ' (Sign out)';
		header_user_login.addEventListener('click', function() {
			debugger;
			localStorage.removeItem('user');
			render();
		});
	}
}

