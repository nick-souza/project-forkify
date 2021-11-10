//Class responsible for handling the search bar and btn for the user interface, passing the values to the controller to make the query:
class SearchView {
	//Selecting the parent element that contains the search bar and the button:
	_parentEl = document.querySelector(".search");

	//Method for returning whatever the user has typed in the search bar, selecting the form field and getting the value:
	getQuery() {
		const query = this._parentEl.querySelector(".search__field").value;
		this._clearInout();
		return query;
	}

	//Publisher necessary to listing to the btn events, needing the subscriber in the controller:
	addHandlerSearch(handler) {
		this._parentEl.addEventListener("submit", function (e) {
			//Preventing the form from realoading the page:
			e.preventDefault();
			//Now calling the handler function coming from the controller:
			handler();
		});
	}

	//Clearing the input field aftier hiting submit:
	_clearInout() {
		return (this._parentEl.querySelector(".search__field").value = "");
	}
}

//Just exporting a new created class here instead the whole class, so that anything outside this file doesnt get to mess with the actual class;
//We dont need any contructor because we are not passing in any parameters:
export default new SearchView();
