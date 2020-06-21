let auth = require('../controllers/auth');

function checkauth(req, resp, next){
    
    let token = req.cookies['auth_token'];   

    if(token && auth.check_the_token(token))   // if there is a token avaiable and then check the token (check from auth.js files)
    {
        next();
    }
    else {
        resp.status(400);
        resp.send('Not Autorized');
    }
}



module.exports = checkauth;