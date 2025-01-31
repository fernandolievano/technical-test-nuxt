<template>
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
              <ConfirmDelete
                message="¿Realmente deseas eliminar este usuario de la lista?"
                buttonLabel="Eliminar Usuario"
                @confirm="handleDeleteUser(user.id)"
               />
            </v-list>
            <!-- options list -->
          </v-menu>
        </template>
        <!-- options button -->
      </v-list-item>
    </v-slide-y-transition>
  </v-list>

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
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { User } from '~/interfaces/users';
import ConfirmDelete from '~/components/shared/ConfirmDelete.vue';

const props = defineProps({
  filteredUsers: {
    type: Array as PropType<User[]>,
    required: true
  },
  deleteUser: {
    type: Function as PropType<(id: number) => void>,
    required: true
  }
});


const userModal = ref(false);
const selectedUser = ref<User | null>(null);

const showUser = (user: User) => {
  selectedUser.value = user;
  userModal.value = true;
};
const handleDeleteUser = (id: number) => {
  if (id != null) {
    props.deleteUser(id);
  }
};
</script>