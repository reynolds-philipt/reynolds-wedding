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
      self.remove('user');
      render();
    });
  }

  debugger;
  var pathname = window.location.pathname;
  if (pathname.length > 20) {
    var usable_pathname = pathname.substr(18, pathname.length - 23);
    if (usable_pathname !== 'index') {
      var button_id = 'header_button_' + usable_pathname;
      document.getElementById(button_id).classList.add('header_button_selected_light');
    }
  }
}

