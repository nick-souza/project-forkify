// //Class responsible for generating the preview html code for the result and bookmark view

// //Importing the parent View class:
// import View from "./View";

// class PreviewView extends View {
// 	_parentElement = "";

// 	//Method responsible for generating the html for each result, to be passed in the map method for the _data:
// 	_generateMarkup(result) {
// 		//Functionality to make the current recipe selected, active
// 		//Getting the id from the search bar, minus the #symbol:
// 		const id = window.location.hash.slice(1);

// 		return `
//       <li class="preview">
//         <a class="preview__link ${
// 					result.id === id ? "preview__link--active" : ""
// 				}" href="#${result.id}">
//         <figure class="preview__fig">
//             <img src="${result.image}" alt="${result.title}" />
//         </figure>
//         <div class="preview__data">
//           <h4 class="preview__title">${result.title}</h4>
//           <p class="preview__publisher">${result.publisher}</p>
//         </div>
//         </a>
//       </li>
//     `;
// 	}
// }

// export default new PreviewView();
