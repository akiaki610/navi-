import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8UVBcDLJgXDOavx6d0hfH5Tmf9MgPpNI",
  authDomain: "hapinavi-64891.firebaseapp.com",
  databaseURL: "https://hapinavi-64891-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hapinavi-64891",
  storageBucket: "hapinavi-64891.firebasestorage.app",
  messagingSenderId: "642976439239",
  appId: "1:642976439239:web:edeb5ae183f4ad56d857e2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

/*ログイン処理*/
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("ログイン成功！");
    })
    .catch(() => {
      alert("ログイン失敗");
    });
};

/*ログイン状態チェック*/
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("admin-panel").style.display = "block";
  } else {
    document.getElementById("admin-panel").style.display = "none";
  }
});

window.send = function () {

  const number = document.getElementById("number").value;
  const cars = document.getElementById("cars").value;
  const next = document.getElementById("next").value;

  let stations = [];

  for (let i = 0; i < stationCount; i++) {
    const name = document.getElementById(`name-${i}`).value;
    const time = Number(document.getElementById(`time-${i}`).value);

    if (name && !isNaN(time)) {
      stations.push({
        name: name,
        time: time,
        stop: true
      });
    }
  }

  set(ref(db, "train"), {
    number,
    cars,
    next,
    startTime: Math.floor(Date.now() / 1000), // ←これでOK（毎回リセット式）
    stations
  });

  alert("送信した！");
};

let stationCount = 0;

window.addStation = function () {
  const container = document.getElementById("stations");

  const div = document.createElement("div");

  div.innerHTML = `
    <input placeholder="駅名" id="name-${stationCount}">
    <input placeholder="到着秒" id="time-${stationCount}">
    <input placeholder="停車秒" id="stop-${stationCount}">
  `;

  container.appendChild(div);
  stationCount++;
};

window.setType = function(type, type_en, color, font) {
  set(ref(db, "train/type"), type);
  set(ref(db, "train/type_en"), type_en);
  set(ref(db, "train/color"), color);
  set(ref(db, "train/font"), font);
};