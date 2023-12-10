function addFavoriteRecipe(user, recipe) {
  user.recipesToCook.push(recipe);
  return user;
}

function removeFavoriteRecipe(user, recipe) {
  const index = user.recipesToCook.indexOf(recipe)
  user.recipesToCook.splice(index, 1)
  return user
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomUser(users) {
  return users[getRandomIndex(users)];
}

module.exports = {
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getRandomIndex,
  getRandomUser
};