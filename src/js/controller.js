//Since when we use the parcel we loose the folder structure, we have to change the src of the icons in the template literal that is rendering the recipe from the API. One way to fix this is to import those images:
import icons from "url:../img/icons.svg";
//Imports for parcel to use when building to be able to polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

// https://forkify-api.herokuapp.com/v2

//Render the spinner when the user is loading the recipe:
function renderSpinner(parentEl) {
	//It works because inside the css for the spinner class theres is a spinning animation already;
	const markup = `
  <div class="spinner">  
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
	parentEl.innerHTML = "";
	parentEl.insertAdjacentHTML("afterbegin", markup);
}

//First API Call:
async function showRecipe() {
	try {
		//Getting the current id from the serach bar so we can listen to it and change the rendering when it changes:
		//Using the slice method to remove the hash (#) symbol and only use the actual id
		const id = window.location.hash.slice(1);

		//Guard clause in case the user does not input any hash code in the search bar:
		if (!id) return;

		//Rendering the spinner while the user loads the call from the api:
		renderSpinner(recipeContainer);

		const res = await fetch(
			`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
		);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

		//Creating a new variable to manipulate the recipe result from the call:
		// let recipe = data.data.recipe;
		//Since they have the same name we can use destructuring already:
		let { recipe } = data.data;
		//Now just renaming the properties name:
		recipe = {
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredients: recipe.ingredients,
		};
		console.log(recipe);

		//Now rendering the recipe:
		const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
						recipe.cookingTime
					}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
						recipe.servings
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
        ${recipe.ingredients
					.map((ing) => {
						return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
          `;
					})
					.join("")}

        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
						recipe.publisher
					}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

		//Removing the default message:
		recipeContainer.innerHTML = "";

		//Inserting the markup to the html:
		recipeContainer.insertAdjacentHTML("afterbegin", markup);
	} catch (error) {
		console.error(error);
	}
}

showRecipe();

//Listening for the recipe id and hash to change, so we can change the rendered recipe accordingly.
//Also listening to the load event, to change the recipe when the link is copied and paste in the search bar;
// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);

//We can get rid of the duplicate code by:
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
