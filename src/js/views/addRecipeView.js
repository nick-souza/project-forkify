//Class responsible for rendering the page btn in the user seraches:

//Importing the parent View class:
import View from "./View";

class AddRecipeView extends View {
	_parentElement = document.querySelector(".upload");
	_message = "Recipe was successfuly uploaded!";

	_window = document.querySelector(".add-recipe-window");
	_overlay = document.querySelector(".overlay");
	_btnOpen = document.querySelector(".nav__btn--add-recipe");
	_btnClose = document.querySelector(".btn--close-modal");

	//Adding a constructor because we want this function to run as soon as the page loads:
	constructor() {
		super();
		this._addHandlerShowWindow();
		this._addHandlerCloseWindow();
	}

	//Method to listen to the btns:
	_addHandlerShowWindow() {
		this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
	}

	//Method to close:
	_addHandlerCloseWindow() {
		this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
		this._overlay.addEventListener("click", this.toggleWindow.bind(this));
	}

	//Removing the hidden class from the elements so we can see the modal window, and blur the background with the overlay
	toggleWindow() {
		this._overlay.classList.toggle("hidden");
		this._window.classList.toggle("hidden");
	}

	//Handle the form submition:
	addHandlerUploar(handler) {
		this._parentElement.addEventListener("submit", function (e) {
			e.preventDefault();

			//Using FormData to retrieve all the data entered in the inputs at once, spreading the result value into an array:
			const dataArr = [...new FormData(this)];

			//Now converting the array to an object using the fromEntries:
			const data = Object.fromEntries(dataArr);

			handler(data);
		});
	}
	_generateMarkup() {}
}

export default new AddRecipeView();
