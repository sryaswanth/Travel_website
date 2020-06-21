 let Email = require('../models/emails').Email;

let uniqueid = require('uniqid');   // this is to ensure that id's dont start from one again when the server is restarted

let express = require('express');

let router = express.Router();   // this package is used to redirect requests from one file to another

let authmiddleware = require('../middleware/auth');

router.get('/',authmiddleware,async(req,resp) =>{

    resp.send(await Email.find());

});

router.post('/', async (req,resp) =>{    // SEND THE DATA FROM THE CLIENT TO DB
    
    let reqbody = req.body;            // first get the data from client to server (data moved to req.body first in "emails.js" file in js folder in public)
    let newemail = new Email({      // now feed it to the DB schema
        id: uniqueid(),
        name : reqbody.name,
        email: reqbody.email,
        text: reqbody.text,
        date: new Date()
    })
    await newemail.save()   // save the email in the DB
    resp.send('Accepted');
});

router.delete('/:id', authmiddleware ,async (req,resp) =>{
    await Email.deleteOne({id : req.params.id});
    resp.send("Deleted");
    
});


module.exports = router;