<template lang="pug">
q-breadcrumbs
  q-breadcrumbs-el(label="Home" to="/")
  q-breadcrumbs-el(
    v-for="(breadcrumb, index) in breadcrumbs"
    :key="index"
    :to="breadcrumb.to"
    :label="breadcrumb.label"
    :disable="!breadcrumb.to || breadcrumb.to === route.path"
  )
</template>

<script setup>
import { useRoute } from 'nuxt/app';
import { useRouteMetadata } from '@/composables/useRouteMetadata.js';

const route = useRoute();
const { routeData } = useRouteMetadata();

const getMatchRoute = (path, name, routes) => {
  for (const route of routes) {
    if (route.to === path || route.name === name) return route;
    if (route.children) {
      const match = getMatchRoute(path, name, route.children);
      if (match) return match;
    }
  }
  return;
};

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean);
  let fullPath = '';
  return paths.map((segment) => {
    fullPath += `/${segment}`;
    const matchRoute = getMatchRoute(fullPath, segment, routeData);
    return matchRoute;
  })
})
</script>

<style scope lang="scss">
.q-breadcrumbs {
  padding: 16px;
  .q-breadcrumbs-el {
    color: #000000;
  }
}
</style>