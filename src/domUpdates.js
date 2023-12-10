//NOTE: Your DOM manipulation will occur in this file
import { filterByTag, filterByName, listRecipeIngredients, calculateRecipeCost, getInstructions } from './recipes.js';
import { addFavoriteRecipe, removeFavoriteRecipe, getRandomUser } from './users.js';

import recipeData from "./data/recipes.js";
import ingredientsData from "./data/ingredients.js";
import usersData from "./data/users.js";

// Variables
var displayedRecipes;
var currentRecipe;
var currentUser;
var favoriteRecipes;
var selectedRecipe;

// Selectors
const recipeCardSection = document.querySelector('.recipe-card-section');
const overlay = document.getElementById('overlay')
const recipeModal = document.getElementById('recipe-modal')
const closeButton = document.querySelector('.close-button');
const favoriteRecipesButton = document.getElementById('favorite-recipes-button');
const allRecipesButton = document.getElementById('all-recipes-button');
const heartButton = document.getElementById('heart-button');
const searchButton = document.getElementById('search-button');
const searchBarInput = document.querySelector('.search-input');
const dropDown = document.getElementById('tag-selector');
const tagSelectorButton = document.querySelector('.tag-selector-button')
const webPageTitle = document.querySelector('.web-page-title')
const removeFromFavoritesButton = document.getElementById('delete-button')

// Event listeners
recipeCardSection.addEventListener('click', (event) => {
  selectedRecipe = event.target.closest('article');
  console.log(selectedRecipe)
  displayModal(selectedRecipe);
});

closeButton.addEventListener('click', (event) => {
  recipeModal.classList.add('hidden');
  overlay.style.display = 'none';
})

allRecipesButton.addEventListener('click', (event) => {
  displayedRecipes = recipeData
  displayRecipeCards(displayedRecipes)
  searchBarInput.placeholder = "Search 'all recipes' by name..."
  allRecipesButton.style.backgroundColor = "grey";
  favoriteRecipesButton.style.backgroundColor = "white";
})

favoriteRecipesButton.addEventListener('click', (event) => {
  favoriteRecipes = currentUser.recipesToCook
  displayedRecipes = favoriteRecipes
  displayRecipeCards(favoriteRecipes)


  //call another function that puts remove buttons on each card that is a favorite
  searchBarInput.placeholder = "Search 'favorite recipes' by name..."
  allRecipesButton.style.backgroundColor = "white";
  favoriteRecipesButton.style.backgroundColor = "grey";
  //remove the "hidden" classList from the deleteButton
  // const allDeleteButtons = document.querySelector('.delete-button')
  // allDeleteButtons.classList.remove('hidden')
  // showDeleteButton(displayedRecipes)
})

removeFromFavoritesButton.addEventListener('click', (event) => {
  let chosenRecipe = event.target.closest('article')
  console.log(chosenRecipe)
  updateCurrentRecipe(chosenRecipe)
  console.log(currentRecipe)
  removeFavoriteRecipe(currentUser, currentRecipe)
  displayRecipeCards(displayedRecipes)
})

heartButton.addEventListener('click', (event) => {
  // let chosenRecipe = event.target.closest('article')
  // if (chosenRecipe) {
  //   updateCurrentRecipe(chosenRecipe)
  //   toggleFavorite(currentRecipe)
  //   toggleHeartBtnColor(heartButton, currentUser.recipesToCook.includes(currentRecipe))
  // }
  let chosenRecipe = event.target.closest('article')
  console.log(chosenRecipe)
  updateCurrentRecipe(chosenRecipe)
  console.log(currentRecipe)
  addFavoriteRecipe(currentUser, currentRecipe)
})

searchButton.addEventListener('click', (event) => {
  displayRecipesByName(displayedRecipes, searchBarInput.value)
  searchBarInput.value = "";
})

tagSelectorButton.addEventListener('click', (event) => {
  const clickedTag = dropDown.value
  displayRecipesByTag(displayedRecipes, clickedTag)
  console.log('yes!')
})

