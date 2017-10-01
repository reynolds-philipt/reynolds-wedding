function index() {
	debugger;
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
	var user_id = 1;
	var email = "reynolds.philipt@gmail.com";
	var name = "Philip Reynolds";
	database.ref('guests/' + user_id).set({
	    username: name,
	    email: email,
	});
}
