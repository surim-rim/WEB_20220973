class SignUp {
  constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdayDate = birthdayDate;
    this.gender = gender;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.classNumber = classNumber;
    this.random = random;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(fullName) {
    const [firstName, lastName] = fullName.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get contactInfo() {
    return `${this.emailAddress} ${this.phoneNumber} ${this.random}`;
  }

  set contactInfo(contactInfo) {
    const [emailAddress, phoneNumber, random] = contactInfo.split(" ");
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.random = random;
  }
}


function session_set(){ //세션 저장(객체)    
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let random = new Date(); // 랜덤 타임스탬프
    
    const obj = { // 객체 선언
    id : id.value,
    otp : random
    }
    
    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}

function session_join_set(){ //세션 저장(객체)    
    let f_name = document.querySelector("#firstName").value;
    let l_name = document.querySelector("#lastName").value;
    let b_day = document.querySelector("#birthdayDate").value;
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress").value;
    let p_number = document.querySelector("#phoneNumber").value;
    let class_check = document.querySelector(".select form-control-lg");
    let random = new Date(); // 랜덤 타임스탬프
    
    const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
    console.log(newSignUp.fullName); // John Doe
    console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890
    
    if (sessionStorage) {
        const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encryted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}

function session_join_get() {
  const storedObject = sessionStorage.getItem("Session_Storage_object");
  const encryptedText = sessionStorage.getItem("Session_Storage_encrypted");

  if (storedObject && encryptedText) {
    const decryptedText = decrypt_text(encryptedText); // 복호화
    const object = JSON.parse(decryptedText); // JSON 문자열 -> 객체 변환
    console.log(object);
  } else {
    console.log("세션 정보 없음");
  }
}

