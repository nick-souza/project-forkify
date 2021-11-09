//Importing the config file, so we can use the API url and other constant variables:
import { API_URL } from "./config";
//Importing the helper file to get access to those functions:
import { getJSON } from "./helpers";

//Exporting the State object, responsible for keeping all the data for the app:
export const state = {
	recipe: {},
};

//Exporting the load recipe function so we can use it in the controller:
//Passing the id as a parameter because the controller is the one that will get it:
export async function loadRecipe(id) {
	try {
		//Calling the function responsible to make the API call, passing in the global variable API_URL that is in the config file and the id that will be in the search bar;
		//And since the return of that function will be the resolve value of the promise, making the data here another promise, we have to also await;
		const data = await getJSON(`${API_URL}/${id}`);

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
		console.log(recipe);
	} catch (error) {
		//Throwing the error again here, so we can handle it wherever we are calling this function, otherwise it would be a fulfilled promise even with the error;
		throw error;
	}
}
