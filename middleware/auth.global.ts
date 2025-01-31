export default defineNuxtRouteMiddleware((to, from) => {
   const authCookie = useCookie('authUser');
   const user = authCookie.value

  if (!user && to.path !== '/login') {
    return navigateTo('/login', { replace: true });
  }

  if (user && to.path === '/login') {
    return navigateTo('/', { replace: true });
  }
  if (user && to.path === '/logout') {
    authCookie.value = null;

    return navigateTo('/login', { replace: true });
  }
});
