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

function calculateRecipeCost(recipe, ingredients) {
  const requiredIngredientIds = recipe.ingredients.map(ingredient => ingredient.id);
  const requiredIngredientData = ingredients.filter(ingredient => requiredIngredientIds.includes(ingredient.id));

  const totalCost = requiredIngredientData.reduce((cost, ingredient) => {
    const data = recipe.ingredients.find(item => {
      return item.id === ingredient.id;
    })
    cost += (ingredient.estimatedCostInCents * data.quantity.amount);
    return cost;
  }, 0)
  return (totalCost/100).toFixed(2);
};

function getInstructions(recipe) {
  return recipe.instructions;
}

module.exports = {
  filterByTag,
  filterByName,
  listRecipeIngredients,
  calculateRecipeCost,
  getInstructions
};