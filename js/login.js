function login_count() {
    let loginCnt = getCookie("login_cnt"); // 이전 로그인 횟수를 가져옴
    let count = loginCnt ? parseInt(loginCnt) + 1 : 1; // 이전 횟수가 있으면 1을 더하고, 없으면 1로 초기화

    setCookie("login_cnt", count, 7); // 로그인 횟수를 7일간 유지하는 쿠키로 저장

    // 로그인 횟수 출력 또는 필요한 작업 수행
    alert("로그인 횟수: " + count);
}

function logout_count() {
    let logoutCnt = getCookie("logout_cnt"); // 이전 로그아웃 횟수를 가져옴
    let count = logoutCnt ? parseInt(logoutCnt) + 1 : 1; // 이전 횟수가 있으면 1을 더하고, 없으면 1로 초기화

    setCookie("logout_cnt", count, 7); // 로그아웃 횟수를 7일간 유지하는 쿠키로 저장

    // 로그아웃 횟수 출력 또는 필요한 작업 수행
    alert("로그아웃 횟수: " + count);
}

function login_check(id, password) {
    const emailRegex =/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;  
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
  
	if (checkLoginLimit()) {
        return false; // 로그인 제한
    }

    return true; // 로그인 허용

    if (!emailRegex.test(id)) {
        alert("유효한 이메일 주소를 입력해주세요.");
        return false;
    }
  
    if (!passwordRegex.test(password)) {
        alert("유효한 패스워드를 입력해주세요.");
        return false;
    }
  
    return true;
}

function login(){
    //event.preventDefault(); // 폼 제출 기본 동작 방지
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");
    
    form.action = "../index_login.html";
    form.method = "get";
	
	if(check.checked){ // 아이디 체크 o
        alert("쿠키를 저장합니다.");
        setCookie("id", id.value, 1); // 1일 동안 쿠키 저장
        alert("쿠키 값: " + id.value);
    } else { // 아이디 체크 x
        deleteCookie("id"); // 쿠키 삭제
    }
}
	
	// 로그인 시도 실패 횟수를 카운팅하는 함수
function incrementLoginFailCount() {
    let loginFailCnt = getCookie("login_fail_cnt"); // 이전 로그인 실패 횟수를 가져옴
    let count = loginFailCnt ? parseInt(loginFailCnt) + 1 : 1; // 이전 횟수가 있으면 1을 더하고, 없으면 1로 초기화

    setCookie("login_fail_cnt", count, 7); // 로그인 실패 횟수를 7일간 유지하는 쿠키로 저장

    return count;
}

// 로그인 시도 실패 횟수를 확인하여 제한하는 함수
function checkLoginLimit() {
    let loginFailCnt = getCookie("login_fail_cnt"); // 로그인 실패 횟수를 가져옴
    let maxAttempts = 3; // 로그인 실패 제한 횟수

    if (loginFailCnt && parseInt(loginFailCnt) >= maxAttempts) {
        alert("로그인 시도 횟수가 제한을 초과했습니다. 잠시 후에 다시 시도해주세요.");
        return true; // 로그인 제한
    }

    return false; // 로그인 제한 없음s
	
    if(id.value.length === 0 || password.value.length === 0){
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    }else{
        if (login_check(id.value, password.value)) {
        session_set(); // 세션 생성

        setTimeout(function() { // 5분 후에 자동 로그아웃
            logout();
        }, 5 * 60 * 1000); // 5분을 밀리초로 변환하여 설정

        form.submit();
    } else {
        incrementLoginFailCount(); // 로그인 실패 횟수 증가
    }
}
}


// 쿠키 가져오기
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// 쿠키 설정
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// 쿠키 삭제
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}




function logout(){
    session_del(); // 세션 삭제
    location.href = '../index.html';
}

function get_id(){
    if(getParameters('id')){
        decrypt_text();
    }else{
        var getParameters = function(paramName){ // 변수 = 함수(이름)
            var returnValue; // 리턴값을 위한 변수 선언
            var url = location.href; // 현재 접속 중인 주소 정보 저장
            var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
            for(var i = 0; i < parameters.length; i++) { 
                var varName = parameters[i].split('=')[0];
                
                if (varName.toUpperCase() == paramName.toUpperCase()) {
                    returnValue = parameters[i].split('=')[1];
                    return decodeURIComponent(returnValue);
                    // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
                }
            } // 2중 for문 끝
        }; // 함수 끝
        alert(getParameters('id') + '님 방갑습니다!'); // 메시지 창 출력
    }                      
}

function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "=; expires=" + expireDate.toGMTString();
}

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
    
    if(get_id) { 
        id.value = get_id; 
        check.checked = true; 
    }
    session_check(); // 세션 유무 검사
}

function session_set() { // 세션 저장
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    if (sessionStorage) {
        let en_text = encrypt_text(password.value);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    } else {
        alert("로컬 스토리지 지원 x");
    }
}

function session_get() { // 세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_encrypted");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() { // 세션 검사
    if (sessionStorage.getItem("Session_Storage_encrypted")) {
        alert("이미 로그인되었습니다.");
        location.href = 'index_login.html'; // 로그인된 페이지로 이동
    }
}

function session_del() { // 세션 삭제
	// Check if the sessionStorage object exists
    if (sessionStorage) {
		// Retrieve data
        sessionStorage.removeItem("Session_Storage_encrypted");
        alert('로그아웃 버튼 클릭 확인: 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = decodeByAES256(rk, eb);
    console.log(b); 
}
