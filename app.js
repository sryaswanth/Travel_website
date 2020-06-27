let express = require('express')

let app = express();

app.use(express.static('public'));   // to use the static content in the pupblic folder 

app.use(express.json())

let cookie_parser = require('cookie-parser');

app.use(cookie_parser());


app.set('view engine', 'ejs') // here we specify that we use template engine


let postRouter = require('./DB_path_routes/posts')


let callbackrequestrouter = require('./DB_path_routes/callback_requests');

let Callbackclass = require('./models/callback_requests').Callbackclass;


let emailrouter = require('./DB_path_routes/emails');
//let emailclass = require('./models/emails').Email;

let userrouter = require('./DB_path_routes/users');

let auth = require('./controllers/auth');


let Post = require('./models/posts').Post     // this for displaying details based on ID


let calling_request = new Callbackclass({
    id : 1234,
    phoneNumber: +11111111111,
    date:   new Date()
})

calling_request.save();



// since JSON files cant handle binary data, we install 'multer' package   (i.e if the fimage is upload from system we need this package)

let multer = require('multer')

// method 1
// app.use(multer({dest:'public/images'}).single('imagefile'))   // .single() indicates which key to use   // here "dest" means where to save the image in the public folder

// method 2

let imagestorage = multer.diskStorage({   // inorder to give name to the uploaded images inside the images files and specify its datatype
    destination: (req, file, cbfunction) => cbfunction(null,'public/images'),      // cb('what has to be done incase if there is an error', path )
    filename: (req, file, cbfunction) => cbfunction(null, file.originalname)
});

app.use(multer({storage: imagestorage}).single('imagefile'))  // .single() indicates which key to use   // 

let mongoose = require('mongoose');
const { response } = require('express');

mongoose.connect('mongodb+srv://YaswanthSR:Carnatic7!@mycluster-gmcwp.mongodb.net/Travels', { useNewUrlParser: true }); // connecting to mongodb folder   // new URLparser - true is for the deprication warming in console


app.use('/posts', postRouter)   // redirect to the posts page inside DB_path_routes folder

app.use('/callback_requests', callbackrequestrouter)   // redirect to the posts page inside DB_path_routes folder

app.use('/emails', emailrouter)   // redirect to the posts page inside DB_path_routes folder

app.use('/users', userrouter)

//for 'template engines' content
app.get('/sight', async (req,resp) =>{         // if we use path ".../sight", it means that a page has to be rendered with the type 'sight.ejs' file in views
        
        let id = req.query.id;    // inorder to poen the article basded on its id

        let post = await Post.findOne({id:id});

        resp.render('sight', {            // resp.render('filename', data to be passed to the file sight.ejs)
        title : post.title,
        imageurl : post.imageurl,
        date : post.date,
        text: post.text,
        locate : post.country,
        lati : post.latitude,
        longi : post.longitude
    })                 
})


// l6et are_you_logged_in = false;  // instead of this we use cookies

app.get('/admin', (req, resp) =>{

    let token = req.cookies['auth_token'];   

    if(token && auth.check_the_token(token))   // if there is a token avaiable and then check the token (check from auth.js files)
    {
        resp.render('admin');    // resp.render('filename', data to be passed to the file admin.ejs)
    }
    else{
        resp.redirect('/login');    
    }
    
})

app.get('/login', (req,resp)=>{
    resp.render('login');  
})

let port =  process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening to ${port} port`));

