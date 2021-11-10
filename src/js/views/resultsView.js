//Class responsible for rendering the search results to the user:

//Importing the parent View class:
import View from "./View";

//Since when we use the parcel we loose the folder structure, we have to change the src of the icons in the template literal that is rendering the recipe from the API. One way to fix this is to import those images:
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
	_parentElement = document.querySelector(".results");

	//Private field for the default error message;
	_errorMessage = "No recipes found for your query. Try again.";
	//Private field for the default general message;
	_message = "";

	//Method to generate html code so the parent method View.render can load it to the user screen:
	_generateMarkup() {
		//Since the result comming from the controller will be an array, we need to loop over it and then join it all together:
		return this._data.map(this._generateMarkupPreview).join("");
	}

	//Method responsible for generating the html for each result, to be passed in the map method for the _data:
	_generateMarkupPreview(result) {
		//Functionality to make the current recipe selected, active
		//Getting the id from the search bar, minus the #symbol:
		const id = window.location.hash.slice(1);

		return `
      <li class="preview">
        <a class="preview__link ${
					result.id === id ? "preview__link--active" : ""
				}" href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
        </a>
      </li>
    `;
	}
}

export default new ResultsView();
