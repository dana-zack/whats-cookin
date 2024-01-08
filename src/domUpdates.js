import { filterByTag, filterByName, listRecipeIngredients, calculateRecipeCost, getInstructions, rateRecipe } from './recipes.js';
import { addFavoriteRecipe, removeFavoriteRecipe, getRandomUser } from './users.js';
import { getData, postRecipe, deleteUserRecipe } from "./apiCalls.js";

// Variables
let apiRecipes;
let apiIngredients;
let currentUser;
let displayedRecipes;
let currentRecipe;

// Selectors
const recipeCardSection = document.querySelector('.recipe-card-section');
const overlay = document.getElementById('overlay')
const recipeModal = document.getElementById('recipe-modal')
const closeButton = document.querySelector('.close-button');
const favoriteRecipesButton = document.getElementById('favorite-recipes-button');
const allRecipesButton = document.getElementById('all-recipes-button');
const heartButton = document.querySelector('.heart-button');
const searchButton = document.getElementById('search-button');
const searchBarInput = document.querySelector('.search-input');
const dropDown = document.getElementById('tag-selector');
const tagSelectorButton = document.querySelector('.tag-selector-button')
const webPageTitle = document.querySelector('.web-page-title')
const removeFromFavoritesButton = document.getElementById('remove-button')

// GETs
function getCurrentUsersFavRecipes() {
  getData('http://localhost:3001/api/v1/users')
    .then(usersObj => {
      const user = usersObj.users.find(user => user.id === currentUser.id)
      let recipesToCook = user.recipesToCook.map(id => {
        return apiRecipes.find(recipe => recipe.id === id)
      })
      displayedRecipes = recipesToCook
      displayRecipeCards(displayedRecipes)
    })
}

function assignRecipes() {
  getData("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then(recipes => {
    apiRecipes = recipes.recipes
    displayedRecipes = apiRecipes
    displayRecipeCards(displayedRecipes)
  })
}

function assignCurrentUser() { 
  getData("http://localhost:3001/api/v1/users")
  .then(users => {
    currentUser = getRandomUser(users.users);
		webPageTitle.innerText = `What's Cookin, ${currentUser.name}?`
  })
}

function assignIngredients() {
  getData("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
  .then(ingredients => {
    apiIngredients = ingredients.ingredients;
  })
}

// Event listeners
window.addEventListener('load', () => {
  assignRecipes()
	assignCurrentUser()
	assignIngredients()
	searchBarInput.placeholder = "Search 'all recipes' by name"
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
  getCurrentUsersFavRecipes()
  searchBarInput.placeholder = "Search 'favorite recipes' by name..."
  allRecipesButton.style.backgroundColor = "white";
  favoriteRecipesButton.style.backgroundColor = "grey";
  removeFromFavoritesButton.classList.remove('hidden')
  heartButton.classList.add('hidden')
})

removeFromFavoritesButton.addEventListener('click', (event) => {
  currentRecipe.isLiked = false;
  deleteUserRecipe(currentUser.id, currentRecipe.id);
  removeFavoriteRecipe(currentUser, currentRecipe);
  getCurrentUsersFavRecipes()
  closeModal();
})

heartButton.addEventListener('click', (event) => {
  const matchedRecipe = currentUser.recipesToCook.find(recipe => recipe.name === currentRecipe.name);
  if (matchedRecipe) {
    deleteUserRecipe(currentUser.id, currentRecipe.id);
    removeFavoriteRecipe(currentUser, currentRecipe);
    displayRecipeCards(displayedRecipes);
    currentRecipe.isLiked = false;
    heartButton.style.color = 'grey'
  } else {
    postRecipe();
    currentRecipe.isLiked = true;
    heartButton.style.color = 'red'
  }
});

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
  recipeCardSection.innerHTML = '';
  if (recipes.length === 0) {
    recipeCardSection.innerHTML = `<p class="no-results-message">No results found</p>`
  } else {
    recipes.forEach(recipe => {
      recipeCardSection.innerHTML  += `
      <article class="recipe-card">
        <h2 class="recipe-title">${recipe.name}</h2> 
        <img class="recipe-image" src="${recipe.image}" alt="image of ${recipe.name}">
        <p class="recipe-rating">Rating: none</p>
      </article>`
    })
  }
}

function updateCurrentRecipe(recipe) {
  let selectedRecipeName = recipe.querySelector('.recipe-title').innerText;
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
  const recipeImage = document.querySelector('.modal-recipe-image')
  updateCurrentRecipe(recipe)
  modalTitle.innerText = currentRecipe.name;
  const clickedRecipeIngredients = listRecipeIngredients(currentRecipe, apiIngredients).join('<br>')
  ingredientsList.innerHTML = clickedRecipeIngredients
  const clickedRecipeInstructions = getInstructions(currentRecipe);
  instructionsList.innerHTML = clickedRecipeInstructions;
  const clickedRecipeCost = calculateRecipeCost(currentRecipe, apiIngredients)
  totalCost.innerText = clickedRecipeCost;
  recipeImage.src = currentRecipe.image;
  recipeModal.classList.remove('hidden');
  overlay.style.display = 'block';
  if (currentRecipe.isLiked) {
    heartButton.style.color = 'red';
  } else {
    currentRecipe.isLiked = false;
    heartButton.style.color = 'grey';
  }
}

function displayRecipesByTag(recipes, tag) {
  let taggedRecipes = filterByTag(recipes, tag)
  displayRecipeCards(taggedRecipes)
}

function displayRecipesByName(recipes, name) {
  let namedRecipes = filterByName(recipes, name)
  displayRecipeCards(namedRecipes)
}

export {
  displayModal,
  displayRecipeCards,
  displayRecipesByTag,
  displayRecipesByName,
  updateCurrentRecipe,
  closeModal,
  currentUser,
  currentRecipe,
  recipeCardSection,
}
