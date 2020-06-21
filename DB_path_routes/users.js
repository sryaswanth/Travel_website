let Post = require('../models/users').User;  // import the modules in posts.js file in models folder (.Post implies we work only with the key called 'Post')

let express = require('express');
const { User } = require('../models/users');

let router = express.Router();   // this package is used to redirect requests from one file to another


let encrypt_password = require('bcrypt');   // inorder to encrypt the password before saving it in DB, so that no one can access it

let auth = require('../controllers/auth');

router.post('/login', async (req,resp) =>{   // validate if the user is there in the DB if yes then sign In

    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email : email});
     console.log(user)
    if(user.length > 0){                       // here 'user' is an array. since empty array usually give us 'TRUE' as default value, we check if the array length is greater than zero
       
        let check_if_true = await encrypt_password.compare(password, user[0].password)     // arguments - > (password submitted by the user, the password i nthe db)  // since 'user' is an array we write as 'user[0]'
        
        if(check_if_true){

            let generate_token = auth.generate_the_token(user[0]);   // pass the user to the generate_the_token function in the auth.js file in controllers folder
            resp.cookie('auth_token',generate_token);       // store the token in the cookie as key value pair -> args (key name, value)
            console.log(generate_token);
            resp.send({
                    redirectURL :'/admin'
            })
        }
        else{
            resp.status(400);
            resp.send("Rejected - Incorrect Password")
        }
    }
    else{
        resp.send("Rejected - No Email ID avaiable in this match");
    }

})


router.post('/register', async (req,resp) =>{    // register new user

    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email : email});

    if(user.length === 0){

        let password_successfully_encrypted = await encrypt_password.hash(password, 12)  // the bigger the number the stronger the encryption (biggest number possible is 12)

        let newUser = new User({
            email: email,
            password : password_successfully_encrypted
        })

       await newUser.save();
        resp.send("User Registered")
    }
    else{
        resp.send("Unable to register");
    }

})

module.exports = router;



