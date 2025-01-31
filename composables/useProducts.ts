import { useAsyncData } from '#app';
import type { Product } from '~/interfaces/products';


export function useProducts() {
  const productsQuery = useState<String>('productsQuery', () => '');
  const { data: products, status: loading, error, refresh } = useAsyncData<Product[]>(
    'products',
    async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Error al obtener productos');
      return response.json();
    },
    {
      server: true,
    }
  );
  const filteredProducts = computed(() => {
    const query = productsQuery.value.toLowerCase();
    const fields = ['title', 'category'] as const;

    if (!products.value) return [];
    if (query === '') return products.value;
    return products.value.filter(product => fields.some(key => product[key].toLowerCase().includes(query)));
  });

  const deleteProduct = (id: number) => {
    if (products.value) {
      products.value = products.value.filter(product => product.id !== id);
    }
  };

  return {
    products,
    loading,
    error,
    refresh,
    productsQuery,
    filteredProducts,
    deleteProduct
  };
}