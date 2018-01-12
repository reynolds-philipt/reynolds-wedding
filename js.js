function save_local(save_string_key, save_string) {
  var self = this;
  //converts to JSON string the Object
  var json_save_string = JSON.stringify(save_string);
  //creates a base-64 encoded ASCII string
  var encoded_save_string = btoa(json_save_string);
  //save the encoded accout to web storage
  localStorage.setItem('_' + save_string_key, encoded_save_string);
}

function load_local(load_string_key) {
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

function remove_local(remove_string_key) {
  localStorage.removeItem('_' + remove_string_key);
  return true;
}

function get_config() {
	// Please be nice.  Don't mess with my database.
	// I will fix it soon.
  	var config = {
		apiKey: "AIzaSyBAPX4ORn6MWiFyNXUhg-eZ07awM4UeY9w",
		authDomain: "wedding-360af.firebaseapp.com",
		databaseURL: "https://wedding-360af.firebaseio.com",
		projectId: "wedding-360af",
		storageBucket: "",
		messagingSenderId: "833865959590"
	};
	return config;
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

function load_tab(tab) {
  window.location = 'https://reynolds-philipt.github.io/reynolds-wedding/' + tab;
}
