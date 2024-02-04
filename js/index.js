const emailinput = document.getElementById('emailinput');
const passwordinput = document.getElementById('passwordinput');
const logInBtn = document.getElementById('logInBtn');
const reg = document.getElementById('reg');
const createacc = document.getElementById('createacc');
const notmember = document.getElementById('notmember');
const formData = document.querySelector('form');
let isValid = false;

formData.addEventListener('submit', function (eventInfo) {
    eventInfo.preventDefault();
    if (isValid) {
      setForm()   
    }
    
}) 
formData.addEventListener('input', function () {
    if (emailValidation() && passwordValidation()) {
        isValid = true;
        console.log("gammmedd");
    } else {
        console.log('msh tmam');
        isValid = false;
    }

}) 

function setForm() {
    const user = {
        email: emailinput.value,
        password: passwordinput.value,
    }
    console.log(user);
    login(user)
}

async function login(user) {
    const api = await fetch(`https://movies-api.routemisr.com/signin`, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    })
    const response = await api.json();
    console.log(response);
    if (response.message === "success"){
        localStorage.setItem("userToken", response.token);
        console.log("gammmed");
        location.href = "./home.html";
    } else {
        notmember.classList.remove("d-flex");
        notmember.classList.add("d-none");
        document.getElementById("msg").innerHTML = response.message;
    }
}

function emailValidation() {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if (emailRegex.test(emailinput.value)) {
        emailinput.classList.remove('is-invalid');
        emailinput.classList.add('is-valid');
      return true;
    }
    else {
         emailinput.classList.remove('is-valid');
        emailinput.classList.add('is-invalid'); 
    }
}
function passwordValidation() {
    const passwordRegex = /^[a-z0-9!#$%&'*+=?^_`{|}~-]/
    if (passwordRegex.test(passwordinput.value)) {
        passwordinput.classList.remove('is-invalid');
        passwordinput.classList.add('is-valid');
      return true;
    }
    else {
        passwordinput.classList.remove('is-valid');
       passwordinput.classList.add('is-invalid'); 
    }
}
document.querySelector(".regBtn").addEventListener("click", function () {
    location.href="./register.html"
})
