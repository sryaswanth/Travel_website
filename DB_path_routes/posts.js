let Post = require('../models/posts').Post;  // import the modules in posts.js file in models folder (.Post implies we work only with the key called 'Post')

let uniqueid = require('uniqid');   // this is to ensure that id's dont start from one again when the server is restarted

let express = require('express');

let router = express.Router();   // this package is used to redirect requests from one file to another

let authmiddleware = require('../middleware/auth');


module.exports = router;

router.get('/',async(req,resp) =>{

    let posts = await Post.find();
    resp.send(posts)   // send the data to the client
   // console.log(JSON.stringify(posts))
})


router.get('/:id', async(req,resp) =>{          // this is done to edit the data when required in edit tab
    let id = req.params.id;
    let posts = await Post.findOne({id: id});
    resp.send(posts)   // send the data to the client
   // console.log(JSON.stringify(posts))
})


router.post('/',authmiddleware ,async(req,resp) =>{   // adding the data to the database from the server

    let reqbody = req.body;

    let imgpath;

    if(reqbody.imageurl)
    {
        imgpath = reqbody.imageurl;
    }

    else{
        console.log(req.file.path)
        imgpath = req.file.path.substring(req.file.path.indexOf('\\'), req.file.path.length);   // inorder to avoid "public" in the path
        console.log(imgpath)
    }

    let newPost = new Post({
        id : uniqueid(),
        title: reqbody.title,
        date: new Date(),
        description : reqbody.description,
        country: reqbody.country,
        text : reqbody.text,
        imageurl : imgpath,

    })

    //console.log(req.file);    // if we are dealing with files, then it will be saved in reg.files and not req.body
    await newPost.save();
    resp.send('Created');
})


/*
let post1 = new Post({
    title: 'Eifel Tower',
    date: new Date(),
    description: "Some description",
    country: "France",
    text: "Some text",
    imageurl: '/images/img-1.jpg',
    id: 1
})

post1.save() // to save this data in the DB

*/

router.delete('/:id',authmiddleware ,async (req,resp) => {
    console.log(req.params.id);
    console.log("entered to delete");

    let id = req.params.id;
    
    await Post.deleteOne({id: id});
    resp.send('deleted');

})


router.put('/:id', async(req, resp) => {    // to update the content with the new text in edit tab and send it to DB and update it

    let id = req.params.id;
   await Post.updateOne({id : id}, req.body);       // parameters  ({specify id to update}, content)
   resp.send('Updated');

})
