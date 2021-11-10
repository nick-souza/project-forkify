//Class responsible for rendering the search results to the user:

//Importing the parent View class:
import View from "./View";
import previewView from "./previewView.js";

class ResultsView extends View {
	_parentElement = document.querySelector(".results");

	//Private field for the default error message;
	_errorMessage = "No recipes found for your query. Try again.";
	//Private field for the default general message;
	_message = "";

	//Method to generate html code so the parent method View.render can load it to the user screen:
	_generateMarkup() {
		//Since the result comming from the controller will be an array, we need to loop over it and then join it all together:
		return this._data
			.map((result) => previewView.render(result, false))
			.join("");
	}
}

export default new ResultsView();
