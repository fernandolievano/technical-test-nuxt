<template>
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
              <ConfirmDelete message="¿Realmente deseas eliminar este producto de la lista?"
                buttonLabel="Eliminar Producto" @confirm="handleDeleteProduct(product.id)" />
            </v-list>
            <!-- options list -->
          </v-menu>
        </template>
        <!-- options button -->
      </v-list-item>
    </v-slide-y-transition>
  </v-list>


  <!-- product modal -->
  <v-dialog v-model="productModal" max-width="600">
    <v-card v-if="selectedProduct">
      <v-img :src="selectedProduct.image" class="w-75 mt-8 mb-4 mx-auto" height="200" loading="lazy"></v-img>
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
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Product } from '~/interfaces/product';
import ConfirmDelete from '~/components/shared/ConfirmDelete.vue';

const props = defineProps({
  filteredProducts: {
    type: Array as PropType<Product[]>,
    required: true
  },
  deleteProduct: {
    type: Function as PropType<(id: number) => void>,
    required: true
  }
});

const productModal = ref(false);
const selectedProduct = ref<Product | null>(null);

const showProduct = (product: Product) => {
  selectedProduct.value = product;
  productModal.value = true;
};

const handleDeleteProduct = (id: number) => {
  if (id != null) {
    props.deleteProduct(id)
  }
}
</script>