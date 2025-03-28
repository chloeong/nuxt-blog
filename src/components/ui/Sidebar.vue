<template lang="pug">
aside.sidebar
  .sidebar-header
    slot(name="header")
      .title Admin Panel
      q-btn(
        flat
        dense
        round
        icon="keyboard_arrow_left"
        aria-label="Close"
        @click="emit('toggleSidebar')"
      )
  q-list
    template(v-for="item in routeData" :key="item.name")
      q-expansion-item(
        v-if="item.children"
        :label="item.label"
        :icon="item.icon"
        :content-inset-level="0.5"
        :default-opened="isExpanded(item.to)"
      )
        q-list
          q-item(
            v-for="child in item.children"
            :key="child.label"
            :to="child.to"
            clickable
            :active="isRouteActive(child.to)"
          )
            q-item-section(avatar)
              q-icon(:name="child.icon")
            q-item-section {{ child.label }}

      q-item(
        v-else
        :to="item.to"
        clickable
        :active="isRouteActive(item.to)"
      )
        q-item-section(avatar)
          q-icon(:name="item.icon")
        q-item-section {{ item.label }}
</template>

<script setup>
import { useRoute } from 'nuxt/app';
import { useRouteMetadata } from '@/composables/useRouteMetadata.js';

const route = useRoute();
const { routeData } = useRouteMetadata();

const emit = defineEmits(['toggleSidebar']);

const isRouteActive = (to) => {
  return route.path === to;
};

const isExpanded = (path) => {
  return route.path.includes(path);
}
</script>

<style scoped lang="scss">
.sidebar {
  width: 300px;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  .sidebar-header {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>