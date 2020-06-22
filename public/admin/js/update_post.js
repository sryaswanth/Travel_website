
// the data in articles block will not be there initially when index.html is loading because it is not in the same directory, therefore we use "Event delegations"


let update_block = document.querySelector('.articles');

let updateform = document.querySelector(".updating_the_post_form");

let title_input = document.querySelector('#updateTitle');

let text_input = document.querySelector('#updateText');

let id;

update_block.addEventListener('click', async function(e){

      if(e.target.classList.contains('btn-edit')){   // target property stores the element which was clicked in the screen

        id = e.target.parentNode.parentNode.querySelector('.id').value;      // this selects the first parentNode (i.e) -> 'div' to delete, second parentNode (i.e) -> 'articles' it belongs too.

        let required_details = await fetch('/posts/'+id)
                                       .then((resp) => resp.json())
                                        .then((data) => data)              // done inorder to get the already existing data inorder to edit it
        
        

        title_input.value =  required_details.title;

        text_input.value =  required_details.text;


        let articlestab =document.getElementById('v-pills-articlest')
        articlestab.classList.remove('show'); 
        articlestab.classList.remove('active');

        let updatetab =document.getElementById('v-pills-update-post')
        updatetab.classList.add('show'); 
        updatetab.classList.add('active');

      }               
})


updateform.addEventListener('submit', function(e){
    e.preventDefault();

    fetch('/posts/'+id, { // since "id" is already obtained in the previous function we dont need to reinitialize and obtain it again, 'id' is keep in the scope for this full class

    method : 'PUT',

    headers: {
        'Content-Type' : 'application/json'
    },

    body : JSON.stringify({
        title:title_input.value,
        text : text_input.value,
        description: text_input.substring(0, text_input.indexOf('.') +1)

    })

    }). then((resp) => resp.text())
    .then(() => window.history.go());

})

