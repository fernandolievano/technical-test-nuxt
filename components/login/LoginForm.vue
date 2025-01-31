<template>
  <v-card max-width="600" class="w-100 py-8 px-8">
    <v-card-title>
      <img class="w-100 mx-auto" height="100px" src="~/assets/Logo-Daptee.svg"></img>
    </v-card-title>

    <v-card-text>
      <v-form ref="form" @submit.prevent="handleLogin">
        <div class="py-4">
          <v-text-field v-model="username" label="Usuario" prepend-inner-icon="mdi-account" variant="outlined"
            :rules="[rules.required]"></v-text-field>
        </div>
        <div class="py-4">
          <v-text-field v-model="password" label="Contraseña" type="password" prepend-inner-icon="mdi-lock"
            variant="outlined" :rules="[rules.required]"></v-text-field>
        </div>

        <v-alert v-if="errorMessage" type="error" class="mt-2">
          {{ errorMessage }}
        </v-alert>

        <div class="pt-4">
          <v-btn type="submit" color="primary" size="large" block :loading="loading">
            Iniciar Sesión
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VForm } from 'vuetify/components';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/authStore';

const { login } = useAuthStore();

const router = useRouter();

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);


const form: Ref<VForm | null> = ref(null);

const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio',
};

const handleLogin = async () => {
  const isValid = await form.value?.validate();
  if (!isValid) return;

  loading.value = true;
  errorMessage.value = '';

  try {
    await login({ username: username.value, password: password.value });
    router.push('/users');
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>