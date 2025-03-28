<template lang="pug">
q-header(elevated)
  q-toolbar
    q-btn(
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      @click="emit('toggleSidebar')"
    )

    q-toolbar-title Quasar App
</template>

<script setup>
const emit = defineEmits(['toggleSidebar']);
</script>