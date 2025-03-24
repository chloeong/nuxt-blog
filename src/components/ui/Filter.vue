<template lang="pug">
  Qcard.q-pa-md(flat bordered)
    QForm(@submit.prevent="$emit('submit')" class="row q-col-gutter-md")
      template(v-for="(field, index) in fields" :key="index")
        div(class="col-12 col-md-6 row items-center")
          //- label
          div(class="col-4 text-right row items-center")
            QIcon(:name="['date','date-range'].includes(field.type) ? 'event' : 'search'" class="q-mr-xs text-grey-7")
            span(class="text-weight-medium text-grey-8") {{ field.label }}
          div(class="col-8")
            //- input
            QInput(
              v-if="field.type === 'input'"
              v-model="searchData[field.name]"
              :label="field.label"
              :placeholder="field.options.placeholder || ''"
              outlined
              dense
            )

            //- select
            QSelect(
              v-if="field.type === 'select'"
              v-model="searchData[field.name]"
              :label="field.label"
              :options="field.options.selectOptions || []"
              :clearable="field.options.clearable || false"
              outlined
              dense
            )

            //- date
            QInput(
              v-if="field.type === 'date'"
              v-model="searchData[field.name]"
              :label="field.label"
              :options="field.options.disabledOptions"
              outlined
              dense
            )
              template(v-slot:append)
                QIcon(name="event" class="cursor-pointer")
                  QPopupProxy(cover transition-show="scale" transition-hide="scale")
                    QDate(v-model="searchData[field.name]" :options="field.options.disabledOptions")
                      div(class="row items-center justify-end")
                        QBtn(v-close-popup label="Close" color="primary" flat)

            div(v-if="field.type === 'date-range'")
              QInput(
                :model-value="`${searchData[field.name].from} - ${searchData[field.name].to}`"
                :label="field.label"
                :options="field.options.disabledOptions"
              )
                template(v-slot:append)
                  QIcon(name="event" class="cursor-pointer")
                    QPopupProxy(cover transition-show="scale" transition-hide="scale")
                      QDate(v-model="searchData[field.name]" range :options="field.options.disabledOptions")
                        div(class="row items-center justify-end")
                          QBtn(v-close-popup label="Close" color="primary" flat)
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  modelValue: Object,
  fields: Array,
});

const emit = defineEmits(['update:modelValue']);

const searchData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<!-- <style scoped>
.search-filter {
  max-width: 600px;
  margin: 0 auto;
}
</style> -->
