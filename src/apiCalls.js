// Your fetch requests will live here!

console.log('I will be a fetch request!')

function fetchUsers() {
   return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
    .then(response => response.json())
    // .then(data => data)
    .catch(err => console.log('error'))
}

function fetchRecipes() {
  const recipes = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
    .then(response => response.json())
    // .then(data => data)
    .catch(err => console.log('error'))
  return recipes;
}

function fetchIngredients() {
  const ingredients = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
    .then(response => response.json())
    // .then(data => data)
    .catch(err => console.log('error'))
  return ingredients;
}

const fetchedPromises = () => Promise.all([fetchUsers(), fetchRecipes(), fetchIngredients()])

export { fetchedPromises }