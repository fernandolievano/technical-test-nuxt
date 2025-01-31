<template>
  <v-app>
    <v-fade-transition>
      <template v-if="isReady">
        <div>
          <v-navigation-drawer v-model="drawer" app temporary v-if="isMobile">
            <NavigationMenu @close="drawer = false" />
          </v-navigation-drawer>

          <v-navigation-drawer v-if="!isMobile" app permanent>
            <NavigationMenu />
          </v-navigation-drawer>

          <v-main>
            <v-container class="fill-height px-0 py-0" fluid>
              <Navbar @toggle-menu="drawer = !drawer" :isMobile="isMobile" />

              <NuxtPage />
            </v-container>
          </v-main>
        </div>
      </template>
    </v-fade-transition>
    <NuxtLoadingIndicator />
  </v-app>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '~/components/layout/Navbar.vue';
import NavigationMenu from '~/components/layout/NavigationMenu.vue';
import { useAuthStore } from '~/stores/authStore';
useHead({
  title: 'Sistema de Gestión'
});

const { setUserFromCookie, user } = useAuthStore();

if (!user) useAsyncData('authUser', setUserFromCookie());

const drawer = ref(false);
const isMobile = ref(false);
const isReady = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 960; // Vuetify md breakpoint
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  setTimeout(() => {
    isReady.value = true;
  }, 50); // little delay to avoid flickering on layout
});
</script>

<style>
.fade-scale-enter-active {
  animation: fadeScale 0.4s ease-out;
}

@keyframes fadeScale {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>