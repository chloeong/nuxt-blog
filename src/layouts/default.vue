<template lang="pug">
  QLayout.layout-container(view="lHh Lpr lFf")
    Header(@toggleSidebar="toggleSidebar")

    QDrawer(v-model="isSidebarOpen" show-if-above bordered)
      Sidebar(@toggleSidebar="toggleSidebar")

    QPageContainer.main-content
      Breadcrumb
      slot
    
    Footer

    GoToTop
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/ui/Header.vue';
import Sidebar from '@/components/ui/Sidebar.vue';
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import Footer from '@/components/ui/Footer.vue';
import GoToTop from '@/components/ui/GoToTop.vue';

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>