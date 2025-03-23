<template lang="pug">
  QBreadcrumbs(class="q-mb-md")
    QBreadcrumbsEl(label="Home" icon="home" to="/")
    //- QBreadcrumbsEl(
    //-   v-for="(breadcrumb, index) in breadcrumbs"
    //-   :key="index"
    //-   :label="breadcrumb.label"
    //-   :to="breadcrumb.path"
    //-   v-if="breadcrumb.label"
    //- )
</template>

<script setup>
// import { useRoute, useRouter } from 'vue-router';
import { useRoute } from 'nuxt/app';
// import { computed } from 'vue';

const route = useRoute();
// const router = useRouter();

const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched;
  return matchedRoutes.map((r, index) => ({
    label: r.label,
    path: index === matchedRoutes.length - 1 ? null : r.path
  }));
});
</script>