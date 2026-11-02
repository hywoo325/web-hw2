// Part A ===============

// A1
let sumA = 0;
let avgA = 0;
for (let i = 0; i < ratings.length; i++) {
	sumA += ratings[i];
}
avgA = sumA / ratings.length;
console.log(`A1 평균 평점: ${avgA}`);

// A2
let maxIdxA = 0;
for (let i = 0; i < ratings.length; i++) {
	if (ratings[maxIdxA] < ratings[i]) {
		maxIdxA = i;
	}
}
console.log(`A2 최고 평점: ${titles[maxIdxA]} ${ratings[maxIdxA]}`);

// A3
let bestsA = 0;
for (let i = 0; i < ratings.length; i++) {
	if (8 <= ratings[i]) {
		bestsA++;
	}
}
console.log(`A3 8점 이상: ${bestsA}편`);

// A4
let movieByYearsA = [0, 0, 0, 0];
for (let i = 0; i < years.length; i++) {
	const decade = years[i] - (years[i] % 10);
	switch (decade) {
		case 2020:
			movieByYearsA[0]++;
			break;

		case 2010:
			movieByYearsA[1]++;
			break;

		case 2000:
			movieByYearsA[2]++;
			break;

		default:
			movieByYearsA[3]++;
			break;
	}
}
console.log(`A4 2020년대 ${movieByYearsA[0]}편, 2010년대 ${movieByYearsA[1]}편, 2000년대 ${movieByYearsA[2]}편, 그 이전 ${movieByYearsA[3]}편`);

// A5
let hundredMoviesA = "";
for (let i = 0; i < audiences.length; i++) {
	if (1000000 <= audiences[i]) {
		if (hundredMoviesA !== "") {
			hundredMoviesA += ", ";
		}

		hundredMoviesA += titles[i];
	}
}
console.log(`A5 관객 100만 이상: ${hundredMoviesA === "" ? "없음" : hundredMoviesA}`);


// Part B ===========================

/** average : list => rating average */
function average(list) {
	return averageBy(list, "rating");
}

/** best : list => object of highest rating */
function best(list) {
	let maxIdx = 0;
	for (let i = 0; i < list.length; i++) {
		if (list[maxIdx].rating < list[i].rating) {
			maxIdx = i;
		}
	}

	return list[maxIdx];
}

/** filterByRating : list, min => filtered array */
function filterByRating(list, min) {
	return list.filter((item) => min < item.rating);
}

/** sortBy : list, key, descending => sorted array */
function sortBy(list, key, desc) {
	const sign = desc ? -1 : 1;

	return [...list].sort(function(a, b) {
		if (typeof a[key] === "string") {
			return a[key].localeCompare(b[key]) * sign;
		} else {
			return (a[key] - b[key]) * sign;
		}
	});
}

/** search : list, keyword => filtered array */
function search(list, keyword) {
	const finalKeyword = keyword.trim().toLowerCase();

	return list.filter(function(item) {
		return item.title.toLowerCase().includes(finalKeyword);
	});
}

/** formatNumber : number => comma-applied pretty number */
function formatNumber(num) {
	return num.toLocaleString("ko-KR")
}

/** yearsSince : dateString => elapsed year number */
function yearsSince(dateStr) {
	return new Date().getFullYear() - Number(dateStr.split("-")[0]);
}

const bestMovieB = best(movies);
const sortedMovieB = sortBy(movies, "audience", true)[0];

// 교재에서 ``로 줄바꿈도 가능하다고 보아 이걸 사용하기로 했습니다.
document.getElementById("out").textContent =
`전체 ${movies.length}편, 평균 평점 ${average(movies).toFixed(1)}점
최고 평점 ${bestMovieB.title} (${bestMovieB.rating}점, 개봉한 지 ${yearsSince(bestMovieB.date)}년)
관객 1위 ${sortedMovieB.title} (누적 ${formatNumber(sortedMovieB.audience)}명)`;


// Part C ==========================

function getList(data) {
	return data.results;
}

function averageBy(list, key) {
	return list.reduce((acc, cur) => acc + cur[key], 0) / list.length;
}

console.log(`C1 page ${TMDB.page}, total_pages ${TMDB.total_pages}, total_results ${TMDB.total_results}, count ${getList(TMDB).length}`);
console.log(`C2 상영작 평균 평점 ${averageBy(getList(TMDB), "vote_average").toFixed(1)}점`);
console.table(sortBy(getList(TMDB), "vote_average", true).slice(0, 5), ["title", "release_date", "vote_average"]);
console.log(`C4 "어벤져스"로 검색한 결과의 개수: ${search(getList(TMDB), "어벤져스").length}`)


// Bonus

function formatDate(dateStr) {
	let date = new Date(dateStr);
	let yoil = ["일", "월", "화", "수", "목", "금", "토"];
	let result = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${yoil[date.getDay()]})`;

	return result;
}

// loadJson : tmdb.json 파일 ⇒ 콘솔에 평점 상위 5편 표(13주차 fetch 미리 보기)
async function loadJson() {
	const res = await fetch("tmdb.json");
	const data = await res.json();
	console.table(sortBy(getList(data), "vote_average", true).slice(0, 5), ["title", "vote_average"]);
}
loadJson()
