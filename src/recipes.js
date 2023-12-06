function filterByTag(recipes, tag) {
  const recipesByTag = recipes.filter(recipe => {
    return recipe.tags.includes(tag);
  });
  return recipesByTag;
};

function filterByName(recipes, name) {
  const recipesByName = recipes.filter(recipe => {
    if (recipe.name === name) {
      return recipe;
    }
  });
  return recipesByName;
};

function listRecipeIngredients(sampleRecipe, sampleIngredients) {
  const ingredientIds = sampleRecipe.ingredients.map(ingredient => {
    return ingredient.id;
  })
  const requiredIngredients = sampleIngredients.filter(ingredient => {
    return ingredientIds.includes(ingredient.id);
  })
  const ingredientNames = requiredIngredients.map(ingredient => {
    return ingredient.name;
  })
  return ingredientNames;
};

//PSEUDOCODE
//recipe is an object
//ingredients is an array of all ingredients
//first, need to look through recipe and determine which ingredients are needed
//then need to look at those specific ingredients within the ingredients array to determine cost
//then need to multiple that cost by the recipe ingredient's quantity

function calculateRecipeCost(recipe, ingredients) {
  const requiredIngredientIds = recipe.ingredients.map(ingredient => ingredient.id)
  console.log(requiredIngredientIds);
  const requiredIngredientData = ingredients.filter(ingredient => requiredIngredientIds.includes(ingredient.id))
  console.log(requiredIngredientData);

  const totalCost = requiredIngredientData.reduce((cost, ingredient) => {
    const data = recipe.ingredients.find(item => {
      return item.id === ingredient.id;
    })
    console.log(data)
    cost += (ingredient.estimatedCostInCents * data.quantity.amount);
    console.log(cost)
    return cost;
  }, 0)
  console.log(totalCost)
  return totalCost;
};

function getInstructions() {

}

module.exports = {
  filterByTag,
  filterByName,
  listRecipeIngredients,
  calculateRecipeCost,
  getInstructions
};