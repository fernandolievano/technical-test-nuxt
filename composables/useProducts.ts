import { ref } from 'vue';
import { fetchProductsFromAPI } from '~/utils/api';
import type { Product } from '~/interfaces/products';

const products = ref<Product[]>([]);
const searchQuery = ref<String>('');

const fetchProducts = async () => {
  products.value = await fetchProductsFromAPI();
};
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
const useProducts = () => ({
  products,
  searchQuery,
  fetchProducts,
  filteredProducts
});

export default useProducts;