const inputs = document.querySelectorAll('input');
const btnRegister = document.querySelectorAll('btn');
const formData = document.querySelector('form');
const login = document.getElementById("login");
let isValid = false;

formData.addEventListener('submit', function (eventInfo) {
    eventInfo.preventDefault();
    if (isValid) {
      setForm()   
    }
    
}) 
formData.addEventListener('input', function () {
    if ( validation(inputs[0])&&
    validation(inputs[1])&&
    emailValidation()&&
    passwordValidation()&&
        ageValidation()) {
        console.log("tmam");
        isValid = true;
    } else {
        console.log('msh tmam');
        isValid = false;
    }

}) 

function setForm() {
    const user = {
        first_name: inputs[0].value,
        last_name: inputs[1].value,
        email: inputs[2].value,
        password: inputs[3].value,
        age: inputs[4].value,
    }
    console.log(user);
    Register(user)
}

async function Register(user) {
    const api = await fetch(`https://movies-api.routemisr.com/signup`, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    })
    const response = await api.json();
    console.log(response);
    if (response.message === 'success') {
          location.href ="./index.html"
    } else {
        document.getElementById("msg").innerHTML = response.message;
    }
}

function validation(input) {
    const nameRegex = /^[a-z]{2,20}$/;
    if (nameRegex.test(input.value)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      return true;
    }
    else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid'); 
    }
}

function emailValidation() {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if (emailRegex.test(inputs[2].value)) {
        inputs[2].classList.remove('is-invalid');
        inputs[2].classList.add('is-valid');
      return true;
    }
    else {
         inputs[2].classList.remove('is-valid');
        inputs[2].classList.add('is-invalid'); 
    }
}
function passwordValidation() {
    const passwordRegex = /^[a-z0-9!#$%&'*+=?^_`{|}~-]/
    if (passwordRegex.test(inputs[3].value)) {
        inputs[3].classList.remove('is-invalid');
        inputs[3].classList.add('is-valid');
      return true;
    }
    else {
         inputs[3].classList.remove('is-valid');
        inputs[3].classList.add('is-invalid'); 
    }
}
function ageValidation() {
    const ageRegex = /([1-7][0-9]|80)$/
    if (ageRegex.test(inputs[4].value)) {
        inputs[4].classList.remove('is-invalid');
        inputs[4].classList.add('is-valid');
      return true;
    }
    else {
         inputs[4].classList.remove('is-valid');
        inputs[4].classList.add('is-invalid'); 
    }
}