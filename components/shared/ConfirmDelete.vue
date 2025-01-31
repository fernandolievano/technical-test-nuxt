<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps" @click="dialog = true">
        {{ buttonLabel }}
      </v-list-item>
    </template>

    <v-card>
      <v-card-title>Confirmar acción</v-card-title>
      <v-card-text>
        <p>
          {{ message }}
        </p>
      </v-card-text>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn color="red" variant="elevated" @click="$emit('confirm'); dialog = false">
          Eliminar
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  buttonLabel: String,
  message: String
});

const dialog = ref(false);
</script>