const socket = io();

let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function 한국어집어넣기(한국어번역) {
  document.getElementById("translated").innerHTML = 한국어번역;
}

// 메세지를 주는 함수
const message = async (fin_text, interim, isfinal) => {
  let text = `${fin_text || interim}`;
  document.getElementById("script").innerHTML = text;
  if (isfinal) {
    socket.emit("german", fin_text, 한국어집어넣기);
  }
};

// 브라우저 체킹 함수
function checkCompatibility() {
  if (!recognition) {
    document.getElementById("available").innerHTML =
      "Розпізнавання голосу не працює. Будь ласка, дозвольте запис.";
  } else {
    document.getElementById("available").innerHTML =
      "Можливе розпізнавання голосу.";
  }
}
//  끝나는 이벤트에 대한 핸들러
function onend(e) {
  recognition.start();
}
//  결과값 이벤트 핸들러
function onresult(event) {
  let fin_text = "";
  let interim = "";
  let isfinal = false;
  // console.log(event.results.length)
  // console.log(event.results)
  // console.log(event.results.transcript)

  for (let i = 0; i < event.results.length; i++) {
    let res = event.results[i];
    let trans = res[0].transcript;
    if (res.isFinal) {
      fin_text += trans;
      isfinal = true;
    } else {
      interim += trans;
    }
  }
  message(fin_text.trim(), interim.trim(), isfinal);
}

function onstart(e) {
  checkCompatibility();
}

// 기본적인 음성인식 설정
recognition.lang = "uk-UA";
recognition.continuous = false;
recognition.interimResults = true;
recognition.maxAlternatives = 10000;
recognition.onresult = onresult;
recognition.onend = onend;
recognition.onstart = onstart;
recognition.start();
