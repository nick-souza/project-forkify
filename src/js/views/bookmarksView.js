//Class responsible for rendering the search results to the user:

//Importing the parent View class:
import View from "./View";
import previewView from "./previewView.js";

class BookmarksView extends View {
	_parentElement = document.querySelector(".bookmarks__list");

	//Private field for the default error message;
	_errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
	//Private field for the default general message;
	_message = "";

	//Method to render the bookmarks on page load:
	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}

	//Method to generate html code so the parent method View.render can load it to the user screen:
	_generateMarkup() {
		//Since the result comming from the controller will be an array, we need to loop over it and then join it all together:
		return this._data
			.map((bookmark) => previewView.render(bookmark, false))
			.join("");
	}
}

export default new BookmarksView();
