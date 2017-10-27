function index() {
	debugger;
	var self = this;
	var config = {
	  apiKey: "AIzaSyBAPX4ORn6MWiFyNXUhg-eZ07awM4UeY9w",
	  authDomain: "wedding-360af.firebaseapp.com",
	  databaseURL: "https://wedding-360af.firebaseio.com",
	  projectId: "wedding-360af",
	  storageBucket: "",
	  messagingSenderId: "833865959590"
	};
	firebase.initializeApp(config);
	var database = firebase.database();
	
	var user_email = document.getElementById('user_email');
	var user_submit = document.getElementById('user_submit');
	
	user_email.addEventListener('focus', function() {
		debugger;
		user_email.style = {
			'opacity':100	
		};
		display_names();
	});
	
	user_submit.addEventListener('submit', function() {
		debugger;
		// todo: change submit? so it doesn't rerender the screen
	});
	
	var user_id = 2;
	var email = "testing@yahoo.com";
	var first_name = "Test";
	var last_name = "Reynolds";
	/*database.ref('guests/' + user_id).set({
	    email: email,
	    first_name: first_name,
	    last_name: last_name
	});*/
}

function display_names() {
	var name_input = document.getElementsByClassName('name-input');
	
	for (var name_id  in name_input) {
		name_input[name_id].style.display = 'flex';
	}
}
