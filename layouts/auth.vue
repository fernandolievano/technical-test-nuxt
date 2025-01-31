<template>
  <v-app>
    <NuxtPage />
  </v-app>
</template>

<script setup>
definePageMeta({
  middleware: 'auth.global',
});
</script>
