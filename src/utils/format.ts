// 전화번호 010-0000-0000 형태로 자동 포맷팅
export const formatPhoneNumber = (value: string) => {
  const onlyNumbers = value.replace(/[^0-9]/g, "");
  if (onlyNumbers.length <= 3) {
    return onlyNumbers;
  }
  if (onlyNumbers.length <= 7) {
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
  }
  return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
};
