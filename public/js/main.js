let callmeform = document.querySelector('.call_me_form');


document.addEventListener('DOMContentLoaded', async function(){

    let test2 = await getpost();

    let articles = document.querySelector('.articles');

    articles.innerHTML = '';

    test2.forEach((post) => {
        let postHTML = `<div class="col-4">
        <div class="card">
            <img class="card-img-top" src="${post.imageurl}" alt="${post.title}">
            <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.description}</p>
                <a href="/sight/?id=${post.id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`;

    articles.insertAdjacentHTML("beforeend",postHTML)
    
    })
})



callmeform.addEventListener('submit', (e) =>{
   
    e.preventDefault();

    let phoneinput = callmeform.querySelector('input');

    fetch('/callback_requests',{
        
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            phoneNumber : phoneinput.value,
        })

    }).then((resp) => resp.text()).then(() => alert('we will call you ASAP'));
    
})