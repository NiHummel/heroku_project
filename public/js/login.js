let preAuth = {};

async function login() {
  let email_input = "";
  email_input = document.getElementById("email_input").value;
  if (email_input === "")
    return
  await fetch(`auth/signup/email/exists?email=${email_input}`, {
    method: "GET",
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'}
  }).then(function(response){
    response.json().then(async function(data) {
      if (data.status !== "OK") {
        console.log(data);
        document.getElementById("login_error").innerHTML = data.formFields[0].error;
        document.getElementById("login_error").style.display = "block";
      } else {
        document.getElementById("login_error").style.display = "none";
        document.getElementById("email_input").readOnly = true;
        document.getElementById("login-button").style.display = "none";
        while (preAuth['status'] !== 'OK')
          await fetch("/auth/signinup/code", {
            method: "POST",
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            },
            body: `{
              "email": "${email_input}"
            }`
          }).then(async function(res) {
            preAuth = await res.json()
          })
        document.getElementById("login-button").style.display = "none";
        document.getElementById("sign_in-button").style.display = "block";
        if (!data.exists) {
          document.getElementById("nickname_input").requered = true;
          document.querySelectorAll(".newbie").forEach(e => e.style.display = "block");
        }
        document.getElementById("otp_input").requered = true;
        document.querySelectorAll(".otp").forEach(e => e.style.display = "block");
      }
    })
  })
}

async function sign_in() {
  let email_input = "";
  email_input = document.getElementById("email_input").value;
  let nickname_input = "";
  nickname_input = document.getElementById("nickname_input").value;
  let otp_input = "";
  otp_input = document.getElementById("otp_input").value;
  if (otp_input === "")
    return

  await fetch("/auth/signinup/code/consume", {
    method: "POST",
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    body: `{
            "deviceId": "${preAuth.deviceId}",
            "preAuthSessionId": "${preAuth.preAuthSessionId}",
            "userInputCode": "${otp_input}"
          }`
  }).then(function(response) {
    response.json().then(async function(data) {
      if (data.status !== "OK") {
        console.log(data);
        document.getElementById("login_error").innerHTML = data.status;
        document.getElementById("login_error").style.display = "block";
      } else {
        document.getElementById("login_error").style.display = "none";
          await fetch("/login", {
            method: "POST",
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            },
            body: `{
            "name": "${nickname_input}",
            "email": "${email_input}"
          }`
          })
        if (nickname_input !== '')
        await fetch("/user", {
            method: "POST",
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            },
            body: "{}"
          })
        location.reload()
      }
    })
  })
}

async function tryLoginOrOpenForm() {
  let response = await fetch("/login", {
    method: "POST",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json"
    },
    body: '{"name":"","email":""}'
  })
  if (response.ok) {
    location.reload();
    return false
  }
  return openForm()
}

function openForm() {
  document.getElementById("signForm").style.display = "block";
  return false;
}
function closeForm() {
  location.reload()
}

const loginButton = document.getElementById("login-button");
if (loginButton)
  loginButton.addEventListener("click", function (event) {
    login()
  });

const signInButton = document.getElementById("sign_in-button");
signInButton.style.display = "none"
if (signInButton)
  signInButton.addEventListener("click", function (event) {
    sign_in()
  });