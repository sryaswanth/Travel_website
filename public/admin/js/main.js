
let addpostbutton = document.querySelector('.create_post_btn')

let logout_button = document.querySelector('.logout_button');


document.addEventListener('DOMContentLoaded', async function(){   // here we insert the below html code to the webpage when loaded
    addpost();
    addcallbackrequests();
    addemails();
})



addpostbutton.addEventListener('click', function(){

    let articlestab =document.getElementById('v-pills-articlest')
    articlestab.classList.remove('show'); 
    articlestab.classList.remove('active');

    let createpost =document.getElementById('v-pills-add-post')
    createpost.classList.add('show'); 
    createpost.classList.add('active');

})



async function addpost() {
    let test2 = await getpost();

    let order_number = 1

    let articles = document.querySelector('.articles');

    articles.innerHTML = '';

    test2.forEach((post) => {
        let postHTML = `<article class="d-flex justify-content-between align-items-center article-inline">
        <div class="number w5">${order_number++}</div>
        <input class ="id" type="hidden" value ="${post.id}"> 
        <div class="name w20">${post.title}</div>
        <div class="date w20">${post.date}</div>
        <div class="location w15">${post.country}</div>

        <div class="latitude w15">${post.latitude}</div>
        <div class="longitude w15">${post.longitude}</div>

        <div class="edit w5">
            <button class="btn btn-link btn-edit">Edit</button>
        </div>
        <div class="remove w5">
            <button class="btn btn-link btn-remove">X</button>
        </div>
    </article>`;

    // in the above "post.id " is the automatically generated value and it is hidden if we want we can see it in console log

    articles.insertAdjacentHTML("beforeend",postHTML)
    
    })
}



async function addcallbackrequests() {
    let requests = await getcallbackrequests();

    let order_number = 1

    let requestsblock = document.querySelector('#v-pills-callbackrequests');

    requestsblock.innerHTML = '';

    requests.forEach((request) => {
        let requestHTML = `<article class="d-flex justify-content-between align-items-center article-inline">
        <div class="number w10">${order_number++}</div>
        <input class ="id" type="hidden" value ="${request.id}"> 
        <div class="name w60">${request.phoneNumber}</div>
        <div class="date w20">${request.date}</div>
        
        <div class="remove w10">
            <button class="btn btn-link btn-remove">X</button>
        </div>
    </article>`;

    // in the above "post.id " is the automatically generated value and it is hidden if we want we can see it in console log

    requestsblock.insertAdjacentHTML("beforeend",requestHTML)
    
    })
}


async function addemails() {                // this is to display the data from the server into the admin page
  
    let requests = await getemails();

    let order_number = 1

    let requestsblock = document.querySelector('#v-pills-mails');

    requestsblock.innerHTML = '';

    requests.forEach((request) => {
        let requestHTML = `<article class="d-flex justify-content-between align-items-center article-inline">
        <div class="number w5">${order_number++}</div>
        <input class ="id" type="hidden" value ="${request.id}"> 
        <div class="name w30">${request.name}</div>
        <div class="email w30">${request.email}</div>
        <div class="date w30">${request.date}</div>
        
        <div class="remove w5">
            <button class="btn btn-link btn-remove">X</button>
        </div>

        <div class="text w100">${request.text}</div>
    </article>`;

    // in the above "post.id " is the automatically generated value and it is hidden if we want we can see it in console log

    requestsblock.insertAdjacentHTML("beforeend",requestHTML)
    
    })

}


// this function is for admin log out

logout_button.addEventListener('click', () => {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})