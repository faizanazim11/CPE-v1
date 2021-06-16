if (sessionStorage.getItem("active") == null)
  location.href = "/index.html";

function logout() {
  sessionStorage.clear();
  location.href = "/index.html";
}

function anim(ele, deg) {
  let counter = 0;
  setInterval(() => {
    if (counter == deg) {
      clearInterval();
    } else {
      counter += 1;
      ele.style.transform = "rotate(" + counter + "deg)";
    }
  }, 5);
}

function caldeg(per, course) {
  var deg = Math.floor((per * 360) / 100);
  var left;
  var right;
  if (deg > 180) {
    left = 180;
    right = deg - 180;
  } else {
    left = deg;
    right = 0;
  }
  if (course == "C") {
    anim(document.getElementById('c-left'), left);
    setTimeout(anim, 900, document.getElementById('c-right'), right);
  } else if (course == "DS") {
    anim(document.getElementById('ds-left'), left);
    setTimeout(anim, 900, document.getElementById('ds-right'), right);
  } else if (course == "J") {
    anim(document.getElementById('j-left'), left);
    setTimeout(anim, 900, document.getElementById('j-right'), right);
  }

}
var xmlhttp = new XMLHttpRequest();
// var email = "jyoti.naik.j1@gmail.com";
// var email = "faizanazim11@gmail.com";
// var email = "ffaizan57@yahoo.in";
var email = sessionStorage.getItem("email");
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var rows = JSON.parse(this.responseText);
    document.getElementById('name').innerHTML = rows['name'];
    document.getElementById('email').innerHTML = email;
    if (rows['prof_pic'] == null)
      document.getElementById('pic').src = "/IMAGE/USR_IMG/default.jpg";
    else
      document.getElementById('pic').src = rows['prof_pic'];
    document.getElementById('c-score').innerHTML = rows['c_score'];
    document.getElementById('ds-score').innerHTML = rows['ds_score'];
    document.getElementById('j-score').innerHTML = rows['java_score'];
    document.getElementById('numb1').innerHTML = rows['ccp'] + "%";
    document.getElementById('numb2').innerHTML = rows['dscp'] + "%";
    document.getElementById('numb3').innerHTML = rows['jcp'] + "%";
    caldeg(rows['ccp'], "C");
    caldeg(rows['dscp'], "DS");
    caldeg(rows['jcp'], "J");
  }
}
xmlhttp.open("GET", "/PHP/home_data.php?email=" + email, true);
xmlhttp.send();