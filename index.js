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
	
	var submit_user = function() {
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
			database.ref('guests').push({
				email: email,
				first_name: first_name,
				last_name: last_name
			});
			welcome();
		}
	};
	
	user_submit.addEventListener('click', function() {
		submit_user();
	});
	
	user_email.addEventListener('enter', function() {
		debugger;
		submit_user();
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
	email_p.innerHTML = "Welcome" + (returning ? " back " + window.user.first_name + "!" : "!") +
		"  We will send out an email<br>invitation for you three months prior to our special day.";
}

function save(save_string_key, save_string) {
	var self = this;
	//converts to JSON string the Object
	var json_save_string = JSON.stringify(save_string);
	//creates a base-64 encoded ASCII string
	var encoded_save_string = btoa(json_save_string);
	//save the encoded accout to web storage
	localStorage.setItem('_' + save_string_key, encoded_save_string);
}

function load(load_string_key) {
	var self = this;
	var encoded_load_string = localStorage.getItem('_' + load_string_key);
	if (!encoded_load_string) return false;
	//decodes a string data encoded using base-64
	var decoded_load_string = atob(encoded_load_string);
	//parses to Object the JSON string
	var load_string = JSON.parse(decoded_load_string);
	//do what you need with the Object
	window[load_string_key] = load_string;
	return true;
}

function add_load_event(func) {
  var old_on_load = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (old_on_load) {
        old_on_load();
      }
      func();
    }
  }
}
