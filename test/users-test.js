import { expect } from 'chai';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../src/users';

describe('Shared Variables For Testing Purposes:', () => {
  let users, user, ingredients, recipes, recipe1, recipe2, recipe3, recipesWithStrawberries, icecreamRecipe, instructions1;
  beforeEach(() => {
    users = [
      {
        "name": "Laura Long",
        "id": 1,
        "recipesToCook": []
      },
      {
        "name": "Dana Zack",
        "id": 2,
        "recipesToCook": []
      },
      {
        "name": "Ricky Tran",
        "id": 3,
        "recipesToCook": []
      }
    ];
    user = {
        "name": "Dana Zack",
        "id": 2,
        "recipesToCook": []
    };
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
    recipe2 = {
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
    recipe3 = {
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
  });

  //==============================================================================
  //==============================================================================
  // Allow a user to add a recipe to their recipesToCook list
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
  // Allow a user to remove a recipe from  their recipesToCook list
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
})