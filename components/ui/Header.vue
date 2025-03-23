<template lang="pug">
QHeader(elevated)
  QToolbar
    QBtn(
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      @click="emit('toggleSidebar')"
    )

    QToolbarTitle Quasar App
</template>

<script setup>
const emit = defineEmits(['toggleSidebar']);
</script>