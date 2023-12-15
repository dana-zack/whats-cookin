import { filterByTag, filterByName, listRecipeIngredients, calculateRecipeCost, getInstructions } from './recipes.js';
import { addFavoriteRecipe, removeFavoriteRecipe, getRandomUser } from './users.js';
import { fetchedPromises } from "./apiCalls.js";

let apiUsers;
let apiRecipes;
let apiIngredients;
let currentUser;
let displayedRecipes;
let currentRecipe;









// Variables



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
window.addEventListener('load', () => {
  console.log(fetchedPromises)
  fetchedPromises().then(data => {
    apiUsers = data[0].users;
    apiRecipes = data[1].recipes;
    apiIngredients = data[2].ingredients;
    currentUser = getRandomUser(apiUsers)
    webPageTitle.innerText = `What's Cookin, ${currentUser.name}?`
    searchBarInput.placeholder = "Search 'all recipes' by name"
    displayRecipeCards(apiRecipes)
  })
})

recipeCardSection.addEventListener('click', (event) => {
  const selectedRecipe = event.target.closest('article');
  displayModal(selectedRecipe);
});

closeButton.addEventListener('click', (event) => {
  closeModal();
})

allRecipesButton.addEventListener('click', (event) => {
  displayedRecipes = apiRecipes
  displayRecipeCards(displayedRecipes)
  searchBarInput.placeholder = "Search 'all recipes' by name..."
  allRecipesButton.style.backgroundColor = "grey";
  favoriteRecipesButton.style.backgroundColor = "white";
  removeFromFavoritesButton.classList.add('hidden')
  heartButton.classList.remove('hidden')
})

favoriteRecipesButton.addEventListener('click', (event) => {
  displayedRecipes = currentUser.recipesToCook
  displayRecipeCards(displayedRecipes)
  searchBarInput.placeholder = "Search 'favorite recipes' by name..."
  allRecipesButton.style.backgroundColor = "white";
  favoriteRecipesButton.style.backgroundColor = "grey";
  removeFromFavoritesButton.classList.remove('hidden')
  heartButton.classList.add('hidden')
})

removeFromFavoritesButton.addEventListener('click', (event) => {
  removeFavoriteRecipe(currentUser, currentRecipe)
  closeModal()
  displayRecipeCards(displayedRecipes)
})

heartButton.addEventListener('click', (event) => {
  addFavoriteRecipe(currentUser, currentRecipe)
})

searchButton.addEventListener('click', (event) => {
  displayRecipesByName(displayedRecipes, searchBarInput.value)
  searchBarInput.value = "";
})

tagSelectorButton.addEventListener('click', (event) => {
  const clickedTag = dropDown.value
  displayRecipesByTag(displayedRecipes, clickedTag)
})

// Functions
function closeModal(){
  recipeModal.classList.add('hidden');
  overlay.style.display = 'none';
}

function displayRecipeCards(recipes) {
  console.log(recipes)
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
    id.textContent = recipe.id
    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(content);
    card.appendChild(id);
    recipeCardSection.appendChild(card);
  })
}

function updateCurrentRecipe(recipe) {
  let selectedRecipeName = recipe.querySelector('.recipe-title').textContent;
  currentRecipe = '';
  apiRecipes.forEach(recipe => {
    if (selectedRecipeName === recipe.name) {
      currentRecipe = recipe;
    }
  })
}

function displayModal(recipe) {
  const modalTitle = document.querySelector('.modal-title');
  const ingredientsList = document.querySelector('.ingredients-list');
  const instructionsList = document.querySelector('.instructions-list');
  const totalCost = document.querySelector('.total-cost');
  updateCurrentRecipe(recipe)
  modalTitle.innerText = currentRecipe.name;
  const clickedRecipeIngredients = listRecipeIngredients(currentRecipe, apiIngredients).join('<br>')
  ingredientsList.innerHTML = clickedRecipeIngredients
  const clickedRecipeInstructions = getInstructions(currentRecipe);
  instructionsList.innerHTML = clickedRecipeInstructions;
  const clickedRecipeCost = calculateRecipeCost(currentRecipe, apiIngredients)
  totalCost.innerText = clickedRecipeCost;
  recipeModal.classList.remove('hidden');
  overlay.style.display = 'block';
}

function displayRecipesByTag(recipes, tag) {
  const taggedRecipes = filterByTag(recipes, tag)
  displayRecipeCards(taggedRecipes)
}

function displayRecipesByName(recipes, name) {
  const namedRecipes = filterByName(recipes, name)
  displayRecipeCards(namedRecipes)
}

export {
  displayModal,
  displayRecipeCards,
  // onLoad,
  // getUsers,
  // getIngredients,
  // getRecipes,
  displayRecipesByTag,
  displayRecipesByName,
  updateCurrentRecipe,
  closeModal
}
