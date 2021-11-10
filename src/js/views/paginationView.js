//Class responsible for rendering the page btn in the user seraches:

//Importing the parent View class:
import View from "./View";

//Since when we use the parcel we loose the folder structure, we have to change the src of the icons in the template literal that is rendering the recipe from the API. One way to fix this is to import those images:
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
	_parentElement = document.querySelector(".pagination");

	//Publisher necessary to listing to the page btn events, needing the subscriber in the controller:
	addHandlerClick(handler) {
		//Since there may be two btns, we set the event listener to the parent element:
		this._parentElement.addEventListener("click", function (e) {
			//Finding which btn was clicked using the closest method:
			const btn = e.target.closest(".btn--inline");

			//Guard clause in case the user clicks anywhere but the btn:
			if (!btn) return;

			//With the data-goto attribute in each btn, we know where the pagination should go, converting it to a number with the + sign
			const goToPage = +btn.dataset.goto;

			//Passing the page num to the handler function to be used in the controller:
			handler(goToPage);
		});
	}

	//Method responsible for generating the html for each result, to be passed in the map method for the _data:
	_generateMarkup() {
		//Variable with the current page:
		const curPage = this._data.page;

		//Finding out how many pages there are for the current result:
		//Dividing the total number of results by the number of results we want on a page (rounded by the next integer):
		const numPages = Math.ceil(
			this._data.results.length / this._data.resultsPerPage
		);

		//Page 1 and there are other pages:
		if (curPage === 1 && numPages > 1) {
			//Returning the next page btn
			return `
        <button data-goto="${
					curPage + 1
				}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
		}

		//Last Page
		if (curPage === numPages && numPages > 1) {
			//Returning the previous page btn
			return `
        <button data-goto="${
					curPage - 1
				}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
		}

		//Other Page
		if (curPage < numPages) {
			//Returning both btns
			return `
        <button data-goto="${
					curPage - 1
				}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>

        <button data-goto="${
					curPage + 1
				}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
		}

		//Page 1 and there are NO other pages. Not rendering any btn because there is no other pages:
		return "";
	}
}

export default new PaginationView();
