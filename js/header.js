function header() {
  var self = this;
  var header_user_login = document.getElementById('header_user_login_out');

  var user_saved = self.load_local('user');
  if (user_saved) {
    if (window.user.number_of_guests && +window.user.number_of_guests >= 1) {
      show_header_confirmed_users();
    } else {
      hide_header_confirmed_users();
    }
    header_user_login.innerHTML = window.user.first_name + ' ' + window.user.last_name + ' (Sign out)';
    header_user_login.addEventListener('click', function() {
      self.remove_local('user');
      render();
    });
  } else {
    hide_header_confirmed_users();
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

function hide_header_confirmed_users() {
  var rsvp_header = document.getElementById('header_button_rsvp');
  rsvp_header.style.display = 'none';
  var rsvp_divider = document.getElementById('header_button_divider_rsvp');
  rsvp_divider.style.display = 'none';

  var venue_header = document.getElementById('header_button_venue');
  venue_header.style.display = 'none';
  var venue_divider = document.getElementById('header_button_divider_venue');
  venue_divider.style.display = 'none';

  var hotel_header = document.getElementById('header_button_hotel');
  hotel_header.style.display = 'none';
  var hotel_divider = document.getElementById('header_button_divider_hotel');
  hotel_divider.style.display = 'none';

  var invite_header = document.getElementById('header_button_invitation');
  invite_header.style.display = 'none';
  var invite_divider = document.getElementById('header_button_divider_invitation');
  invite_divider.style.display = 'none';
}

function show_header_confirmed_users() {
  var rsvp_header = document.getElementById('header_button_rsvp');
  rsvp_header.style.display = '';
  var rsvp_divider = document.getElementById('header_button_divider_rsvp');
  rsvp_divider.style.display = '';

  var venue_header = document.getElementById('header_button_venue');
  venue_header.style.display = '';
  var venue_divider = document.getElementById('header_button_divider_venue');
  venue_divider.style.display = '';

  var hotel_header = document.getElementById('header_button_hotel');
  hotel_header.style.display = '';
  var hotel_divider = document.getElementById('header_button_divider_hotel');
  hotel_divider.style.display = '';

  var invite_header = document.getElementById('header_button_invitation');
  invite_header.style.display = '';
  var invite_divider = document.getElementById('header_button_divider_invitation');
  invite_divider.style.display = '';
}
