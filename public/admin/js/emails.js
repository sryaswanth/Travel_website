async function getemails() {
    return await fetch('/emails')
              .then((resp) => resp.json())
              .then((data) => data);
}

let emailsblock = document.querySelector('#v-pills-mails');

emailsblock.addEventListener('click',function(e){     // if we click "x" we should delete the data

      if(e.target.classList.contains('btn-remove')){   // target property stores the element which was clicked in the screen
        console.log("Yes im in");
        let id = e.target.parentNode.parentNode.querySelector('.id').value;      // this selects the first parentNode (i.e) -> 'div' to delete, second parentNode (i.e) -> 'articles' it belongs too.
        console.log(id);
        fetch('/emails/'+ id,{
            
            method: 'DELETE'

        }).then((resp) => resp.text())
        .then((resp) => console.log(id))
        .then((data) => window.history.go());
      }               
})