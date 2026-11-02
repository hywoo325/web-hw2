# 실습과제 #2 : 영화 데이터를 자바스크립트로

- 이름 / 학번 :
- 사이트 주소 : https://아이디.github.io/web-hw2/
- 사용한 API : TMDB (영화 정보, now_playing 응답), KOBIS 일별 박스오피스 (기준일 YYYY-MM-DD)


## 구현 항목 체크

1. [x] Part A의 A1~A5
1. [x] Part B 함수 7개
1. [x] Part C의 C1~C4
1. [x] 출력 (console-a.png, console-c.png, 요약 3줄 한 번 주입)
1. [x] 코드 품질 (함수 주석, var 미사용, 원본 유지, 함수 재사용, 좋은 이름)
1. [x] 제출 형식

- [x] `reduce`로 평균
- [x] 요일 표시
- [x] `fetch`로 JSON 읽기


## 자가 테스트 표 (2~8번도 Step 4의 표대로 이어 적기)

| 번호 | 호출 | 기대 결과 | 실제 결과 |
|---|---|---|---|
| 1 | formatNumber("1234567") | '1,234,567' | '1234567' (문자열은 그대로?) |
| 2 | average(movies).toFixed(1) | '7.1' | '7.2' (추측은 내림했으나 toFixed가 반올림인 것으로 추정) |
| 3 | best(movies).title | '오디세이' | '오디세이' |
| 4 | sortBy(movies, "rating", true)[0].title | '오디세이' | '오디세이' |
| 5 | filterByRating(movies, 8).length | 0 | 0 |
| 6 | search(movies, " 인터 ").length | 0 | 0 |
| 7 | yearsSince("2014-11-06") | 12 | 12 |
| 8 | movies[0].title | 미스 페레그린과 이상한 아이들의 집 | 미스 페레그린과 이상한 아이들의 집 |


## 어려웠던 점 3가지와 해결

- filter의 사용법을 몰라 알아보게 되었다.
- 인덱스를 통한 반복문이 비효율적이라 생각되어 다른 방법을 알아보게 되었다.
- 변수를 통한 object 접근은 .이 아니라 대괄호를 사용해야 한다는 것을 되새겼다.


## 참고한 자료 (교재 절, MDN 페이지 제목, 검색어)


## 생성형 AI 사용 내역 (없으면 "없음")

> Q(uestion), A(nswer), T(hink)

Q: `filter`를 사용하여 배열 요소의 조건을 기준으로 요소 걸러내기

A:
```js
const evens = numbers.filter(num => num % 2 === 0);
```

T:
람다를 응용하여 객체에 접근 가능하도록 변형.

---

Q: python의 for i in list처럼 쓸 수 있는지

A:
```js
for (const fruit of fruits) {};

fruits.forEach((fruit, index) => {});
```

`for...in`은 문자열 인덱스를 가져오므로 권장하지 않음.

T: 인덱스가 필요할 때만 `forEach`를 쓰고, 이외는 `for...of`를 쓰기로 함.

---

Q: `Date.getFullYear()`가 함수가 아니라고 뜸

A: `Date`를 인스턴스화 후 사용해야 함.

```js
const today = new Date();
console.log(today.getFullYear()); // 2026
```

T: 한 줄로 압축해서 사용.

---

Q: Array.reduce?

A: reduce는 배열을 긁어 하나의 값으로 압축해주는 메서드다. 
```js
const result = array.reduce((accumulator, currentValue, index, array) => {
    // 여기서 무언가를 계산해서 리턴하면, 그게 다음 번의 accumulator가 됨
    return nextAccumulator;
}, initialValue);
```
보통은 accumulator(누적)와 currentValue, initialValue만 잘 설정해주면 된다.

T: 형태를 적용 후 cur이 list의 요소가 되므로 averageBy의 경우 key로 접근
