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

// Event listeners
recipeCardSection.addEventListener('click', (event) => {
  selectedRecipe = event.target.closest('article');
  console.log(selectedRecipe)
  displayModal(selectedRecipe);
});

closeButton.addEventListener('click', (event) => {
  recipeModal.classList.add('hidden');
})

allRecipesButton.addEventListener('click', (event) => {
  displayedRecipes = recipeData
  displayRecipeCards(displayedRecipes)
  searchBarInput.placeholder = "Search 'all recipes' by name..."
  allRecipesButton.style.backgroundColor = "grey";
  favoriteRecipesButton.style.backgroundColor = "white";
})

favoriteRecipesButton.addEventListener('click', (event) => {
  displayedRecipes = currentUser.recipesToCook
  displayRecipeCards(displayedRecipes)
  searchBarInput.placeholder = "Search 'favorite recipes' by name..."
  allRecipesButton.style.backgroundColor = "white";
  favoriteRecipesButton.style.backgroundColor = "grey";
})

// heartButton.addEventListener('click', (event) => {
//   selectedRecipe = event.target.closest('article')
  
//   const clickedRecipe = recipeData.find(data => {
//     return data.name === selectedRecipe.querySelector('h2').innerText
//   });
  
//   const addedRecipe = recipeData.find(recipe => {
//     console.log(recipe.name)
//     selectedRecipe = document.querySelector('h2').innerText
//     console.log(selectedRecipe)
//     return recipe.name === selectedRecipe
//   });
//   console.log(clickedRecipe)
//   addFavoriteRecipe(currentUser, clickedRecipe)
// })

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
  currentUser = getRandomUser(usersData)
  webPageTitle.innerText = `What's Cookin, ${currentUser.name}?`
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

    const id = document.createElement('p')
    id.classList.add('recipe-id');
    id.classList.add('hidden');

    id.textContent = recipe.id
    
    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(content);
    card.appendChild(id);
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

  let selectedRecipeID = Number(recipe.querySelector('.recipe-id').textContent)
  console.log(selectedRecipeID)
  recipeData.forEach(recipe => {
    if (selectedRecipeID === recipe.id) {
      currentRecipe = recipe;
    }
  })

  recipeTitle.innerText = currentRecipe.name;

  const clickedRecipeIngrediens = listRecipeIngredients(currentRecipe, ingredientsData).join('<br>')
  ingredientsList.innerHTML = clickedRecipeIngrediens

  const clickedRecipeInstructions = getInstructions(currentRecipe);
  instructionsList.innerHTML = clickedRecipeInstructions;

  const clickedRecipeCost = calculateRecipeCost(currentRecipe, ingredientsData)
  totalCost.innerText = clickedRecipeCost;

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

export {
  displayModal,
  displayRecipeCards,
  onLoad,
  displayRecipesByTag,
  displayRecipesByName
}