import { async } from "regenerator-runtime";

//Exporting the State object, responsible for keeping all the data for the app:
export const state = {
	recipe: {},
};

//Exporting the load recipe function so we can use it in the controller:
//Passing the id as a parameter because the controller is the one that will get it:
export async function loadRecipe(id) {
	try {
		const res = await fetch(
			`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
		);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

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
		alert(error);
	}
}
