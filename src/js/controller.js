//Importing the model file so we can use the state and the functions:
import * as model from "./model.js";
//Importing the recipe view:
import recipeView from "./views/recipeView.js";

//Imports for parcel to use when building to be able to polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

//API Call:
async function controlRecipes() {
	try {
		//Getting the current id from the serach bar so we can listen to it and change the rendering when it changes:
		//Using the slice method to remove the hash (#) symbol and only use the actual id
		const id = window.location.hash.slice(1);

		//Guard clause in case the user does not input any hash code in the search bar:
		if (!id) return;

		//Rendering the spinner while the user loads the call from the api, from the view;
		recipeView.renderSpinner();

		//Calling the function from the model to load the recipes from the api, passing the id we got from the hashcode;
		//And since this is a async function, it always returns a promise, se we have to await it:
		await model.loadRecipe(id);

		//Now rendering the recipe:
		//And since we dont have access here to the actual recipeView class, we have to create a new method to be able to render the recipes:
		recipeView.render(model.state.recipe);
	} catch (error) {
		console.error(error);
	}
}

function init() {
	//Using the PubSub Design Pattern;
	//Passing the subscriber (controlRecipes) to the publisher in the recipeView, so it can handle the event listeners:
	recipeView.addHandlerRender(controlRecipes);
}

init();
