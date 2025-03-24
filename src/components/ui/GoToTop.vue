<template lang="pug">
  QBtn.go-top-btn(
    v-if="showGoTop"
    icon="keyboard_arrow_up"
    color="primary"
    rounded
    @click="scrollToTop"
  )
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showGoTop = ref(false);

const checkScrollPosition = () => {
  if (window.scrollY > 300) {
    showGoTop.value = true;
  } else {
    showGoTop.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', checkScrollPosition);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollPosition);
});
</script>

<style scoped>
.go-top-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2001;
  display: block;
  padding: 8px;
}
</style>
