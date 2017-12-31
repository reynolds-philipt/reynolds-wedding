function index() {
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
	
	self.displaying_names = false;
	var email_form = document.getElementById('email_form');
	var email_p = document.getElementById('email_p');
	var user_email = document.getElementById('user_email');
	var first_name_input = document.getElementById('user_first_name');
	var last_name_input = document.getElementById('user_last_name');
	var user_submit = document.getElementById('user_submit');
	
	var user_saved = self.load("user");
	if (user_saved) {
		welcome(true);
	}
	
	user_email.addEventListener('focus', function() {
		email_form.style = {
			'opacity': 1	
		};
	});
	user_email.addEventListener('blur', function() {
		email_form.style = {
			'opacity': 0.5	
		};
	});
	
	last_name_input.addEventListener('keydown', function(event) {
		if (event.keyCode === 13) {
			submit_user();
		}
	});
	
	var submit_user = function() {
		var self = this;
		if (self.displaying_names === false) {
			var guests = database.ref("guests").orderByKey();
			guests.once("value")
				.then(function(snapshot) {
					snapshot.forEach(function(childSnapshot) {
						if (childSnapshot.val().email === user_email.value) {
							window.user = {
								'id': childSnapshot.key,
								'email': childSnapshot.val().email,
								'first_name': childSnapshot.val().first_name,
								'last_name': childSnapshot.val().last_name,
							};
							self.save("user", window.user);
							return true;
						}
					});
					if (!window.user) {
						display_names();
					} else {
						welcome(true);
					}
				});
		} else {
			var email = user_email.value;
			var first_name = first_name_input.value;
			var last_name = last_name_input.value;
			var new_user = database.ref('guests').push({
				email: email,
				first_name: first_name,
				last_name: last_name
			});
			debugger;
			window.user = {
				'id': new_user.path.ct[1],
				'email': email,
				'first_name': first_name,
				'last_name': last_name,
			};
			self.save("user", window.user);
			welcome(false);
		}
	};
	
	user_submit.addEventListener('click', function() {
		submit_user();
	});
	
	user_email.addEventListener('keydown', function(event) {
		if (event.keyCode === 13) {
			submit_user();
		}
	});
}

function display_names() {
	var self = this;
	self.displaying_names = true;
	var first_name_input = document.getElementById('user_first_name');
	var last_name_input = document.getElementById('user_last_name');
	first_name_input.style.display = 'block';
	first_name_input.style.position = 'relative';
	last_name_input.style.display = 'block';
	last_name_input.style.position = 'relative';
	user_submit.value = "Submit";
}

function welcome(returning) {
	var self = this;
	var email_p = document.getElementById('email_p');
	var user_email = document.getElementById('user_email');
	var first_name_input = document.getElementById('user_first_name');
	var last_name_input = document.getElementById('user_last_name');
	var user_submit = document.getElementById('user_submit');
	self.displaying_names = false;
	user_email.style.display = 'none';
	first_name_input.style.display = 'none';
	last_name_input.style.display = 'none';
	user_submit.style.display = 'none';
	email_p.innerHTML = "Welcome " + (returning ? " back " : "") + window.user.first_name + "!" +
		"  We will send out an email<br>invitation for you three months prior to our special day.";

	var header_user_login = document.getElementById('header_user_login_out');
	header_user_login.innerHTML = window.user.first_name + ' ' + window.user.last_name + ' (Sign out)';
	header_user_login.addEventListener('click', function() {
		self.remove('user');
		render();
	});
}
