let Callbackclass = require('../models/callback_requests').Callbackclass;

let uniqueid = require('uniqid');   // this is to ensure that id's dont start from one again when the server is restarted

let express = require('express');

let router = express.Router();   // this package is used to redirect requests from one file to another

let authmiddleware = require('../middleware/auth');


router.get('/', authmiddleware ,async(req,resp) =>{    // should be visible only to the admins of the website

    resp.send(await Callbackclass.find());

});

router.post('/', async (req,resp) =>{
    
    let reqbody = req.body;
    let newRequest = new Callbackclass({
        id: uniqueid(),
        phoneNumber: reqbody.phoneNumber,
        date: new Date()
    })
    await newRequest.save()
    resp.send('Accepted');
});

router.delete('/:id', authmiddleware , async (req,resp) =>{
    await Callbackclass.deleteOne({id : req.params.id});
    resp.send("Deleted");
    
});


module.exports = router;