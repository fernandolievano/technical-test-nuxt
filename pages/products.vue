<template>
  <section class="px-8 py-4 w-100 fill-height">
    <h1 class="mb-4">Productos</h1>

    <v-card v-if="loading === 'pending'">
      <v-skeleton-loader v-for="i in 6" :key="i" height="100" type="list-item-two-line" class="mt-4">
      </v-skeleton-loader>
    </v-card>

    <v-card v-if="loading === 'success' && filteredProducts != null && filteredProducts.length >= 1">
      <h4 class="py-4 px-8" v-show="productsQuery.length >= 1">Buscando "{{ productsQuery }}"</h4>
      <ProductList :filteredProducts="filteredProducts" :deleteProduct="deleteProduct" />
    </v-card>


    <v-alert v-if="loading === 'success' && filteredProducts != null && filteredProducts.length === 0" type="info">
      No hay productos para mostrar.
    </v-alert>
    <v-alert v-if="error" type="error" dismissible>
      Hubo un error al traer los datos, intente de nuevo más tarde.
    </v-alert>


  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useProducts } from '~/composables/useProducts';
import type { Product } from '~/interfaces/products';
import ProductList from '~/components/products/ProductList.vue'

useHead({
  title: 'Productos - Sistema de Gestión'
});
const { loading, error, productsQuery, filteredProducts, deleteProduct } = useProducts();


onBeforeRouteLeave(() => {
  productsQuery.value = '';
  const searchInput = document.getElementById('search') as HTMLInputElement;
  searchInput.value = ''
})
</script>