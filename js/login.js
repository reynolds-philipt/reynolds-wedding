function login() {
	var self = this;
	var config = self.get_config();
	firebase.initializeApp(config);
	var database = firebase.database();
	
	self.displaying_names = false;
	var email_form = document.getElementById('email_form');
	var email_p = document.getElementById('email_p');
	var user_email = document.getElementById('user_email');
	var first_name_input = document.getElementById('user_first_name');
	var last_name_input = document.getElementById('user_last_name');
	var user_submit = document.getElementById('user_submit');
	
	var user_saved = self.load_local("user");
	if (user_saved) {
		if (!window.user.number_of_guests) {
			var guests_db = database.ref("guests").orderByKey();
			guests_db.once("value")
				.then(function(snapshot) {
					snapshot.forEach(function(childSnapshot) {
						if (childSnapshot.val().email.toUpperCase() === window.user.email.toUpperCase()) {
							window.user = childSnapshot.val();
							window.user.id = childSnapshot.key;
							/*
							window.user = {
								'id': childSnapshot.key,
								'email': childSnapshot.val().email,
								'first_name': childSnapshot.val().first_name,
								'last_name': childSnapshot.val().last_name,
							};*/
							self.save_local("user", window.user);
							if (window.user.number_of_guests && +window.user.number_of_guests > 0) {
								document.location.reload();
							}
							return true;
						}
					});
					welcome(true);
				});
		}
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
						if (childSnapshot.val().email.toUpperCase() === user_email.value.toUpperCase()) {
							window.user = childSnapshot.val();
							window.user.id = childSnapshot.key;
							/*
							window.user = {
								'id': childSnapshot.key,
								'email': childSnapshot.val().email,
								'first_name': childSnapshot.val().first_name,
								'last_name': childSnapshot.val().last_name,
							};*/
							self.save_local("user", window.user);
							if (window.user.number_of_guests && +window.user.number_of_guests > 0) {
								document.location.reload();
							}
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
			/*var new_user = {
				email: email,
				first_name: first_name,
				last_name: last_name
			};
			var url = '/php/guest.php';
			$.ajax({
				type: 'POST',
				url: url,
				data: JSON.stringify(new_user),
				dataType: 'json'
			});*/
			window.user = {
				'id': new_user.path.ct[1],
				'email': email,
				'first_name': first_name,
				'last_name': last_name,
			};
			self.save_local("user", window.user);
			welcome(false);
		}
	};
	
	user_submit.addEventListener('click', function() {
		var first_name = first_name_input.value;
		var last_name = last_name_input.value;
		if ((first_name && first_name !== '') || (last_name && last_name !== '')) {
			submit_user();
		} else if ((!first_name || first_name === '') && (!last_name || last_name === '')) {
			alert('Need to add a first name and a last name');
		} else if (!first_name || first_name === '') {
			alert('Need to add a first name');
		} else if (!last_name || last_name === '') {
			alert('Need to add a last name');
		}
	});
	
	user_email.addEventListener('keydown', function(event) {
		if (event.keyCode === 13) {
			var first_name = first_name_input.value;
			var last_name = last_name_input.value;
			if ((first_name && first_name !== '') || (last_name && last_name !== '')) {
				submit_user();
			} else if ((!first_name || first_name === '') && (!last_name || last_name === '')) {
				alert('Need to add a first name and a last name');
			} else if (!first_name || first_name === '') {
				alert('Need to add a first name');
			} else if (!last_name || last_name === '') {
				alert('Need to add a last name');
			}
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
	var email_header = document.getElementById('email_header');
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
	email_header.style.display = '';
	email_header.innerHTML = "Welcome " + (returning ? " back " : "") + window.user.first_name + "!";
	var guest_set_up = (window.user.number_of_guests && +window.user.number_of_guests > 0);
	email_p.innerHTML = (guest_set_up ?
		 "Please go to the RSVP page to let us know<br>if you will be able to join us in celebrating." :
		 "We will send out an email invitation for you<br>once your account is set up in the next few days.");

	var header_user_login = document.getElementById('header_user_login_out');
	header_user_login.innerHTML = window.user.first_name + ' ' + window.user.last_name + ' (Sign out)';
	header_user_login.addEventListener('click', function() {
		self.remove_local('user');
		render();
	});
}
