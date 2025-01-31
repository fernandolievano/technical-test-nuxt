<template>
  <section class="px-8 py-4 w-100 fill-height">
    <h1 class="mb-4">Usuarios</h1>

    <v-card v-if="loading === 'pending'">
      <v-skeleton-loader v-for="i in 6" :key="i" height="100" type="list-item-two-line" class="mt-4">
      </v-skeleton-loader>
    </v-card>

    <v-card v-if="loading === 'success' && filteredUsers != null && filteredUsers.length >= 1">
      <h4 class="py-4 px-8" v-show="usersQuery.length >= 1">Buscando "{{ usersQuery }}"</h4>

      <v-list lines="two">
        <v-slide-y-transition group>
          <v-list-item v-for="user in filteredUsers" :key="user.id">
            <template v-slot:prepend>
              <v-avatar icon="mdi-account">
              </v-avatar>
            </template>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>

            <!-- options button -->
            <template v-slot:append>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                </template>

                <!-- options list -->
                <v-list>
                  <v-list-item @click="showUser(user)">Ver usuario</v-list-item>
                  <v-dialog v-model="confirmDelete" persistent max-width="800">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-list-item v-bind="activatorProps">
                        Eliminar usuario
                      </v-list-item>
                    </template>

                    <v-card>
                      <v-card-text>
                        <p class="text-center">
                          ¿Realmente deseas eliminar al usuario <b>{{ user.name }}</b> de la lista?
                        </p>
                      </v-card-text>
                      <template v-slot:actions>
                        <v-spacer></v-spacer>

                        <v-btn @click="confirmDelete = false">
                          Cancelar
                        </v-btn>

                        <v-btn color="red" @click="deleteUser(user.id)">
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


    <v-alert v-if="loading === 'success' && filteredUsers != null && filteredUsers.length === 0" type="info">
      No hay usuarios para mostrar.
    </v-alert>
    <v-alert v-if="error" type="error" dismissible>
      Hubo un error al traer los datos, intente de nuevo más tarde.
    </v-alert>

    <!-- user modal -->
    <v-dialog v-model="userModal" max-width="600">
      <v-card v-if="selectedUser">
        <v-card-title class="text-center pt-8 pb-4 px-12">
          <v-icon size="x-large">mdi-account</v-icon>
          <h2>{{ selectedUser.username }}</h2>
        </v-card-title>
        <v-card-text class="px-12">
          <p><strong>Nombre:</strong> {{ selectedUser.name }}</p>
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>
          <p><strong>Teléfono:</strong> {{ selectedUser.phone }}</p>
          <p><strong>Compañía:</strong> {{ selectedUser.company.name }}</p>
          <p><strong>Website</strong>:
            <a :href="`https://${selectedUser.website}`" target="_blank" rel="noopener noreferrer">
              {{ selectedUser.website }}
            </a>
          </p>
          <p><strong>Dirección:</strong> {{ selectedUser.address.suite }}, {{ selectedUser.address.street }}, {{
            selectedUser.address.city }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" block @click="userModal = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- user modal -->
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUsers } from '~/composables/useUsers';
import type { User } from '~/interfaces/users';

useHead({
  title: 'Usuarios - Sistema de Gestión'
});

const confirmDelete = ref(false);
const userModal = ref(false);
const selectedUser = ref<User | null>(null);

const { loading, error, usersQuery, filteredUsers, deleteUser } = useUsers();

const showUser = (user: User) => {
  selectedUser.value = user;
  userModal.value = true;
};

onBeforeRouteLeave(() => {
  usersQuery.value = '';
  const searchInput = document.getElementById('search') as HTMLInputElement;
  searchInput.value = ''
})
</script>