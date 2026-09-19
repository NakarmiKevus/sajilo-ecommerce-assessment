import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

export async function getAllProducts() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

export async function getCategories() {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
}
