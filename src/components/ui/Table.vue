<template lang="pug">
div
  q-table(
    flat
    :bordered="false"
    separator="none"
    :square="false"
    :rows="rows"
    :row-key="rowKey"
    :columns="columns"
    :rows-per-page-options="[5, 10, 15]"
    :pagination="pagination"
  )
    template(v-slot:body="props")
      q-tr(:props="props" :class="props.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'")
        q-td(v-for="col in props.cols" :key="col.name" :props="props")
          template(v-if="col.name === 'operate'")
            slot(name="operate" :row="props.row") 
          | {{ col.format ? col.format(props.row[col.field]) : props.row[col.field] }}
    template(v-slot:bottom-row)
      q-tr(class="summary" v-if="summary")
        q-td(v-for="col in columns" :key="col.name" :class="`text-${col.align || 'right'}`")
          template(v-if="summary[col.name] || summary[col.name] === 0")
            template(v-if="col.format") {{ col.format(summary[col.name]) }} 
            template(v-else) {{ summary[col.name] }}
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  rows: Array,
  columns: Array,
  summary: Object,
  rowKey: { type: String, default: 'id' },
})

const emit = defineEmits(['page-change'])

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
  pagesNumber: Math.ceil(props.rows.length / 5),
})

const onPaginationChange = (newPage) => {
  pagination.page = newPage
  emit('page-change', pagination.page)
}
</script>

<style scope lang="scss">
.q-table {
  .even-row {
    background-color: #ffffff;
  }
  .odd-row {
    background-color: #f8f9fa;
  }
  .summary {
    background-color: #f8f9fa;
  }
}
.q-table__bottom {
  border-top: none;
}
</style>
  