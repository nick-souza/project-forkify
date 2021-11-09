//Helper file that will contain helper functions that we will reuse many times accross the project:

//Importing the config file:
import { TIMEOUT_SEC } from "./config";

//Function responsible to returning a rejected promise after a number of seconds, we can use this in case the user has some trouble loading the recipes, so the fetch does not run forever;
function timeout(s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
}

export async function getJSON(url) {
	try {
		//Using promise.race here to check which promise will resolve faster, the loading fetch or the timeout that will reject after the seconds that were passed as arguments;
		const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

		return data;
	} catch (error) {
		//Throwing the error again here, so we can handle it wherever we are calling this function, otherwise it would be a fulfilled promise even with the error;
		throw error;
	}
}
