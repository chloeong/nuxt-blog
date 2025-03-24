<template lang="pug">
div
  QTable(
    :rows="rows"
    :columns="columns"
    :rows-per-page-options="[5, 10, 15]"
    :pagination="pagination"
  )
    template(v-slot:body="props")

    template(v-slot:bottom-row)
      tr.summary
        td(v-for="col in columns" :key="col.name" :class="`text-${col.align || 'right'}`")
          template(v-if="summary[col.name] || summary[col.name] === 0")
            template(v-if="col.format") {{ col.format(summary[col.name]) }} 
            template(v-else) {{ summary[col.name] }}
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  rows: Array,
  columns: Array,
  summary: Object,
})

const emit = defineEmits(['page-change'])

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
  pagesNumber: Math.ceil(props.rows.length / 5),
})

const totalRows = computed(() => {
  return props.rows.length
})

const totalAge = computed(() => {
  return props.rows.reduce((sum, row) => sum + (row.age || 0), 0)
})

const onPaginationChange = (newPage) => {
  pagination.page = newPage
  emit('page-change', pagination.page)
}
</script>

<style scoped lang="scss">
.summary {
  background-color: #f4f4f4;
}
</style>
  