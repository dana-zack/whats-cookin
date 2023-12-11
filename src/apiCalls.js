// Your fetch requests will live here!

console.log('I will be a fetch request!')

function getUsers() {
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
    .then(response => response.json())
    .then(data => {
      console.log(data.users);
      return data.users;
    })
    .catch(err => console.log('error'));
}

function getRecipes() {
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
    .then(response => response.json())
    .then(data => {
      console.log(data.recipes);
      return data.recipes;
    })
    .catch(err => console.log('error'));
}

function getIngredients() {
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
    .then(response => response.json())
    .then(data => {
      console.log(data.ingredients);
      return data.ingredients;
    })
    .catch(err => console.log('error'));
}

export { getUsers, getRecipes, getIngredients }