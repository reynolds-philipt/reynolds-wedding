<?PHP

const DEFAULT_URL = 'https://wedding-360af.firebaseio.com';
const DEFAULT_TOKEN = 'AIzaSyBAPX4ORn6MWiFyNXUhg-eZ07awM4UeY9w';
const DEFAULT_PATH = 'guests'; // 'wedding-360af.firebaseapp.com';

$firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);

public function save_guest($guest_object) {
  $firebase->push(DEFAULT_PATH, $guest_object);
}

public function get_guest($guest_object) {
  
}
