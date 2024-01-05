import './styles.css'
import apiCalls from './apiCalls'
import './images/turing-logo.png'
import { getUsers, getRecipes, getIngredients, onLoad, closeModal, displayRecipeCards, updateCurrentRecipe, displayModal, displayRecipesByTag, displayRecipesByName } from './domUpdates';
import { filterByTag, filterByName, listRecipeIngredients, calculateRecipeCost, getInstructions } from './recipes.js';
import { addFavoriteRecipe, removeFavoriteRecipe, getRandomIndex, getRandomUser } from './users.js';
import { fetchUsers, fetchRecipes, fetchIngredients }from './apiCalls'
import apiRecipes from './domUpdates'
import apiIngredients from './domUpdates'
import apiUsers from './domUpdates'