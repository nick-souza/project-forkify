//Since when we use the parcel we loose the folder structure, we have to change the src of the icons in the template literal that is rendering the recipe from the API. One way to fix this is to import those images:
import icons from "url:../../img/icons.svg";

//Importing a external library, fractional, to show the recipes number like fractions, instead of like 0.5;
import { Fraction } from "fractional";

class RecipeView {
	//Setting private variables:
	#parentElement = document.querySelector(".recipe");
	#data;
	//Private field for the default error message;
	#errorMessage = "Recipe not found. Please try again.";
	//Private field for the default general message;
	#message = "";

	render(data) {
		this.#data = data;

		const markup = this.#generateMarkup();
		//Removing the default message:
		this.#clear();

		//Inserting the markup to the html:
		this.#parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//Method responsible for rendering the error to the users:
	//Using the default to get the commom error message from the view itself;
	renderError(message = this.#errorMessage) {
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
		this.#clear();
		this.#parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//Method to render general messages to the user interface:
	renderMessage(message = this.#message) {
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
		this.#clear();
		this.#parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//Simple method to clear the parent html before rendering anythin into it:
	#clear() {
		this.#parentElement.innerHTML = "";
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
		this.#clear();
		this.#parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	//Method to take care of the listeners, using the PubSub Design Pattern, this method being the publisher, need access to the subscriber;
	addHandlerRender(handler) {
		//Listening for the recipe id and hash to change, so we can change the rendered recipe accordingly.
		//Also listening to the load event, to change the recipe when the link is copied and paste in the search bar;
		// window.addEventListener("hashchange", controlRecipes);
		// window.addEventListener("load", controlRecipes);

		//We can get rid of the duplicate code by:
		["hashchange", "load"].forEach((ev) =>
			window.addEventListener(ev, handler)
		);
	}

	//Since the render method will be present in all the views, is better to add the renderRecipe in a separete private method:
	#generateMarkup() {
		return `
      <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="${
			this.#data.title
		}" class="recipe__img" />
          <h1 class="recipe__title">
          <span>${this.#data.title}</span>
          </h1>
      </figure>

      <div class="recipe__details">
          <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
						this.#data.cookingTime
					}</span>
          <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
						this.#data.servings
					}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
              <svg>
                  <use href="${icons}#icon-minus-circle"></use>
              </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
              <svg>
                  <use href="${icons}#icon-plus-circle"></use>
              </svg>
              </button>
          </div>
          </div>

          <div class="recipe__user-generated">
          <svg>
              <use href="${icons}#icon-user"></use>
          </svg>
          </div>
          <button class="btn--round">
          <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
          </button>
      </div>

      <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(this.#generateMarkupIngredient).join("")}

          </ul>
      </div>

      <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
						this.#data.publisher
					}</span>. Please check out
          directions at their website.
          </p>
          <a
          class="btn--small recipe__btn"
          href="${this.#data.sourceUrl}"
          target="_blank"
          >
          <span>Directions</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </a>
      </div>
    `;
	}

	//Method to generate and render the ingredients list, that will be called in by the #generateMarkup. Just so it is more organized;
	#generateMarkupIngredient(ing) {
		return `
			<li class="recipe__ingredient">
			<svg class="recipe__icon">
					<use href="${icons}#icon-check"></use>
			</svg>
			<div class="recipe__quantity">${
				ing.quantity ? new Fraction(ing.quantity).toString() : ""
			}</div>
			<div class="recipe__description">
					<span class="recipe__unit">${ing.unit}</span>
					${ing.description}
			</div>
			</li>
	`;
	}
}

//Just exporting a new created class here instead the whole class, so that anything outside this file doesnt get to mess with the actual class;
//We dont need any contructor because we are not passing in any parameters:
export default new RecipeView();
