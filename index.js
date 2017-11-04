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
	
	self.displaying_names = false;
	var email_form = document.getElementById('email_form');
	var email_p = document.getElementById('email_p');
	var user_email = document.getElementById('user_email');
	var first_name_input = document.getElementById('user_first_name');
	var last_name_input = document.getElementById('user_last_name');
	var user_submit = document.getElementById('user_submit');
	self.user;
	
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
	
	user_submit.addEventListener('click', function() {
		if (self.displaying_names === false) {
			var guests = database.ref("guests").orderByKey();
			guests.once("value")
				.then(function(snapshot) {
					snapshot.forEach(function(childSnapshot) {
						if (childSnapshot.val().email === user_email.value) {
							self.user = {
								'id': childSnapshot.key,
								'email': childSnapshot.val().email,
								'first_name': childSnapshot.val().first_name,
								'last_name': childSnapshot.val().last_name,
							};
							return true;
						}
						debugger;
					});
					if (!self.user) {
						display_names();
					} else {
						welcome(true);
					}
				});
		} else {
			var email = user_email.value;
			var first_name = first_name_input.value;
			var last_name = last_name_input.value;
			database.ref('guests').push({
				email: email,
				first_name: first_name,
				last_name: last_name
			});
			welcome();
		}
		debugger;
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
	debugger;
	email_p.innerHTML = "Welcome" + (returning ? " back " + self.user.first_name + "!" : "!") +
		"  We will send out an email<br>invitation for you three months out.";
}
