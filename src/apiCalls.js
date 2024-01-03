export function getData(url) {
  const data = fetch(url)
  .then(response => response.json())
  .catch(err => console.log('error', err))
  console.log(data);
  return data
}

