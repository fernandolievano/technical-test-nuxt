export const fetchUsersFromAPI = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}

export const fetchProductsFromAPI = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  return response.json();
}
