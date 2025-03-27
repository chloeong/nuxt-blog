<template lang="pug">
Filter(
  title="Title"
  subTitle="Sub Title"
  v-model="searchData"
  :fields="searchFields"
  :errorState="errorState"
  :handleSearch="handleSearch"
  :handleClear="handleClear"
)
  template(#actionButton)
    QBtn(label="Search" color="primary" @click="handleSearch")
Table(
  :rows="rows"
  :columns="columns"
  :summary="summary"
)
  template(#operate="{ row }")
    QBtn(@click="handleEditRow(row)" color="primary" dense round flat icon="edit")
    QBtn(@click="handleDeleteRow(row)" color="negative" dense round flat icon="delete" class="q-ml-sm")
</template>

<script setup>
import Filter from '@/components/ui/Filter.vue';
import Table from '@/components/ui/Table.vue';
import { useDateFilter } from '@/composables/useDateFilter.js';

const { $filters } = useNuxtApp();
const { isDateAfterToday, isDateBefore30Days } = useDateFilter();

const searchFields = ref([
  { name: 'username', type: 'input', label: 'Username', icon: 'search', placeholder: 'Enter name' },
  { name: 'status', type: 'multiple-select', label: 'Status', icon: 'search', clearable: true, selectOptions: [{label: 'Enable', value: 1}, {label: 'Disable', value: 0}, {label: 'Freeze', value: 2}] },
  { name: 'birthday', type: 'date', label: 'Birthday', icon: 'event', dateOptions: (date) => isDateAfterToday(date) },
  { name: 'registerDate', type: 'date-range', label: 'Register Date', icon: 'event', dateOptions: (date) => isDateAfterToday(date) },
]);

const searchData = ref({
  username: '',
  status: [],
  birthday: '',
  registerDate: { start: '', end: '' },
});

const error = ref({});

const errorState = computed(() => {
  if (Object.keys(error.value).length <= 0) return [];
  return error.value;
});

const columns = [
  { name: 'id', label: 'ID', align: 'center', field: 'id' },
  { name: 'username', label: 'Username', align: 'center', field: 'username' },
  { name: 'email', label: 'Email', align: 'center', field: 'email' },
  { name: 'phone', label: 'Phone', align: 'center', field: 'phone' },
  { name: 'age', label: 'Age', align: 'right', field: 'age', format: val => $filters.number(val) },
  { name: 'balance', label: 'Balance', align: 'right', field: 'balance', format: val => $filters.amount(val) },
  { name: 'discount', label: 'Discount (%)', align: 'right', field: 'discount', format: val => $filters.percent(val) },
  { name: 'birthday', label: 'Birthday', align: 'center', field: 'birthday', format: val => $filters.date(val) },
  { name: 'registerDate', label: 'Register Date', align: 'center', field: 'registerDate', format: val => $filters.dateFull(val) },
  { name: 'operate', label: 'Operate', align: 'center' }
];

const rows = [
  { id: 1, username: 'Alice Brown', email: 'alice.brown@gmail.com', phone: '+1 555-912-5678', age: 29, balance: 1024.565, discount: 0.10, birthday: '1992-12-10T00:00:00.000Z', registerDate: '2023-01-15T12:30:30.000Z' },
  { id: 2, username: 'John Doe', email: 'john.doe@yahoo.com', phone: '+1 555-123-4567', age: 34, balance: 2000.50, discount: 0.15, birthday: '1987-06-25T00:00:00.000Z', registerDate: '2023-03-22T12:30:30.000Z' },
  { id: 3, username: 'Jane Smith', email: 'jane.smith@outlook.com', phone: '+1 555-234-5678', age: 41, balance: 1320.75, discount: 0.12, birthday: '1980-11-11T00:00:00.000Z', registerDate: '2023-06-12T12:30:30.000Z' },
  { id: 4, username: 'Bob White', email: 'bob.white@hotmail.com', phone: '+1 555-345-6789', age: 28, balance: 850.34, discount: 0.20, birthday: '1993-02-18T00:00:00.000Z', registerDate: '2023-09-23T12:30:30.000Z' },
  { id: 5, username: 'Charlie Black', email: 'charlie.black@gmail.com', phone: '+1 555-456-7890', age: 36, balance: 1550.60, discount: 0.25, birthday: '1985-08-22T00:00:00.000Z', registerDate: '2023-12-01T12:30:30.000Z' },
  { id: 6, username: 'David Green', email: 'david.green@yahoo.com', phone: '+1 555-567-8901', age: 24, balance: 450.12, discount: 0.10, birthday: '1997-01-30T00:00:00.000Z', registerDate: '2023-04-10T12:30:30.000Z' },
  { id: 7, username: 'Emily Blue', email: 'emily.blue@outlook.com', phone: '+1 555-678-9012', age: 32, balance: 1200.20, discount: 0.05, birthday: '1989-07-04T00:00:00.000Z', registerDate: '2023-02-14T12:30:30.000Z' },
  { id: 8, username: 'Fiona Yellow', email: 'fiona.yellow@hotmail.com', phone: '+1 555-789-0123', age: 41, balance: 330.75, discount: 0.30, birthday: '1980-10-11T00:00:00.000Z', registerDate: '2023-08-17T12:30:30.000Z' },
  { id: 9, username: 'George Gray', email: 'george.gray@gmail.com', phone: '+1 555-890-1234', age: 39, balance: 980.40, discount: 0.12, birthday: '1982-03-13T00:00:00.000Z', registerDate: '2023-07-15T12:30:30.000Z' },
  { id: 10, username: 'Hannah Pink', email: 'hannah.pink@yahoo.com', phone: '+1 555-901-2345', age: 26, balance: 200.10, discount: 0.18, birthday: '1995-09-22T00:00:00.000Z', registerDate: '2023-10-20T12:30:30.000Z' },
  { id: 11, username: 'Ivy Gold', email: 'ivy.gold@outlook.com', phone: '+1 555-012-3456', age: 38, balance: 1750.30, discount: 0.07, birthday: '1983-04-10T00:00:00.000Z', registerDate: '2023-01-28T12:30:30.000Z' },
  { id: 12, username: 'Jack Red', email: 'jack.red@hotmail.com', phone: '+1 555-123-4567', age: 33, balance: 1400.10, discount: 0.15, birthday: '1988-12-05T00:00:00.000Z', registerDate: '2023-05-17T12:30:30.000Z' },
  { id: 13, username: 'Kara Purple', email: 'kara.purple@gmail.com', phone: '+1 555-234-5678', age: 27, balance: 680.80, discount: 0.25, birthday: '1994-11-03T00:00:00.000Z', registerDate: '2023-02-25T12:30:30.000Z' },
  { id: 14, username: 'Liam Brown', email: 'liam.brown@yahoo.com', phone: '+1 555-345-6789', age: 22, balance: 2100.40, discount: 0.20, birthday: '1999-07-12T00:00:00.000Z', registerDate: '2023-08-29T12:30:30.000Z' },
  { id: 15, username: 'Megan Silver', email: 'megan.silver@outlook.com', phone: '+1 555-456-7890', age: 35, balance: 950.25, discount: 0.10, birthday: '1986-03-18T00:00:00.000Z', registerDate: '2023-01-30T12:30:30.000Z' },
  { id: 16, username: 'Nathan Blue', email: 'nathan.blue@hotmail.com', phone: '+1 555-567-8901', age: 29, balance: 320.15, discount: 0.05, birthday: '1992-08-06T00:00:00.000Z', registerDate: '2023-09-12T12:30:30.000Z' },
  { id: 17, username: 'Olivia Green', email: 'olivia.green@gmail.com', phone: '+1 555-678-9012', age: 40, balance: 1250.75, discount: 0.15, birthday: '1981-05-21T00:00:00.000Z', registerDate: '2023-06-07T12:30:30.000Z' },
  { id: 18, username: 'Paul Yellow', email: 'paul.yellow@yahoo.com', phone: '+1 555-789-0123', age: 31, balance: 1300.90, discount: 0.12, birthday: '1990-02-15T00:00:00.000Z', registerDate: '2023-11-30T12:30:30.000Z' },
  { id: 19, username: 'Quinn Orange', email: 'quinn.orange@outlook.com', phone: '+1 555-890-1234', age: 27, balance: 800.30, discount: 0.20, birthday: '1994-01-23T00:00:00.000Z', registerDate: '2023-12-22T12:30:30.000Z' },
  { id: 20, username: 'Riley Violet', email: 'riley.violet@hotmail.com', phone: '+1 555-901-2345', age: 23, balance: 1900.70, discount: 0.08, birthday: '1998-09-11T00:00:00.000Z', registerDate: '2023-04-02T12:30:30.000Z' }
];

const summary = ref({
  id: 'Average',
  age: 30,
  balance: 3000,
  discount: 0.16,
});
const handleSearch = () => {
  console.log(searchData.value);
}
const handleClear = () => {
  console.log(searchData.value);
}
const handleEditRow = (row) => {
  console.log(row);
};
const handleDeleteRow = (row) => {
  console.log(row);
};
</script>