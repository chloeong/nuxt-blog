<template lang="pug">
  QFooter.bg-grey-4.text-white
    .q-pa-md.text-center
      p &copy; {{ currentYear }} Your Company Name
</template>

<script setup>
const currentYear = ref(new Date().getFullYear());
</script>
