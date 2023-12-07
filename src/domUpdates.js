//NOTE: Your DOM manipulation will occur in this file
import {
  filterByTag,
  filterByName,
  listRecipeIngredients,
  calculateRecipeCost,
  getInstructions
} from './recipes.js';

import recipeData from "./data/recipes.js";

// Variables

// Selectors
const recipeCardSection = document.querySelector('.recipe-card-section');
const recipeModal = document.getElementById('recipe-modal')
const closeButton = document.querySelector('.close-button');
const toCookButton = document.getElementById('to-cook-button');
const allRecipesButton = document.getElementById('all-recipes-button');
const favoriteRecipesButton = document.getElementById('favorite-recipes-button');
const myPantryButton = document.getElementById('my-pantry-button');
const searchButton = document.getElementById('search-button');

// Event listeners
recipeCardSection.addEventListener('click', (event) => {
  if (event.target.classList.contains('recipe-card')) {
    console.log('hello')
    displayModal();
  }
});

closeButton.addEventListener('click', (event) => {
  recipeModal.classList.add('hidden');
})

allRecipesButton.addEventListener('click', (event) => {
  createRecipeCard()
  console.log('help')
})

// Functions
function onLoad() {
  createRecipeCards(recipeData)
};

function createRecipeCards(recipes) {
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


function displayModal() {
  
  // Overlay doesn't work but it would be nice to have.. I might give it another shot
  // const overlay = document.createElement('div');
  // overlay.id = 'overlay';
  // overlay.className = 'overlay modal-overlay hidden';
  // document.body.appendChild(overlay);

  recipeModal.classList.remove('hidden')
  // overlay.classList.remove('hidden')
}


export {
  displayModal,
  createRecipeCards,
  onLoad
}