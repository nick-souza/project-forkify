// //Class responsible for generating the preview html code for the result and bookmark view

import View from "./View.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class PreviewView extends View {
	_parentElement = "";

	//Method responsible for generating the html for each result, to be passed in the map method for the _data:
	_generateMarkup() {
		//Functionality to make the current recipe selected, active
		//Getting the id from the search bar, minus the #symbol:
		const id = window.location.hash.slice(1);

		return `
      <li class="preview">
        <a class="preview__link ${
					this._data.id === id ? "preview__link--active" : ""
				}" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${
							this._data.key ? "" : "hidden"
						}">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
	}
}

export default new PreviewView();
