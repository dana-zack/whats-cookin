import { expect } from 'chai';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../src/users';
import { user, recipe1, recipe2, recipe3 } from '../test/sample-data'

//==============================================================================
describe('addFavoriteRecipe', () => {
  it('Should be a function', () => {
    expect(addFavoriteRecipe).to.be.a('function');
  });

  it('Should allow a user to add a recipe to their recipesToCook list', () => {
    const updatedUser = addFavoriteRecipe(user, recipe1)
    expect(updatedUser).to.deep.equal({
      "name": "Dana Zack",
      "id": 2,
      "recipesToCook": [recipe1]
    });
  });

  it("Should prevent duplicates from being added to a user's recipesToCook list", () => {
    const updatedUser1 = addFavoriteRecipe(user, recipe1)
    const updatedUser2 = addFavoriteRecipe(updatedUser1, recipe1)
    expect(updatedUser2).to.deep.equal({
      "name": "Dana Zack",
      "id": 2,
      "recipesToCook": [recipe1]
    });
  });
});

//==============================================================================
describe('removeFavoriteRecipe', () => {
  it('Should be a function', () => {
    expect(removeFavoriteRecipe).to.be.a('function');
  });

  it('Should allow a user to remove a recipe from their recipesToCook list', () => {
    addFavoriteRecipe(user, recipe1)
    addFavoriteRecipe(user, recipe2)
    addFavoriteRecipe(user, recipe3)
    const updatedUser = removeFavoriteRecipe(user, recipe2)
    expect(updatedUser).to.deep.equal({
      "name": "Dana Zack",
      "id": 2,
      "recipesToCook": [recipe1, recipe3]
    });
  });
});