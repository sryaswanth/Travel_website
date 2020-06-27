

let createform = document.querySelector('.creating_the_post_form')

let CreateTitle = document.querySelector('#CreateTitle')
let CreateCountry = document.querySelector('#CreateCountry')
let CreateImageURL = document.querySelector('#CreateImageURL')
let CreateText = document.querySelector('#CreateText')

let createimagebyupload = document.querySelector('#UploadFile')

let createlatitude = document.querySelector("#createlatitude")
let createlongitude = document.querySelector("#createlongitude")


/*
method 1

createform.addEventListener('submit', (e)=>{    // getting the data from the form to the server

    e.preventDefault();  
    
    let texts = CreateText.value;

    fetch('/posts',{

        method: 'POST',

        headers:{
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({

            title : CreateTitle.value,
            country: CreateCountry.value,
            imageurl : CreateImageURL.value,
            text : CreateText.value,
            description: texts.substring(0, texts.indexOf('.') +1)
            
        })
    }).then((response) => response.text())
        .then((text) => console.log(text))
        .then((text) => window.history.go());   // redirect back to admin page after clicking submit button
})

*/


// method 2

createform.addEventListener('submit', (e)=>{    // getting the data from the form and send to the server

    e.preventDefault();  
    
    let texts = CreateText.value;

    let data = new FormData();   // incase if user decides to upload image from the local system

    data.append('title', CreateTitle.value)   // ('key', value)
    data.append('country', CreateCountry.value)
    data.append('imageurl', CreateImageURL.value)
    data.append('text', CreateText.value)
    data.append('description', texts.substring(0, texts.indexOf('.') +1))
    data.append('imagefile' , createimagebyupload.files[0])   // since input type is a file and usually files are of the type 'array', so .files[0] is given

    data.append('latitude', createlatitude.value)
    data.append('latitude', createlongitude.value)


    fetch('/posts',{

        method: 'POST',
        body: data
    }).then((response) => response.text())
        .then((text) => console.log(text))
        .then((text) => window.history.go());   // redirect back to admin page after clicking submit button
})


function disable_the_input(input1, input2){
    if(input1.value)
    {
        input2.disabled = true;
    }
    else{
        input2.disabled = false;
    }
}


CreateImageURL.addEventListener('change', function(){    // either you can input url for image or upload form local drive but cant do both that y
    disable_the_input(this, createimagebyupload)
})

createimagebyupload.addEventListener('change', function(){   // either you can input url for image or upload form local drive but cant do both that y
    disable_the_input(this, CreateImageURL)
})

