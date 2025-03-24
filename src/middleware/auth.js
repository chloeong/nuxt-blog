// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = false; // Replace with your authentication logic

  if (!isAuthenticated && to.path !== '/') {
    return navigateTo('/');
  }
});