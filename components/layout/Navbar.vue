<template>
  <v-app-bar color="primary" app class="px-4">
    <!-- Botón de menú en mobile -->
    <v-app-bar-nav-icon class="mr-4" @click="$emit('toggle-menu')" v-if="isMobile" />

    <!-- Buscador -->
    <v-text-field
        v-model="search"
        placeholder="Buscar..."
        append-inner-icon="mdi-magnify"
        hide-details
        density="compact"
        single-line
        clearable
        />

    <!-- Usuario -->
    <v-menu class="w-100">
      <template v-slot:activator="{ props }">
        <p class="ml-4 mr-2 text-uppercase">
          {{ username }}
        </p>
        <v-btn v-bind="props" icon>
          <v-icon>
            mdi-account
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item title="Mi Cuenta" @click="sayHello" />
        <v-list-item title="Cerrar Sesión" @click="logout" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/authStore';

defineProps<{
  isMobile: boolean;
}>();

const search = ref('');
const router = useRouter()
const authStore = useAuthStore();
const username = computed(() => authStore.user?.username);

const logout = () => {
  authStore.logout();
  router.push('/logout');
};
const sayHello = () => {
  console.log('Hello');
};
</script>
