// HTML 파일에서 result ID값 선택
const $result = document.querySelector("#result");
// <br> Element 생성
const $br = document.createElement("br");
// timer 설정을 위한 변수 선언
let timer = 0;

/**
 * @returns 정렬된 6개의 Lotto 번호
 */
const LottoSelect = () => {
  let shuffle = [];

  //candidate 배열에 1 ~ 45 저장
  const candidate = Array.from({ length: 45 }, (_, index) => index + 1);

  // candidate 배열에서 무작위 숫자를 뽑아 shuffleArray 저장(숫자 섞기)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (2 ** 32) * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffleArray(candidate);

  // Lotto 번호 6개 뽑아 오름차순 정렬
  return candidate.slice(0, 6).sort((a, b) => a - b);

};

/**
 *
 * @param {*lotto 번호} number
 * @param {*html 태그} $tag
 */
const colorize = (number, $tag) => {
  if (number <= 10) {
    $tag.style.backgroundColor = "#F2B720";
  } else if (number <= 20) {
    $tag.style.backgroundColor = "#4072AC";
  } else if (number <= 30) {
    $tag.style.backgroundColor = "#DD4C0E";
  } else if (number <= 40) {
    $tag.style.backgroundColor = "#9195A4";
  } else {
    $tag.style.backgroundColor = "#13BE4B";
  }
};

/**
 * 타이머 설정하여 Lotto 번호 5번 뽑기
 * 뽑은 Lotto 번호 화면에 출력
 */
for (let i = 0; i < 5; i++) {
  const lotto = LottoSelect();
  for (let i = 0; i < lotto.length; i++) {
    setTimeout(() => {
      const $ball = document.createElement("div");
      $ball.setAttribute("class", "ball");
      $ball.innerHTML = lotto[i];
      $result.appendChild($ball);
      colorize(lotto[i], $ball);
      if (i === 5) {
        $result.appendChild($br);
        $result.innerHTML += "<br>";
      }
    }, (timer += 100));
  }
}
