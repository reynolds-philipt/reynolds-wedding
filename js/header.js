function header() {
  var self = this;
  var header_user_login = document.getElementById('header_user_login_out');

  var user_saved = self.load_local('user');
  if (user_saved) {
    header_user_login.innerHTML = window.user.first_name + ' ' + window.user.last_name + ' (Sign out)';
    header_user_login.addEventListener('click', function() {
      self.remove_local('user');
      render();
    });
  } else {
    var rsvp_header = document.getElementById('header_button_rsvp');
    rsvp_header.style.display = 'none';
    var venue_header = document.getElementById('header_button_venue');
    venue_header.style.display = 'none';
    var hotel_header = document.getElementById('header_button_hotel');
    hotel_header.style.display = 'none';
    // var invite_header = document.getElementById('header_button_invite');
    // invite_header.style.display = 'none';
  }

  var pathname = window.location.pathname;
  if (pathname.length > 20) {
    var usable_pathname = pathname.substr(23, pathname.length - 28);
    if (usable_pathname !== 'login') {
      var button_id = 'header_button_' + usable_pathname;
      document.getElementById(button_id).classList.add('header_button_selected_light');
    }
  }
}

