// form loading animation
const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*100);
})

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    }
}

// form validation
const username = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

if (username == null) { // login page is open
    submitBtn.addEventListener('click', () => {
        fetch('/login-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validate(data);
        })
    })
} else { // register page is open
    
    // click event for button
    submitBtn.addEventListener('click', () => {
        // get data from input
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                name: username.value,
                email: email.value,
                password: password.value
            })
        })
        // add respone to json to send to server
        .then(res => res.json())
        .then(data => {
            validate(data);
        })
    })
}

// validate information with server
const validate = (data) => {
    if(!data.name){ // if data doesn't have name -> show error
        alertBox(data);
    } else {
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        location.href = '/';
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = '5%';
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000)
}