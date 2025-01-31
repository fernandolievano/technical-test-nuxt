<template>
  <v-app-bar color="primary" app class="px-4">
    <v-app-bar-nav-icon class="mr-4" @click="$emit('toggle-menu')" v-if="isMobile" />

    <v-text-field v-model="search" placeholder="Buscar..." append-inner-icon="mdi-magnify" hide-details
      density="compact" single-line @input="handleSearch" />

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
import { useUsers } from '~/composables/useUsers';

defineProps<{
  isMobile: boolean;
}>();

const { usersQuery } = useUsers();
const search = ref('');
const router = useRouter();
const authStore = useAuthStore();
const username = computed(() => authStore.user?.username);

const logout = () => {
  authStore.logout();
  router.push('/logout');
};
const sayHello = () => {
  console.log('Hello');
};
const handleSearch = () => {
  const path = router.currentRoute.value.path;

  //  update query param based on the current route
  // ? this may be improved
  if (path === '/users') {
    usersQuery.value = search.value;
  }
};
</script>
