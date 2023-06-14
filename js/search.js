document.getElementById("search_btn").addEventListener('click', search_message);

var search_array = []; // 빈 배열 – 전역 변수

function search_message(){
    let search_str = document.querySelector("#search_txt").value; // 변수에 저장

    if(search_str.length === 0){
        alert("검색어가 비었습니다. 입력해주세요"); 
    }
    else{
        if (no_str(search_str)) {
            alert(`${search_str}는 검색어로 적절하지 않습니다.`);
        } else {
            alert("검색을 수행합니다!");
			
			 // 배열의 개수가 10개를 넘으면 맨 앞의 값을 삭제
            if (search_array.length >= 10) {
                search_array.shift();
            }
			
            search_array.push(search_str); // 배열에 검색어 추가
            let text = document.getElementById("search_message").innerHTML =  search_array.toString(); // 값 변환
            document.querySelector("#form_main").submit();
        }
    }
}

function no_str(searchQuery) {
    const bannedWords = ['씨발', '병신', '지랄'];  // 비속어 목록

    for (let i = 0; i < bannedWords.length; i++) {
        const bannedWord = bannedWords[i];

        if (searchQuery.includes(bannedWord)) {
            return true;
        }
    }

    return false;
}

  /* document.getElementById("search_message").innerHTML = search_str.value; // 태그에 값 추가
   console.log(search_str.value); // 콘솔에 출력 */

