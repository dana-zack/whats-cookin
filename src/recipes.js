function filterByTag(recipes, tag) {
  const recipesByTag = recipes.filter(recipe => {
    return recipe.tags.includes(tag);
  });
  return recipesByTag;
};

function filterByName(recipes, name) {
  if(name === undefined) return []
  const recipesByName = recipes.filter(recipe => {
    const lowerCaseName = recipe.name.toLowerCase();
    return lowerCaseName.includes(name.toLowerCase());
    });
  return recipesByName;
};

function listRecipeIngredients(recipe, allIngredients) {
  const renderedIngredients = recipe.ingredients.map(ingredient => {
    let ingredientAmount = ingredient.quantity.amount;
    let ingredientUnits = ingredient.quantity.unit;
    let specificIngredient = allIngredients.find(item => {
      return item.id === ingredient.id;
    });
    let ingredientName = specificIngredient.name
    return `${ingredientName} | ${ingredientAmount} ${ingredientUnits}`
  })
  return renderedIngredients;
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
  const avgCost = (totalCost/100).toFixed(2)
  return `$${avgCost}`;
};

function getInstructions(recipe) {
  const recipeInstructions = recipe.instructions.map(step => {
    return `${step.number}. ${step.instruction}`;
  }).join('<br><br>');
  return recipeInstructions;
}

module.exports = {
  filterByTag,
  filterByName,
  listRecipeIngredients,
  calculateRecipeCost,
  getInstructions
};