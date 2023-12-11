//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css'
import apiCalls from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
// Below are examples of how you can import functions from either the recipes or domUpdates files.
import { getUsers, getRecipes, getIngredients, onLoad, closeModal, displayRecipeCards, updateCurrentRecipe, displayModal, displayRecipesByTag, displayRecipesByName } from './domUpdates';
import { filterByTag, filterByName, listRecipeIngredients, calculateRecipeCost, getInstructions } from './recipes.js';
import { addFavoriteRecipe, removeFavoriteRecipe, getRandomIndex, getRandomUser } from './users.js';
import { fetchUsers, fetchRecipes, fetchIngredients }from './apiCalls'
import apiRecipes from './domUpdates'
import apiIngredients from './domUpdates'
import apiUsers from './domUpdates'

// import ingredientsData from './data/ingredients'
// import recipeData from './data/recipes'
// import usersData from './data/users'