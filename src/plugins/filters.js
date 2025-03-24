import BigNumber from 'bignumber.js';

export default defineNuxtPlugin((nuxtApp) => {
  const { $dayjs } = useNuxtApp();
  nuxtApp.provide('filters', {
    amount(value) {
      let parseValue = value ? new BigNumber(value.toString()) : new BigNumber('0');
      parseValue = parseValue.toFixed(2, BigNumber.ROUND_HALF_UP);
      const aIntNum = parseValue.toString().split('.');
      let iIntPart = aIntNum[0];
      const iFlootPart = aIntNum.length > 1 ? `.${aIntNum[1]}` : '';
      const rgx = /(\d+)(\d{3})/;

      if (iIntPart.length >= 4) {
        while (rgx.test(iIntPart)) { iIntPart = iIntPart.replace(rgx, '$1,$2'); }
      }
      parseValue = iIntPart + iFlootPart;
      return parseValue;
    },
    number(value) {
      const aIntNum = value ? value.toString().split('.') : '0';
      let iIntPart = aIntNum[0];
      const iFlootPart = aIntNum.length > 1 ? `.${aIntNum[1]}` : '';
      const rgx = /(\d+)(\d{3})/;

      if (iIntPart.length >= 4) {
        while (rgx.test(iIntPart)) { iIntPart = iIntPart.replace(rgx, '$1,$2'); }
      }
      return iIntPart + iFlootPart;
    },
    percent(value) {
      const val = value ? new BigNumber(value.toString()) : new BigNumber('0');
      let parseValue = val.lt(1) ? val.times(100).toFixed(0) : val.toFixed(0);
      return parseValue + '%';
    },
    date(value) {
      return $dayjs(value).format('YYYY/MM/DD');
    },
    dateFull(value) {
      return $dayjs(value).format('YYYY/MM/DD HH:mm:ss');
    },
  });
});