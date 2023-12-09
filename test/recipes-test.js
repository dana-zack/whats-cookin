import { expect } from 'chai';
import { filterByTag, filterByName, listRecipeIngredients, calculateRecipeCost, getInstructions } from '../src/recipes';


describe('Shared Variables For Testing Purposes:', () => {
  let ingredients, recipes, recipe1, recipe2, recipesWithStrawberries, icecreamRecipe, instructions1;
  beforeEach(() => {
    ingredients = [
      {
        "id": 1,
        "name": "strawberries",
        "estimatedCostInCents": 400
      },
      {
        "id": 2,
        "name": "blackberries",
        "estimatedCostInCents": 300
      },
      {
        "id": 3,
        "name": "watermelon",
        "estimatedCostInCents": 500
      },
      {
        "id": 4,
        "name": "pineapple",
        "estimatedCostInCents": 200
      },
      {
        "id": 5,
        "name": "vanilla icecream",
        "estimatedCostInCents": 250
      }
    ];
    recipes = [
      {
        "id": 500,
        "image": "https://www.iheartnaptime.net/wp-content/uploads/2020/06/berry-fruit-salad.jpg",
        "ingredients": [
          {
            "id": 1,
            "quantity": {
              "amount": 2,
              "unit": "c"
            }
          },
          {
            "id": 2,
            "quantity": {
              "amount": 1.5,
              "unit": "c"
            }
          },
          ],
        "instructions": [
          {
            "instruction": "Rinse the strawberries and blackberries.",
            "number": 1
          },
          {
            "instruction": "Add both berries to a large bowl",
            "number": 2
          },
          {
            "instruction": "Mix until evenly dispersed.",
            "number": 3
          },
          {
            "instruction": "Enjoy!",
            "number": 4
          }
        ],
        "name": "Berry Fruit Salad",
        "tags": [
          "fruit",
          "salad",
          "berry",
          "healthy",
          "strawberry",
          "blackberry"
        ]
      },
      {
        "id": 600,
        "image": "https://imgs.search.brave.com/Qt3vXLyaEP9ZcX_RC_Vn58VR0d0Y1slPiglu9cCRtT0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwMS5ueXQuY29t/L2ltYWdlcy8yMDE5/LzA4LzEwL2Rpbmlu/Zy9hdy1zcGljeS13/YXRlcm1lbG9uLXNh/bGFkL2F3LXNwaWN5/LXdhdGVybWVsb24t/c2FsYWQtYXJ0aWNs/ZUxhcmdlLmpwZz93/PTEyODAmcT03NQ",
        "ingredients": [
          {
            "id": 3,
            "quantity": {
              "amount": 1,
              "unit": "c"
            }
          },
          {
            "id": 4,
            "quantity": {
              "amount": 1,
              "unit": "c"
            }
          },
        ],
        "instructions": [
          {
            "instruction": "Cut up the pineapple and watermelon",
            "number": 1
          },
          {
            "instruction": "Mix the fruit in a large bowl until evenly dispersed.",
            "number": 2
          },
          {
            "instruction": "Enjoy your tropical salad!",
            "number": 3
          }
        ],
        "name": "Tropical fruit Salad",
        "tags": [
          "fruit",
          "salad",
          "tropical",
          "healthy",
          "pineapple",
          "watermelon"
        ]
      },
      {
        "id": 700,
        "image": "https://www.brightsideorganics.com/cdn/shop/articles/Vanilla_Ice_Cream_Strawberries.png?v=1656796505",
        "ingredients": [
          {
            "id": 1,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "id": 5,
            "quantity": {
              "amount": 1,
              "unit": "c"
            }
          },
          ],
        "instructions": [
          {
            "instruction": "Scoop vanilla icecream into bowl.",
            "number": 1
          },
          {
            "instruction": "Top with strawberries.",
            "number": 2
          },
          {
            "instruction": "Enjoy!",
            "number": 3
          }
        ],
        "name": "Vanilla Icecream With Strawberries",
        "tags": [
          "icecream",
          "strawberry",
          "vanilla",
          "dessert"
        ]
      },
    ];
    recipe1 = {
      "id": 600,
      "image": "https://imgs.search.brave.com/Qt3vXLyaEP9ZcX_RC_Vn58VR0d0Y1slPiglu9cCRtT0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwMS5ueXQuY29t/L2ltYWdlcy8yMDE5/LzA4LzEwL2Rpbmlu/Zy9hdy1zcGljeS13/YXRlcm1lbG9uLXNh/bGFkL2F3LXNwaWN5/LXdhdGVybWVsb24t/c2FsYWQtYXJ0aWNs/ZUxhcmdlLmpwZz93/PTEyODAmcT03NQ",
      "ingredients": [
        {
          "id": 3,
          "quantity": {
            "amount": 1,
            "unit": "c"
          }
        },
        {
          "id": 4,
          "quantity": {
            "amount": 1,
            "unit": "c"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Cut up the pineapple and watermelon",
          "number": 1
        },
        {
          "instruction": "Mix the fruit in a large bowl until evenly dispersed.",
          "number": 2
        },
        {
          "instruction": "Enjoy your tropical salad!",
          "number": 3
        }
      ],
      "name": "Tropical fruit Salad",
      "tags": [
        "fruit",
        "salad",
        "tropical",
        "healthy",
        "pineapple",
        "watermelon"
      ]
    };
    recipe2 = {
      "id": 500,
      "image": "https://www.iheartnaptime.net/wp-content/uploads/2020/06/berry-fruit-salad.jpg",
      "ingredients": [
        {
          "id": 1,
          "quantity": {
            "amount": 2,
            "unit": "c"
          }
        },
        {
          "id": 2,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        ],
      "instructions": [
        {
          "instruction": "Rinse the strawberries and blackberries.",
          "number": 1
        },
        {
          "instruction": "Add both berries to a large bowl",
          "number": 2
        },
        {
          "instruction": "Mix until evenly dispersed.",
          "number": 3
        },
        {
          "instruction": "Enjoy!",
          "number": 4
        }
      ],
      "name": "Berry Fruit Salad",
      "tags": [
        "fruit",
        "salad",
        "berry",
        "healthy",
        "strawberry",
        "blackberry"
      ]
    };
    recipesWithStrawberries = [
      {
        "id": 500,
        "image": "https://www.iheartnaptime.net/wp-content/uploads/2020/06/berry-fruit-salad.jpg",
        "ingredients": [
          {
            "id": 1,
            "quantity": {
              "amount": 2,
              "unit": "c"
            }
          },
          {
            "id": 2,
            "quantity": {
              "amount": 1.5,
              "unit": "c"
            }
          },
          ],
        "instructions": [
          {
            "instruction": "Rinse the strawberries and blackberries.",
            "number": 1
          },
          {
            "instruction": "Add both berries to a large bowl",
            "number": 2
          },
          {
            "instruction": "Mix until evenly dispersed.",
            "number": 3
          },
          {
            "instruction": "Enjoy!",
            "number": 4
          }
        ],
        "name": "Berry Fruit Salad",
        "tags": [
          "fruit",
          "salad",
          "berry",
          "healthy",
          "strawberry",
          "blackberry"
        ]
      },
      {
        "id": 700,
        "image": "https://www.brightsideorganics.com/cdn/shop/articles/Vanilla_Ice_Cream_Strawberries.png?v=1656796505",
        "ingredients": [
          {
            "id": 1,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "id": 5,
            "quantity": {
              "amount": 1,
              "unit": "c"
            }
          },
          ],
        "instructions": [
          {
            "instruction": "Scoop vanilla icecream into bowl.",
            "number": 1
          },
          {
            "instruction": "Top with strawberries.",
            "number": 2
          },
          {
            "instruction": "Enjoy!",
            "number": 3
          }
        ],
        "name": "Vanilla Icecream With Strawberries",
        "tags": [
          "icecream",
          "strawberry",
          "vanilla",
          "dessert"
        ]
      },
    ];
    icecreamRecipe = [
      {
        "id": 700,
        "image": "https://www.brightsideorganics.com/cdn/shop/articles/Vanilla_Ice_Cream_Strawberries.png?v=1656796505",
        "ingredients": [
          {
            "id": 1,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "id": 5,
            "quantity": {
              "amount": 1,
              "unit": "c"
            }
          },
          ],
        "instructions": [
          {
            "instruction": "Scoop vanilla icecream into bowl.",
            "number": 1
          },
          {
            "instruction": "Top with strawberries.",
            "number": 2
          },
          {
            "instruction": "Enjoy!",
            "number": 3
          }
        ],
        "name": "Vanilla Icecream With Strawberries",
        "tags": [
          "icecream",
          "strawberry",
          "vanilla",
          "dessert"
        ]
      }
    ];
    instructions1 = [
      {
        "instruction": "Cut up the pineapple and watermelon",
        "number": 1
      },
      {
        "instruction": "Mix the fruit in a large bowl until evenly dispersed.",
        "number": 2
      },
      {
        "instruction": "Enjoy your tropical salad!",
        "number": 3
      }
    ];
  });

  //==============================================================================
  //==============================================================================
  
  describe('filterByTag', () => {
    it('Should be a function', () => {
      expect(filterByTag).to.be.a('function');
    });

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
    it('Should be a function', () => {
      expect(filterByName).to.be.a('function');
    });

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
    it('Should be a function', () => {
      expect(listRecipeIngredients).to.be.a('function');
    });

    it('Should determine the names of ingredients needed for a given recipe', () => {
        const neededIngredients = listRecipeIngredients(recipe1, ingredients);
        expect(neededIngredients).to.deep.equal(["watermelon", "pineapple"]);
    });
  })

  // ===============================================================
  describe('calculateRecipeCost', () => {
    it('Should be a function', () => {
      expect(calculateRecipeCost).to.be.a('function');
    });

    it("Should calculate the cost of a given recipe's ingredients", () => {
        const totalCost = calculateRecipeCost(recipe2, ingredients);
        expect(totalCost).to.equal('12.50');
    });
  })

  // ===============================================================
  describe('getInstructions', () => {
    it('Should be a function', () => {
      expect(getInstructions).to.be.a('function');
    });

    it('Should return the instructions for a given recipe', () => {
        const instructions = getInstructions(recipe1);
        expect(instructions).to.deep.equal(instructions1);
    });
  })
});