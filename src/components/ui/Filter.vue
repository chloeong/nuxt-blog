<template lang="pug">
.ubi-filter
  .ubi-filter-header
    .ubi-filter-title {{ title }}
    .ubi-filter-sub-title {{ subTitle }}
    span.ubi-filter-action-button
      slot(name="actionButton")
  QForm.ubi-filter-form(@submit.prevent="$emit('submit')")
    .row
      .col-xs-12.col-sm-6.col-md-6.row(v-for="(field, index) in fields" :key="index")
        //- label
        span.text-subtitle1.col-xs-12.col-sm-4.q-mb-md
          QIcon.ubi-filter-label-icon(v-if="field.icon" :name="field.icon")
          | {{ field.label }}
        .col-xs-12.col-sm-7.col-md-7.q-mr-md
          //- input
          QInput(
            v-if="field.type === 'input'"
            v-model="searchData[field.name]"
            :key="field.name"
            :label="field.label"
            :placeholder="field.placeholder || ''"
            :disable="field.disabled || false"
            :class="{ 'ubi-filter-input-disabled': field.disabled }"
            :error="errorObj.hasOwnProperty(field.value)"
            :error-message="errorObj.hasOwnProperty(field.value) ? errorObj[field.value][0] : ''"
            outlined
            dense
          )

          //- select
          QSelect(
            v-if="field.type === 'select'"
            v-model="searchData[field.name]"
            :key="field.name"
            :label="field.label"
            :options="field.selectOptions || []"
            :clearable="field.clearable || false"
            :disable="field.disabled || false"
            :class="{ 'ubi-filter-input-disabled': field.disabled }"
            outlined
            dense
          )

          //- multiple-select
          QSelect(
            v-if="field.type === 'multiple-select'"
            v-model="searchData[field.name]"
            :key="field.name"
            :label="field.label"
            :options="field.selectOptions || []"
            :clearable="field.clearable || false"
            :disable="field.disabled || false"
            :class="{ 'ubi-filter-input-disabled': field.disabled }"
            multiple
            outlined
            dense
          )
            template(v-slot:option="scope")
              QItem(v-bind="scope.itemProps")
                QItemSection.col-1
                  QCheckbox(v-model="scope.selected" dense @update:model-value="scope.toggleOption(scope.opt)")
                QItemSection.col-11
                  QItemLabel {{ scope.opt.label }}

          //- date
          QInput(
            v-if="field.type === 'date'"
            v-model="searchData[field.name]"
            :key="field.name"
            :label="field.label"
            :disable="field.disabled || false"
            :class="{ 'ubi-filter-input-disabled': field.disabled }"
            outlined
            dense
          )
            template(v-slot:append)
              QIcon.cursor-pointer(name="event")
                QPopupProxy(cover transition-show="scale" transition-hide="scale")
                  QDate(v-model="searchData[field.name]" :options="field.dateOptions")
                    .row.items-center.justify-end
                      QBtn(v-close-popup label="Close" color="primary" flat)

          //- date-range
          template(v-if="field.type === 'date-range'")
            QInput.col-xs-12.col-sm-3.col-md-3(
              v-model="searchData[field.name].start"
              :key="field.name"
              :label="field.label"
              :disable="field.disabled || false"
              :class="{ 'ubi-filter-input-disabled': field.disabled }"
              outlined
              dense
            )
              template(v-slot:append)
                QIcon.cursor-pointer(name="event")
                  QPopupProxy(cover transition-show="scale" transition-hide="scale")
                    QDate(v-model="searchData[field.name].start" :options="startDateOptions(field)")
                      .row.items-center.justify-end
                        QBtn(v-close-popup label="Close" color="primary" flat)
            span.q-mb-md.q-mx-xs -
            QInput.col-xs-12.col-sm-3.col-md-3(
              v-model="searchData[field.name].end"
              :key="field.name"
              :label="field.label"
              :options="field.dateOptions"
              :disable="field.disabled || false"
              :class="{ 'ubi-filter-input-disabled': field.disabled }"
              outlined
              dense
            )
              template(v-slot:append)
                QIcon.cursor-pointer(name="event")
                  QPopupProxy(cover transition-show="scale" transition-hide="scale")
                    QDate(v-model="searchData[field.name].end" :options="endDateOptions(field)")
                      .row.items-center.justify-end
                        QBtn(v-close-popup label="Close" color="primary" flat)

          //- custom
          template(v-if="field.type === 'custom'")
            slot(:name="field.name" :search-data="searchData")
    .ubi-filter-button-group.row
      QBtn.ubi-filter-button.col-2(v-if="typeof handleSearch === 'function'" :label="searchLabel" color="primary" @click="handleSearch")
      QBtn.ubi-filter-button.col-2(v-if="typeof handleClear === 'function'" label="Clear" color="secondary" @click="handleClear")
</template>

<script setup>
import { defineProps } from 'vue';
const { $dayjs } = useNuxtApp();

const props = defineProps({
  title: String,
  subTitle: String,
  modelValue: Object,
  fields: Array,
  errorState: Object,
  searchLabel: { type: String, default: 'Search' },
  handleSearch: { type: Function, default: null },
  handleClear: { type: Function, default: null },
});

const emit = defineEmits(['update:modelValue']);

const searchData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
const errorObj = computed({
  get: () => props.errorState,
  set: (value) => emit('update:errorState', value),
});

const startDateOptions = (field) => {
  return (date) => {
    // check original date options
    const originalOptionsResult = field.dateOptions ? field.dateOptions(date) : true;
    if (!originalOptionsResult) return false;
    // check against end date
    const endDate = searchData.value[field.name]?.end
    if (endDate) {
      return $dayjs(date).isSameOrBefore(endDate)
    }
    return true;
  }
}

const endDateOptions = (field) => {
  return (date) => {
    // check original date options
    const originalOptionsResult = field.dateOptions ? field.dateOptions(date) : true;
    if (!originalOptionsResult) return false;
    // check against start date
    const startDate = searchData.value[field.name]?.start
    if (startDate) {
      return $dayjs(date).isSameOrAfter(startDate)
    }
    return true;
  }
}
</script>

<style lang="scss">
.ubi-filter {
  .ubi-filter-header {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
    .ubi-filter-title {
      font-size: 24px;
      margin-top: 8px;
      text-align: center;
    }
    .ubi-filter-sub-title {
      color: #504d6b;
      font-size: 12px;
      line-height: 28px;
      margin-top: auto;
      margin-left: 16px;
    }
    .ubi-filter-action-button {
      margin-left: auto;
    }
  }
  .ubi-filter-form {
    .ubi-filter-label-icon {
      font-size: 24px;
      margin-right: 8px;
    }
    .ubi-filter-input-disabled {
      background-color: #e8eaf6 !important;
    }
    .ubi-filter-button-group {
      justify-content: center;
      margin-top: 48px;
      margin-bottom: 24px;
      .ubi-filter-button {
        border-radius: 8px;
        & + .ubi-filter-button {
          margin-left: 16px;
        }
      }
    }
  }
}
</style>