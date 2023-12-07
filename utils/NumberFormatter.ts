import numeral from 'numeral';

const thousandAndDecimalSeparator = (
  value: number | string,
  maxDecimal = 2,
) => {
  const splitNumber = value?.toString().split('.');
  const number = numeral(Number(value));
  const totalDecimal = splitNumber?.[1]?.length ?? 0;
  if (totalDecimal > 0) {
    const decimal = Array(
      totalDecimal < maxDecimal ? totalDecimal : maxDecimal,
    ).fill(0);
    return number.format(`0,0.${decimal.join('')}`);
  }
  return number.format('0,0');
};

export default thousandAndDecimalSeparator;

export function isNumeric(value?: number | string) {
  if (value === null) return false;
  return !Number.isNaN(Number(value));
}

export function formatNumberWithAbbreviation(value: number | string) {
  const number = numeral(Number(value));
  return number.format('0a');
}

export function formatTableDataNumber(value: number) {
  return isNumeric(value) ? thousandAndDecimalSeparator(value) : '-';
}

export function formatTimer(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}
