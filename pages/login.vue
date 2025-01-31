<template>
  <section class="fill-height login-wrapper">
    <v-container fluid class="fill-height align-center justify-center px-0 py-0">
      <v-row class="fill-height" no-gutters>
        <v-col cols="12" md="6" class="login-form-side px-4">
          <LoginForm />
        </v-col>
        <v-col cols="12" md="6" class="login-gradient-side">
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
useHead({
  title: 'Iniciar Sesión - Sistema de Gestión'
});
definePageMeta({
  layout: 'auth',
});
</script>

<style>
.login-wrapper {
  background-image: url('assets/image-mesh-gradient.png');
  background-size: cover;
  background-position: center;

  @media screen and (min-width: 960px) {
    background-image: none;
  }
}

.login-gradient-side {
  display: none;

  @media screen and (min-width: 960px) {
    display: block;
    background-image: url('assets/image-mesh-gradient.png');
    background-size: cover;
    background-position: center;
  }
}

.login-form-side {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>