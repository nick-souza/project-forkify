//Parent view class that contains the general methods so the other views can reuse it:

//Since when we use the parcel we loose the folder structure, we have to change the src of the icons in the template literal that is rendering the recipe from the API. One way to fix this is to import those images:
import icons from "url:../../img/icons.svg";

//Exporting the class as default because we wont need to create any instance of this view class:
export default class View {
	_data;

	render(data, render = true) {
		//Handling in case the data does not exist, example the user searching for something that does not exist:
		//So checking if the data exists OR if the data is an array AND if its empty:
		if (!data || (Array.isArray(data) && data.length === 0))
			return this.renderError();

		this._data = data;

		const markup = this._generateMarkup();

		if (!render) return markup;

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

	update(data) {
		//We still want the date to be equal to the new data;
		this._data = data;

		//Now we want to generate the new markup, with the changes
		const newMarkup = this._generateMarkup();

		//But since the markup is still just a string, we can convert to a DOM element to be easier to check for changes:
		const newDOM = document.createRange().createContextualFragment(newMarkup);
		//Selecting the new elements with the changes, and converting the node list that was returned to a real Array;
		const newElements = Array.from(newDOM.querySelectorAll("*"));
		//We now have the entire page as a DOM element, with all the changes made, that we can use to compare with the one that the user is stil seeing to then only render the changes, and not the entire element;

		//But we also need to select the current elements to know the difference, and convert to a real array as well;
		const curElements = Array.from(this._parentElement.querySelectorAll("*"));

		//Now we can loop over the two arrays, using forEach and getting the index and use the method isEqualNode to check for changes:
		newElements.forEach((newEl, i) => {
			//Getting the same current element using the index from the forEach
			const curEl = curElements[i];

			//Now if the newEl is different from the curEl AND if the node is an actual text, we can change it:
			//The method nodeValue returns null for all elementes that are not texts, and we can use it since we only want to change the text content
			if (
				!newEl.isEqualNode(curEl) &&
				newEl.firstChild?.nodeValue.trim() !== ""
			) {
				curEl.textContent = newEl.textContent;
			}

			//And now we need to do the same but for attributes, since the btns contains different attributes like increasing the servings ammount
			if (!newEl.isEqualNode(curEl)) {
				Array.from(newEl.attributes).forEach((att) =>
					curEl.setAttribute(att.name, att.value)
				);
			}
		});
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
