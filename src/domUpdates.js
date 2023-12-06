//NOTE: Your DOM manipulation will occur in this file

// Variables

// Selectors
const recipeSection = document.getElementById('recipe-card-section');
const toCookButton = document.getElementById('to-cook-button');
const allRecipesButton = document.getElementById('all-recipes-button');
const favoriteRecipesButton = document.getElementById('favorite-recipes-button');
const myPantryButton = document.getElementById('my-pantry-button');
const searchButton = document.getElementById('search-button');
const recipeCardButton = document.getElementById('search-button');

// Event listeners
recipeSection.addEventListener('click', (event) => {
  if (event.target.id !== 'recipe-card-section') {
    updateModal(selectedRecipe);
  }
});

// Functions



const displayRecipes = () => {
  console.log(`Displaying recipes now`)
}


export {
  displayRecipes,
}