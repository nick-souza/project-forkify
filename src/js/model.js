//Importing the config file, so we can use the API url and other constant variables:
import { API_URL, RES_PER_PAGE } from "./config";
//Importing the helper file to get access to those functions:
import { getJSON } from "./helpers";

//Exporting the State object, responsible for keeping all the data for the app:
export const state = {
	recipe: {},
	//Now the search object, already containing the query and the result:
	search: {
		query: "",
		results: [],
		page: 1,
		resultsPerPage: RES_PER_PAGE,
	},
};

//Exporting the load recipe function so we can use it in the controller:
//Passing the id as a parameter because the controller is the one that will get it:
export async function loadRecipe(id) {
	try {
		//Calling the function responsible to make the API call, passing in the global variable API_URL that is in the config file and the id that will be in the search bar;
		//And since the return of that function will be the resolve value of the promise, making the data here another promise, we have to also await;
		const data = await getJSON(`${API_URL}${id}`);

		//Creating a new variable to manipulate the recipe result from the call:
		// let recipe = data.data.recipe;
		//Since they have the same name we can use destructuring already:
		const { recipe } = data.data;
		//Now just renaming the properties name and assigning it to the state variable:
		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredients: recipe.ingredients,
		};
	} catch (error) {
		//Throwing the error again here, so we can handle it wherever we are calling this function, otherwise it would be a fulfilled promise even with the error;
		throw error;
	}
}

//Exporting the function that will be called by the controller, responsible for making the api call for the searches:
export async function loadSearchResults(query) {
	try {
		state.search.query = query;

		//Making a GET request to the api so we can get all the results based on the keyword the user searched for:
		const data = await getJSON(`${API_URL}?search=${query}`);

		//Creating a new array from the array recipe from the result of the api call, so we can rename the objects:
		//And also storing the results in the state object:
		state.search.results = data.data.recipes.map((recipe) => {
			return {
				id: recipe.id,
				title: recipe.title,
				publisher: recipe.publisher,
				image: recipe.image_url,
			};
		});
	} catch (error) {
		//Throwing the error again here, so we can handle it wherever we are calling this function, otherwise it would be a fulfilled promise even with the error;
		throw error;
	}
}

//Function responsible for the pagination, taking in the page number as a parameter:
//Since at this point we already have the results loaded, we only need to slice the results array according to the page size:
export function getSearchResultsPage(page = state.search.page) {
	//Storing the page number we are in, so we can display the privious and the next page:
	state.search.page = page;

	//To switch between pages we need to calculate these values dynamically:

	//We take the page wanted, subtract 1 and multiply by the ammount of results we want in the page. So page 1 - 1 is 0, multiplied by 10 is 0, so the first argument for the slice for tha page 1 will be 0:
	const start = (page - 1) * state.search.resultsPerPage;

	//And here just multiply by 10. So page 1 * 10 will result in 10, since the slice method does not count the last element, we will have 10 results by page:
	const end = page * state.search.resultsPerPage;

	return state.search.results.slice(start, end);
}

//Function that will update the ingredients quantity values of the recipe according to the servings that will be coming from the controller:
export function updateServings(newServings) {
	//Updating the ingredients array to multiply the quantity by the new servings number:
	//Using the formula: newQuantity = oldQuantity * newServings / oldServings;
	state.recipe.ingredients.forEach((ing) => {
		ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
	});

	//Now update the servings in the state object:
	state.recipe.servings = newServings;
}
