<template>
  <v-list>
    <v-list-item-media class="text-center" lines="three">
      <img class="w-75 mx-auto" src="~/assets/Logo-Daptee.svg" alt="Daptee Logo" loading="eager" >
    </v-list-item-media>
    <v-divider></v-divider>
    <v-list-item prepend-icon="mdi-account-multiple" to="/users" title="Usuarios" lines="two"  />
    <v-list-item prepend-icon="mdi-package-variant" to="/products" title="Productos" lines="two" />
  </v-list>
</template>