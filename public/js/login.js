 
let sign_in_form = document.querySelector('.sign_in_form');

let register_form = document.querySelector('.register_form');

sign_in_form.addEventListener('submit', (e) => {

    e.preventDefault();

    let email = document.getElementById('sign_in_email').value;
    let password = document.getElementById('sign_in_password').value;

    fetch('/users/login', {
        method: 'POST',

        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})   // means jave will understand we need to create email and password and in variable 'email' key the, email value is stored and so is for password
    }).then((resp) =>
    {
        if(resp.status === 400)
        {
            return new Error();
        }

         return resp.json();
    })
    .then((data) =>
    {
        window.location.href = data.redirectURL;                          // redirect to admin page after successful login
    }).catch(() => alert("Wrong email or password"));

});





register_form.addEventListener('submit', (e) => {

    e.preventDefault();

    let email = document.getElementById('register_email').value;
    let password = document.getElementById('register_password').value;
    let reenter_password = document.getElementById('confirm_register_password').value;

    if(password != reenter_password)
    {
        return;
    }

    fetch('/users/register', {
        method: 'POST',

        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})   // means jave will understand we need to create email and password and in variable 'email' key the, email value is stored and so is for password
    }).then((resp) => resp.text()).then((data) => alert(data))
    
})