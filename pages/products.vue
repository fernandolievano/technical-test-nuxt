<template>
  <section class="px-8 py-4 w-100 fill-height">
    <h1 class="mb-4">Productos</h1>

    <v-card v-if="loading === 'pending'">
      <v-skeleton-loader v-for="i in 6" :key="i" height="100" type="list-item-two-line" class="mt-4">
      </v-skeleton-loader>
    </v-card>

    <v-card v-if="loading === 'success' && filteredProducts != null && filteredProducts.length >= 1">
      <h4 class="py-4 px-8" v-show="productsQuery.length >= 1">Buscando "{{ productsQuery }}"</h4>
      <v-list lines="two">
        <v-slide-y-transition group>
          <v-list-item v-for="product in filteredProducts" :key="product.id">
            <template v-slot:prepend>
              <v-avatar icon="mdi-package-variant">
              </v-avatar>
            </template>
            <v-list-item-title>{{ product.title }}</v-list-item-title>
            <v-list-item-subtitle>${{ product.price }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ product.category }}</v-list-item-subtitle>

            <!-- options button -->
            <template v-slot:append>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                </template>

                <!-- options list -->
                <v-list>
                  <v-list-item @click="showProduct(product)">Ver producto</v-list-item>
                  <v-dialog v-model="confirmDelete" persistent max-width="800">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-list-item v-bind="activatorProps">
                        Eliminar producto
                      </v-list-item>
                    </template>

                    <v-card>
                      <v-card-text>
                        <p class="text-center">
                          ¿Realmente deseas eliminar el producto <b>{{ product.title }}</b> de la lista?
                        </p>
                      </v-card-text>
                      <template v-slot:actions>
                        <v-spacer></v-spacer>

                        <v-btn @click="confirmDelete = false">
                          Cancelar
                        </v-btn>

                        <v-btn color="red" @click="deleteProduct(product.id)">
                          Eliminar
                        </v-btn>
                      </template>
                    </v-card>
                  </v-dialog>
                </v-list>
                <!-- options list -->
              </v-menu>
            </template>
            <!-- options button -->
          </v-list-item>
        </v-slide-y-transition>
      </v-list>
    </v-card>


    <v-alert v-if="loading === 'success' && filteredProducts != null && filteredProducts.length === 0" type="info">
      No hay productos para mostrar.
    </v-alert>
    <v-alert v-if="error" type="error" dismissible>
      Hubo un error al traer los datos, intente de nuevo más tarde.
    </v-alert>

    <!-- product modal -->
    <v-dialog v-model="productModal" max-width="600">
      <v-card v-if="selectedProduct">
        <v-img :src="selectedProduct.image" class="w-100 mt-8 mb-4" height="200" loading="lazy"></v-img>
        <v-card-text class="px-12">
          <h2 class="pb-4">{{ selectedProduct.title }}</h2>
          <p><strong>Precio:</strong> ${{ selectedProduct.price }}</p>
          <p><strong>Categoría:</strong> {{ selectedProduct.category }}</p>
          <p><strong>Descripción:</strong> {{ selectedProduct.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" block @click="productModal = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- product modal -->
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useProducts } from '~/composables/useProducts';
import type { Product } from '~/interfaces/products';

useHead({
  title: 'Productos - Sistema de Gestión'
});

const confirmDelete = ref(false);
const productModal = ref(false);
const selectedProduct = ref<Product | null>(null);

const { loading, error, productsQuery, filteredProducts, deleteProduct } = useProducts();

const showProduct = (product: Product) => {
  selectedProduct.value = product;
  productModal.value = true;
};

onBeforeRouteLeave(() => {
  productsQuery.value = '';
  const searchInput = document.getElementById('search') as HTMLInputElement;
  searchInput.value = ''
})
</script>