// Functions
function onLoad() {
  displayRecipeCards(recipeData)
  currentUser = getRandomUser(usersData)
  webPageTitle.innerText = `What's Cookin, ${currentUser.name}?`
  searchBarInput.placeholder = "Search 'all recipes' by name"
};

// function updateCurrentRecipe(recipe) {
//   let selectedRecipeID = Number(recipe.querySelector('.recipe-id').textContent)
//   recipeData.forEach(recipe => {
//     if (selectedRecipeID === recipe.id) {
//       currentRecipe = recipe;
//     }
//   })
// }

function updateCurrentRecipe(recipe) {
  let selectedRecipeName = recipe.querySelector('.recipe-title').textContent;
  recipeData.forEach(recipe => {
    if (selectedRecipeName === recipe.name) {
      currentRecipe = recipe;
    }
  })
}

function displayRecipeCards(recipes) {
  recipeCardSection.innerHTML = '';
  recipes.forEach(recipe => {
    const card = document.createElement('article');
    card.classList.add('recipe-card');

    const title = document.createElement('h2');
    title.classList.add('recipe-title')
    title.textContent = recipe.name;

    const image = document.createElement('img');
    image.classList.add('recipe-image');
    image.src = recipe.image;
    image.alt = recipe.name;

    const content = document.createElement('p');
    content.classList.add('recipe-content');
    content.textContent = `${recipe.ingredients.length} ingredients, ${recipe.instructions.length} steps`;

    const id = document.createElement('p')
    id.classList.add('recipe-id');
    id.classList.add('hidden');

    // const deleteButton = document.createElement('button')
    // deleteButton.classList.add('delete-button');
    // deleteButton.classList.add('hidden');
    // deleteButton.innerText = "Remove from favorites"

    id.textContent = recipe.id
    
    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(content);
    card.appendChild(id);
    // card.appendChild(deleteButton);
    recipeCardSection.appendChild(card);
  })
}

//==============================================================================================
// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
function displayModal(recipe) {
  const recipeTitle = document.querySelector('.recipe-title');
  const ingredientsList = document.querySelector('.ingredients-list');
  const instructionsList = document.querySelector('.instructions-list');
  const totalCost = document.querySelector('.total-cost');

  updateCurrentRecipe(recipe)
  console.log(currentRecipe.name)

  // const recTitle = currentRecipe.name
  // console.log(recipeTitle.innerText)
  recipeTitle.innerText = currentRecipe.name;

  const clickedRecipeIngrediens = listRecipeIngredients(currentRecipe, ingredientsData).join('<br>')
  ingredientsList.innerHTML = clickedRecipeIngrediens

  const clickedRecipeInstructions = getInstructions(currentRecipe);
  instructionsList.innerHTML = clickedRecipeInstructions;

  const clickedRecipeCost = calculateRecipeCost(currentRecipe, ingredientsData)
  totalCost.innerText = clickedRecipeCost;

  recipeModal.classList.remove('hidden');
  overlay.style.display = 'block';

  // toggleHeartColor(currentUser.recipesToCook.includes(clickedRecipe));
}

function toggleFavorite(recipe) {
  console.log(recipe)
  const isFavorite = currentUser.recipesToCook.includes(recipe)

  if (!isFavorite) {
    addFavoriteRecipe(currentUser, recipe)
  } else {
    removeFavoriteRecipe(currentUser, recipe)
  }
  
  toggleHeartBtnColor(!isFavorite)
}

function toggleHeartBtnColor(heartButton, isFavorite) {
  if (isFavorite) {
    heartButton.style.color = 'red';
  } else {
    heartButton.style.color = 'black';
  }

  // console.log(currentUser.recipesToCook)
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

export {
  displayModal,
  displayRecipeCards,
  onLoad,
  displayRecipesByTag,
  displayRecipesByName
}