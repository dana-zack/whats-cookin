function addUserRecipe(user, recipe) {
  user.recipesToCook.push(recipe);
  return user;
}

function removeUserRecipe(user, recipe) {
  const index = user.recipesToCook.indexOf(recipe)
  // console.log(index)
  user.recipesToCook.splice(index, 1)
  // console.log(user)
  return user
}

function filterUserRecipesByTag() {

}

function filterUserRecipesByName() {

}

module.exports = {
  addUserRecipe,
  removeUserRecipe,
  filterUserRecipesByTag,
  filterUserRecipesByName
};