function addFavoriteRecipe(user, recipe) {
  user.recipesToCook.push(recipe);
  return user;
}

function removeFavoriteRecipe(user, recipe) {
  const index = user.recipesToCook.indexOf(recipe)
  user.recipesToCook.splice(index, 1)
  return user
}

module.exports = {
  addFavoriteRecipe,
  removeFavoriteRecipe,
};