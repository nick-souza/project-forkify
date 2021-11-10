//Importing the model file so we can use the state and the functions:
import * as model from "./model.js";
//Importing the recipe view:
import recipeView from "./views/recipeView.js";
//Importing the search view:
import searchView from "./views/searchView.js";
//Importing the result view:
import resultsView from "./views/resultsView.js";

//Imports for parcel to use when building to be able to polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

//Hot reload for Percel:
if (module.hot) {
	module.hot.accept();
}

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
		//Calling the view to render the error message to the user:
		recipeView.renderError();
	}
}

//Function resposible for calling the model function to search the recipes, passing in the query. Since the model function returns a promise, we have to handle that as well:
async function controlSearchResults() {
	try {
		//Rendering the spinner when the results are loading:
		resultsView.renderSpinner();

		//Getting the query for the api call from the view:
		const query = searchView.getQuery();
		//Guard clause in case there is no query:
		if (!query) return;

		//No need to store it in a variable, since the model already saves it to the state object. Also have to await because it is a async function:
		await model.loadSearchResults(query);

		//Passing the state object with the stored results to the view so it can render it to the user:
		resultsView.render(model.state.search.results);
	} catch (error) {}
}

function init() {
	//Using the PubSub Design Pattern;
	//Passing the subscriber (controlRecipes) to the publisher in the recipeView, so it can handle the event listeners:
	recipeView.addHandlerRender(controlRecipes);

	//Passing the subscriber to the publisher in the searchView, so it can handle the event listeners:
	searchView.addHandlerSearch(controlSearchResults);
}

init();
