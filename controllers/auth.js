let jason_web_token = require('jsonwebtoken');     // inorder to generate keys and see if the key generated is matching with the users key// simply this package is to check if the user is logged in  for each seperate users 

let secret_key = 'asad32323';              // assigning the secret key to the payload

function generate_the_token(user){

    let payload = {
        email : user.email,
        password : user.password
    }

    return jason_web_token.sign(payload, secret_key)    // (details, a new secret key)
}

function check_the_token(token){    // check if the token provided by the users is the correct one

    return jason_web_token.verify(token, secret_key)
}       

module.exports = {generate_the_token, check_the_token}