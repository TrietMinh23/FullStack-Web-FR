export default function formatNumberWithCommas(number) {

  const numberStr = number.toString();

  const [integerPart, decimalPart] = numberStr.split(".");

  const reversedInteger = integerPart.split("").reverse().join("");

  const formattedInteger = reversedInteger
    .match(/.{1,3}/g)
    .join(",")
    .split("")
    .reverse()
    .join("");

  // Kết hợp phần nguyên và phần thập phân (nếu có)
  let formattedNumber = formattedInteger;
  if (decimalPart) {
    formattedNumber += "." + decimalPart;
  }

  return formattedNumber;
}
