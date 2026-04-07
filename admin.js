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

/*データ送信*/
window.send = function () {
  const number = document.getElementById("number").value;
  const cars = document.getElementById("cars").value;
  const next = document.getElementById("next").value;

  set(ref(db, "train"), {
    number,
    cars,
    next
  });

  alert("送信した！");
};