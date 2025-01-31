<template>
  <section class="px-8 py-4 w-100">
    <h1 class="mb-4">Usuarios</h1>

    <v-skeleton-loader v-if="loading === 'pending'" height="400" type="list-item-two-line" class="mt-4">
    </v-skeleton-loader>

    <v-card v-if="loading === 'success' && users != null && users.length >= 1">
      <v-list lines="two">
        <v-list-item v-for="user in users" :key="user.id">
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
      </v-list>
    </v-card>

    <!-- user modal -->
    <v-dialog v-model="userModal" max-width="400">
      <v-card v-if="selectedUser">
        <v-card-title class="text-center pt-8 pb-4">
          <v-icon size="x-large">mdi-account</v-icon>
          <h2>{{ selectedUser.username }}</h2>
        </v-card-title>
        <v-card-text>
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

const confirmDelete = ref(false);
const userModal = ref(false);
const selectedUser = ref<User | null>(null);

const { users, loading, error, searchQuery, filteredUsers, deleteUser } = useUsers();

const showUser = (user: User) => {
  selectedUser.value = user;
  userModal.value = true;
};
</script>