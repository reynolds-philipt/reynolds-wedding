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
	});
	
	user_submit.addEventListener('click', function() {
		var name_input = document.getElementsByClassName('name-input');
		debugger;
		display_names();
		debugger;
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
	var first_name_input = document.getElementById('user_first_name');
	var last_name_input = document.getElementById('user_last_name');
	first_name_input.style.display = 'block';
	first_name_input.style.position = 'relative';
	last_name_input.style.display = 'block';
	last_name_input.style.position = 'relative';
}
