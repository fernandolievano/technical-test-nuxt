<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary v-if="isMobile">
      <NavigationMenu @close="drawer = false" />
    </v-navigation-drawer>

    <v-navigation-drawer v-if="!isMobile" app permanent>
      <NavigationMenu />
    </v-navigation-drawer>

    <v-main>
      <v-container class="fill-height px-0 py-0" fluid>
        <Navbar @toggle-menu="drawer = !drawer" :isMobile="isMobile" />

        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '~/components/layout/Navbar.vue';
import NavigationMenu from '~/components/layout/NavigationMenu.vue';
import { useAuthStore } from '~/stores/authStore';

definePageMeta({
  middleware: 'auth.global',
});

const { setUserFromCookie, user } = useAuthStore();

if (!user) useAsyncData('authUser', setUserFromCookie())

const drawer = ref(false);
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 960; // Vuetify md breakpoint
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>