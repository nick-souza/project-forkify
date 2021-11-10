//Parent view class that contains the general methods so the other views can reuse it:

//Since when we use the parcel we loose the folder structure, we have to change the src of the icons in the template literal that is rendering the recipe from the API. One way to fix this is to import those images:
import icons from "url:../../img/icons.svg";

//Exporting the class as default because we wont need to create any instance of this view class:
export default class View {
	_data;

	render(data) {
		//Handling in case the data does not exist, example the user searching for something that does not exist:
		//So checking if the data exists OR if the data is an array AND if its empty:
		if (!data || (Array.isArray(data) && data.length === 0))
			return this.renderError();

		this._data = data;

		const markup = this._generateMarkup();
		//Removing the default message:
		this._clear();

		//Inserting the markup to the html:
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//Method responsible for rendering the error to the users:
	//Using the default to get the commom error message from the view itself;
	renderError(message = this._errorMessage) {
		this._clear();
		const markup = `
			<div class="error">
				<div>
					<svg>
					<use href="${icons}#icon-alert-triangle"></use>
					</svg>
				</div>
				<p>${message}</p>
			</div>
		`;
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//Method to render general messages to the user interface:
	renderMessage(message = this._message) {
		const markup = `
			<div class="message">
				<div>
					<svg>
					<use href="${icons}#icon-smile"></use>
					</svg>
				</div>
				<p>${message}</p>
			</div>
		`;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//Simple method to clear the parent html before rendering anythin into it:
	_clear() {
		this._parentElement.innerHTML = "";
	}

	//Render the spinner when the user is loading the recipe:
	renderSpinner() {
		//It works because inside the css for the spinner class theres is a spinning animation already;
		const markup = `
			<div class="spinner">  
				<svg>
					<use href="${icons}#icon-loader"></use>
				</svg>
			</div>
		`;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}
}
