<template>
  <section class="px-8 py-4 w-100 fill-height">
    <h1 class="mb-4">Usuarios</h1>

    <v-card v-if="loading === 'pending'">
      <v-skeleton-loader v-for="i in 6" :key="i" height="100" type="list-item-two-line" class="mt-4">
      </v-skeleton-loader>
    </v-card>

    <v-card v-if="loading === 'success' && filteredUsers != null && filteredUsers.length >= 1">
      <h4 class="py-4 px-8" v-show="usersQuery.length >= 1">Buscando "{{ usersQuery }}"</h4>
      <UserList :filteredUsers="filteredUsers" :deleteUser="deleteUser" />
    </v-card>

    <v-alert v-if="loading === 'success' && filteredUsers != null && filteredUsers.length === 0" type="info">
      No hay usuarios para mostrar.
    </v-alert>

    <v-alert v-if="error" type="error" dismissible>
      Hubo un error al traer los datos, intente de nuevo más tarde.
    </v-alert>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUsers } from '~/composables/useUsers';
import type { User } from '~/interfaces/users';
import UserList from '~/components/users/UserList.vue'

useHead({
  title: 'Usuarios - Sistema de Gestión'
});

const { loading, error, usersQuery, filteredUsers, deleteUser } = useUsers();

onBeforeRouteLeave(() => {
  usersQuery.value = '';
  const searchInput = document.getElementById('search') as HTMLInputElement;
  searchInput.value = '';
});
</script>