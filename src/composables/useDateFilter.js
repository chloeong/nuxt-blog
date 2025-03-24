export const useDateFilter = () => {
  const { $dayjs } = useNuxtApp();

  const isDateAfterToday = (value) => {
    const today = $dayjs();
    return $dayjs(value).isBefore(today);
  };

  const isDateBefore30Days = (value) => {
    const thirtyDaysAgo = $dayjs().subtract(30, 'day');
    return $dayjs(value).isSameOrAfter(thirtyDaysAgo);
  };

  return {
    isDateAfterToday,
    isDateBefore30Days,
  };
}