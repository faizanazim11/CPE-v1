if (sessionStorage.getItem("active") == "y")
    location.href = "/home.html";

function login(em, pd, btn) {
    if (btn.classList.contains('disabled'))
        return;
    var xmlhttp = new XMLHttpRequest();
    const FDL = new FormData();
    FDL.append("email", em);
    FDL.append("password", pd);
    FDL.append("fun", 1);
    var b = true;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ret = JSON.parse(this.responseText);
            if (ret['res'] == 2) {
                b = true;
                sessionStorage.setItem("email", em);
                sessionStorage.setItem("active", "y");
            } else {
                b = false;
            }
        }
    }
    xmlhttp.open("POST", "/PHP/auth.php", false);
    xmlhttp.send(FDL);
    if (b)
        return;
    else
        validate(em);
}

function validate(em) {
    var xmlhttp = new XMLHttpRequest();
    const VAL = new FormData();
    VAL.append("email", em);
    VAL.append("fun", 2);
    var valstr = prompt("Account not verified!\nEnter code in mail:");
    VAL.append("auth", valstr);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    }
    xmlhttp.open("POST", "/PHP/auth.php");
    xmlhttp.send(VAL);
}

function actbtn(em, pd, btn) {
    var email = em.value.replace(/\s+/g, '');
    var pass = pd.value.replace(/\s+/g, '');
    if (email == "" || pass == "") {
        if (btn.classList.contains("disabled"))
            return;
        else {
            btn.classList.add("disabled");
            return;
        }
    } else {
        btn.classList.remove("disabled");
        return;
    }

}

function signup(nm, em, pd, rpd) {
    if (document.getElementById('signupbtn').classList.contains('disabled'))
        return;
    const xmlhttp = new XMLHttpRequest();
    const FD = new FormData();
    FD.append("fun", 2);
    FD.append("name", document.getElementById("fullname").value);
    FD.append("email", document.getElementById("emailSignup").value);
    FD.append("password", document.getElementById("passwordSignup").value);

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    }
    xmlhttp.open("POST", "/PHP/reg.php", false);
    xmlhttp.send(FD);
    return;
}

function chkpass() {
    var pass = document.getElementById("passwordSignup").value.replace(/\s+/g, '');
    var repass = document.getElementById("repasswordSignup").value.replace(/\s+/g, '');
    if (pass == "" || repass == "") {
        return;
    } else if (pass != repass) {
        document.getElementById("error-pass").innerHTML = "Passwords do not match!";
        return true;
    } else {
        document.getElementById("error-pass").innerHTML = "";
        return false;
    }
}

function chkdisable() {
    if (document.getElementById("signupbtn").classList.contains("disabled"))
        return;
    else {
        document.getElementById("signupbtn").classList.add("disabled");
        return;
    }
}

function enablesignup() {
    var name = document.getElementById("fullname").value.replace(/\s+/g, '');
    var email = document.getElementById("emailSignup").value.replace(/\s+/g, '');
    var pass = document.getElementById("passwordSignup").value.replace(/\s+/g, '');
    var repass = document.getElementById("repasswordSignup").value.replace(/\s+/g, '');
    if (name == "" || email == "" || pass == "" || repass == "" || chkpass() || chkmail())
        if (document.getElementById("signupbtn").classList.contains("disabled"))
            return;
        else {
            document.getElementById("signupbtn").classList.add("disabled");
            return;
        }
    else {
        document.getElementById("signupbtn").classList.remove("disabled");
        return;
    }
}

function chkmail() {
    var email = document.getElementById("emailSignup").value.replace(/\s+/g, '');
    if (email == "")
        chkdisable();
    else {
        const xmlhttp = new XMLHttpRequest();
        const FDMC = new FormData();
        FDMC.append("email", email);
        FDMC.append("fun", 1);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (JSON.parse(this.responseText)) {
                    document.getElementById('error-email').innerHTML = "Email already registered!";
                    chkdisable();
                } else {
                    document.getElementById('error-email').innerHTML = "";
                }
            }
        }
        xmlhttp.open("POST", "/PHP/reg.php");
        xmlhttp.send(FDMC);
    }
}