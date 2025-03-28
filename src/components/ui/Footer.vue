<template lang="pug">
  q-footer
    .q-pa-md.text-center
      p &copy; {{ currentYear }} Your Company Name
</template>

<script setup>
const currentYear = ref(new Date().getFullYear());
</script>

<style lang="scss" scoped>
.q-footer {
  color: #ffffff;
  background: #e0e0e0;
}
</style>