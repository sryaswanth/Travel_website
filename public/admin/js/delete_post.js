// the data in articles block will not be there initially when index.html is loading because it is not in the same directory, therefore we use "Event delegations"

let articleblock = document.querySelector('.articles');

articleblock.addEventListener('click',function(e){

      if(e.target.classList.contains('btn-remove')){   // target property stores the element which was clicked in the screen
        console.log("Yes im in");
        let id = e.target.parentNode.parentNode.querySelector('.id').value;      // this selects the first parentNode (i.e) -> 'div' to delete, second parentNode (i.e) -> 'articles' it belongs too.
        console.log(id);
        fetch('/posts/'+ id,{
            
            method: 'DELETE'

        }).then((resp) => resp.text())
        .then((resp) => console.log(id))
        .then((data) => window.history.go());
      }               
})