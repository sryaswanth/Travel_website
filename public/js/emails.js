
let emailrequest = document.querySelector('.email_request_form');

emailrequest.addEventListener('submit', (e) =>{     // here we move the entered content from the webpage into the server( req.body)
    e.preventDefault();
    fetch('/emails', {    // here we send reposne to the server
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            email:document.querySelector('#email').value,
            text: document.querySelector('#message').value,
        })  
    }).then((resp) => resp.text())    //after the details are sent to the server, convert the resposne from the server in to the text format
        .then((data) => console.log(data))
});