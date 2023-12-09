//NOTE: Your DOM manipulation will occur in this file
import {
  filterByTag,
  filterByName,
  listRecipeIngredients,
  calculateRecipeCost,
  getInstructions
} from './recipes.js';

import recipeData from "./data/recipes.js";
import ingredientsData from "./data/ingredients.js";

// Variables

// Selectors
const recipeCardSection = document.querySelector('.recipe-card-section');
const recipeModal = document.getElementById('recipe-modal')
const closeButton = document.querySelector('.close-button');
const favoriteRecipesButton = document.getElementById('favorite-recipes-button');
const allRecipesButton = document.getElementById('all-recipes-button');
const addRecipesButton = document.getElementById('favorite-recipes-button');
const searchButton = document.getElementById('search-button');
const searchBarInput = document.querySelector('.search-input');
const dropDown = document.getElementById('tag-selector');
const tagSelectorButton = document.querySelector('.tag-selector-button')



// Event listeners
recipeCardSection.addEventListener('click', (event) => {
  if (event.target.classList.contains('recipe-card')) {
    displayModal(event.target);
  }
});

closeButton.addEventListener('click', (event) => {
  recipeModal.classList.add('hidden');
})

allRecipesButton.addEventListener('click', (event) => {
  displayRecipeCards(recipeData)
  searchBarInput.placeholder = "Search 'all recipes' by name..."
  allRecipesButton.style.backgroundColor = "grey";
  favoriteRecipesButton.style.backgroundColor = "white";
})

favoriteRecipesButton.addEventListener('click', (event) => {
  // displayRecipeCards(favoriteRecipes)
  searchBarInput.placeholder = "Search 'favorite recipes' by name..."
  allRecipesButton.style.backgroundColor = "white";
  favoriteRecipesButton.style.backgroundColor = "grey";
})

addRecipesButton.addEventListener('click', (event) => {
  //push event.target into favoriteRecipes array
})

searchButton.addEventListener('click', (event) => {
  displayRecipesByName(recipeData, searchBarInput.value)
  searchBarInput.value = "";
})

tagSelectorButton.addEventListener('click', (event) => {
  const clickedTag = dropDown.value
  displayRecipesByTag(recipeData, clickedTag)
  console.log('yes!')
})

// Functions
function onLoad() {
  displayRecipeCards(recipeData)
  searchBarInput.placeholder = "Search 'all recipes' by name"
};

function displayRecipeCards(recipes) {
  recipeCardSection.innerHTML = '';
  recipes.forEach(recipe => {
    const card = document.createElement('article');
    card.classList.add('recipe-card');

    const title = document.createElement('h2');
    title.textContent = recipe.name;

    const image = document.createElement('img');
    image.classList.add('recipe-image');
    image.src = recipe.image;
    image.alt = recipe.name;

    const content = document.createElement('p');
    content.classList.add('recipe-content');
    content.textContent = `${recipe.ingredients.length} ingredients, ${recipe.instructions.length} steps`;
    
    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(content);
    recipeCardSection.appendChild(card)
  })
}

//==============================================================================================
// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
function displayModal(recipe) {
  const recipeTitle = document.querySelector('.recipe-title');
  const ingredientsList = document.querySelector('.ingredients-list');
  const instructionsList = document.querySelector('.instructions-list');
  const totalCost = document.querySelector('.total-cost');

  const clickedRecipe = recipeData.find(data => {
    return data.name === recipe.querySelector('h2').textContent
  });

  // const { name, img, instructions } = clickedRecipe
  recipeTitle.innerText = clickedRecipe.name;

  const clickedRecipeIngrediens = listRecipeIngredients(clickedRecipe, ingredientsData).join('<br>')
  ingredientsList.innerHTML = clickedRecipeIngrediens

  const clickedRecipeInstructions = getInstructions(clickedRecipe);
  const newInstructions = clickedRecipeInstructions.map(step => {
    return `${step.number}. ${step.instruction}`;
  }).join('<br><br>');

  instructionsList.innerHTML = newInstructions;

  const clickedRecipeCost = calculateRecipeCost(clickedRecipe, ingredientsData)
  totalCost.innerText = clickedRecipeCost

  recipeModal.classList.remove('hidden');
}


//==============================================================================================
// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
function displayRecipesByTag(recipes, tag) {
  const taggedRecipes = filterByTag(recipes, tag)
  displayRecipeCards(taggedRecipes)
}

//==============================================================================================
// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)
function displayRecipesByName(recipes, name) {
  const namedRecipes = filterByName(recipes, name)
  displayRecipeCards(namedRecipes)
}

//==============================================================================================
// As a user, I should be able to filter recipes by a tag and/or name. 
// get the input value from the search bar that the user inputs
// query select the search btn and the search bar to get the input
// pass the input thru the functions
// ? one DOM function that invokes the filterByTag and filterByName data model functions when the user hits “search”?


// function filterRecipes(recipes, userInput) {
  // const tagRecipes = filterByTag(recipes, userInput)
  // const nameRecipes = filterByName(recipes, userInput)
  // const combinedfilteredRecipes = do concat here with tagRecipes and nameRecipes
  // displayRecipeCards(combinedfilteredRecipes)
// }
//store each data model function ouput into a variable (this variable will store the returned array)
//join these two variables into one array and store that into a new variable (.concat())
//then run this new joined variable through the displayRecipeCards function in order to display the filtered recipes only


export {
  displayModal,
  displayRecipeCards,
  onLoad,
  displayRecipesByTag,
  displayRecipesByName
}