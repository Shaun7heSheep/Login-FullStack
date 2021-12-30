const greeting = document.querySelector('.greeting');

window.onload = () => {
    // if there's no name in sessionStorage
    // redirect user to log in page
    if(!sessionStorage.name){
        location.href = '/login';
    } else {
        greeting.innerHTML = `hello ${sessionStorage.name}`;
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}