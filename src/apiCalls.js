import { currentUser, currentRecipe, recipeCardSection, closeModal } from "./domUpdates"
import { addFavoriteRecipe } from "./users"

export function getData(url) {
  return fetch(url)
    .then(response => { 
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Unable to retrieve data from server')
      }
    })
    .catch(error => {
      recipeCardSection.innerHTML = `${error.message}`
      console.log(error)
    })
}

export function postRecipe() {
  fetch('http://localhost:3001/api/v1/usersRecipes', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({ userID: currentUser.id, recipeID: currentRecipe.id })
  })
    .then(response => {
      if (response.ok) {
        addFavoriteRecipe(currentUser, currentRecipe)
        return response.json()
      } else {
        console.log("status", response.status);
        throw new Error('Unable to save recipe')
      }
    })
    .then(data => console.log(data))
    .catch(error => {
      console.log(error);
      closeModal()
      recipeCardSection.innerHTML = `${error.message}`
    })
}

export function deleteUserRecipe() {
  fetch('http://localhost:3001/api/v1/usersRecipes', {
    method: 'DELETE',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({ userID: currentUser.id, recipeID: currentRecipe.id })
  })
    .then(response => {
      if (response.ok) {
        console.log("Successfully removed recipe");
        return response.json()
      } else {
        console.log("status", response.status);
        throw new Error('Unable to remove recipe')
      }
    })
    .then(data => console.log(data))
    .catch(error => {
      console.log(error);
      closeModal()
      recipeCardSection.innerHTML = `${error.message}`
    })
}