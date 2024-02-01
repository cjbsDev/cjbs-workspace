export const geKoreanNumber = (number: number) => {
  const koreanNumber = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const tenUnit = ['', '십', '백', '천'];
  const tenThousandUnit = ['조', '억', '만', ''];
  const unit = 10000;

  let answer = '';

  while (number > 0) {
    const mod = number % unit;
    const modToArray = mod.toString().split('');
    const length = modToArray.length - 1;

    const modToKorean = modToArray.reduce((acc, value, index) => {
      const valueToNumber = +value;
      if (!valueToNumber) return acc;
      // 단위가 십 이상인 '일'글자는 출력하지 않는다. ex) 일십 -> 십
      const numberToKorean = index < length && valueToNumber === 1 ? '' : koreanNumber[valueToNumber];
      return `${acc}${numberToKorean}${tenUnit[length - index]}`;
    }, '');

    answer = `${modToKorean}${tenThousandUnit.pop()} ${answer}`;
    number = Math.floor(number / unit);
  }

  return answer;
};
