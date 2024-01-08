import { filterByTag, filterByName, listRecipeIngredients, calculateRecipeCost, getInstructions, rateRecipe } from './recipes.js';
import { addFavoriteRecipe, removeFavoriteRecipe, getRandomUser } from './users.js';
import { getData, postRecipe, deleteUserRecipe } from "./apiCalls.js";

// Variables
let apiRecipes;
let apiIngredients;
let currentUser;
let displayedRecipes;
let currentRecipe;
let ratings = [];

// Selectors
const recipeCardSection = document.querySelector('.recipe-card-section');
const overlay = document.getElementById('overlay');
const recipeModal = document.getElementById('recipe-modal');
const closeButton = document.querySelector('.close-button');
const favoriteRecipesButton = document.getElementById('favorite-recipes-button');
const allRecipesButton = document.getElementById('all-recipes-button');
const heartButton = document.getElementById('heart-button');
const searchButton = document.getElementById('search-button');
const searchBarInput = document.querySelector('.search-input');
const dropDown = document.getElementById('tag-selector');
const tagSelectorButton = document.querySelector('.tag-selector-button');
const webPageTitle = document.querySelector('.web-page-title');
const removeFromFavoritesButton = document.getElementById('remove-button');
const recipeImage = document.querySelector('.modal-recipe-image');
const currentRecipeID = document.querySelector("#current-recipe-id")

const stars = document.querySelectorAll('.ratings span');

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
  deleteUserRecipe(currentUser.id, currentRecipe.id);
  getCurrentUsersFavRecipes();
  closeModal();
  displayRecipeCards(displayedRecipes);
})

heartButton.addEventListener('click', (event) => {
  console.log('current user', currentUser);
  console.log('current recipe', currentRecipe);

  const matchedRecipe = currentUser.recipesToCook.find(recipe => recipe.id === currentRecipe.id);
    
  if (matchedRecipe) {
    removeFavoriteRecipe(currentUser, currentRecipe);
    deleteUserRecipe();
    document.getElementById(`${currentRecipe.id}`).style.color = 'grey';
    // updateHeartButton();
  } else {
    postRecipe();
    document.getElementById(`${currentRecipe.id}`).style.color = 'red';
    // updateHeartButton();
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

stars.forEach(star => star.addEventListener('click', () => {
  let rating = star.id
  let foundRating = ratings.find(rating => rating.recipeID === currentRecipe.id)
  
  if(foundRating) {
    stars.forEach(star => star.removeAttribute('clicked'))
    star.setAttribute('clicked', 'true')
    foundRating.rating = rating
  } else {
    star.setAttribute('clicked', 'true')
    ratings.push({ recipeID: currentRecipe.id, rating })
  }
  
}))

// Functions
function displayStars() {
  const foundRecipeID = ratings.find(rating => rating.recipeID === currentRecipe.id)?.recipeID
  const foundRating = ratings.find(rating => rating.recipeID === currentRecipe.id)?.rating
  
  console.log(currentRecipeID.id);
  console.log(foundRecipeID);

  stars.forEach(star => star.removeAttribute('clicked'))
  
  if (foundRecipeID === Number(currentRecipeID.id)) {
    const star = document.getElementById(foundRating)
    console.log(star);
    star.setAttribute('clicked', 'true')
  }
}

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
  updateCurrentRecipe(recipe)
  currentRecipeID.id = currentRecipe.id
  displayStars()
  const modalTitle = document.querySelector('.modal-title');
  const ingredientsList = document.querySelector('.ingredients-list');
  const instructionsList = document.querySelector('.instructions-list');
  const totalCost = document.querySelector('.total-cost');
  const recipeImage = document.querySelector('.modal-recipe-image')
  modalTitle.innerText = currentRecipe.name;
  const clickedRecipeIngredients = listRecipeIngredients(currentRecipe, apiIngredients).join('<br>')
  ingredientsList.innerHTML = clickedRecipeIngredients
  const clickedRecipeInstructions = getInstructions(currentRecipe);
  instructionsList.innerHTML = clickedRecipeInstructions;
  const clickedRecipeCost = calculateRecipeCost(currentRecipe, apiIngredients)
  totalCost.innerText = clickedRecipeCost;
  recipeImage.src = currentRecipe.image;
  heartButton.setAttribute('id', `${currentRecipe.id}`);
  recipeModal.classList.remove('hidden');
  overlay.style.display = 'block';
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
