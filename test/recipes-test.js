import { expect } from 'chai';
import { filterByTag, filterByName, listRecipeIngredients, calculateRecipeCost, getInstructions, rateRecipe } from '../src/recipes';
import { ingredients, recipes, recipe1, recipe2, recipesWithStrawberries, icecreamRecipe, instructions1, instructions2, recipe1Rated8, recipe1Rated5, recipe2Rated2 } from '../test/sample-data'

  //==============================================================================
  //==============================================================================
  
  describe('filterByTag', () => {
    it('Should return a filtered list of recipes based on a tag', () => {
      const recipesByTag = filterByTag(recipes, "strawberry");
      expect(recipesByTag).to.deep.equal(recipesWithStrawberries);
    });

  it('Should return an empty array if no recipes match the tag', () => {
    const recipesByTag = filterByTag(recipes, "blueberry");
    expect(recipesByTag).to.deep.equal([]);
  });

  it('Should return an empty array if no tag is provided', () => {
    const recipesByTag = filterByTag(recipes);
    expect(recipesByTag).to.deep.equal([]);
  });
});

  //==============================================================================
  describe('filterByName', () => {
    it('Should return a filtered list of recipes based on a full name input', () => {
      const recipesByName = filterByName(recipes, "Vanilla Icecream With Strawberries");
      expect(recipesByName).to.deep.equal(icecreamRecipe);
    });

  it('Should return a filtered list of recipes based on a partial name input', () => {
    const recipesByName = filterByName(recipes, "Icecream");
    expect(recipesByName).to.deep.equal(icecreamRecipe);
  });

  it('Should return a filtered list of recipes based on a full or partial name input, regardless of capitalization', () => {
    const recipesByName = filterByName(recipes, "VaNillA IcEcreaM WitH sTrawBerrieS");
    expect(recipesByName).to.deep.equal(icecreamRecipe);
  });

  it('Should return an empty array if no recipes match the name', () => {
    const recipesByName = filterByName(recipes, "Shortcake");
    expect(recipesByName).to.deep.equal([]);
  });

  it('Should return an empty array if no name is provided', () => {
    const recipesByName = filterByName(recipes);
    expect(recipesByName).to.deep.equal([]);
  });
});

  //===============================================================
  describe('listRecipeIngredients', () => {
    it('Should list the name, amount, and units of each ingredient needed for a specific recipe', () => {
        const recipe1Ingredients = listRecipeIngredients(recipe1, ingredients);
        const recipe2Ingredients = listRecipeIngredients(recipe2, ingredients);
        expect(recipe1Ingredients).to.deep.equal([ 'strawberries | 2 c', 'blackberries | 1.5 c' ]);
        expect(recipe2Ingredients).to.deep.equal([ 'watermelon | 1 c', 'pineapple | 1 c' ]);
    });
  })

  // ===============================================================
  describe('calculateRecipeCost', () => {
    it("Should calculate the cost of a given recipe's ingredients", () => {
        const totalCost = calculateRecipeCost(recipe1, ingredients);
        expect(totalCost).to.equal('$12.50');
    });
  })

  // ===============================================================
  describe('getInstructions', () => {
    it('Should return formatted instructions for a given recipe', () => {
        const recipe1Instructions = getInstructions(recipe1);
        const recipe2Instructions = getInstructions(recipe2);
        expect(recipe1Instructions).to.deep.equal(instructions1);
        expect(recipe2Instructions).to.deep.equal(instructions2);
    });
  });