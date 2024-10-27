const accountSid = 'AC6db9f433ffae3525713f8330b6a6e554';
const authToken = 'b68339f19355042475f655878c995091';
const client = require('twilio')(accountSid, authToken);


const Whatsapp = (req,res)=>{
    try {
        client.messages
    .create({
        body: 'Your appointment is coming up on July 21 at 3PM',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+919159157377'
    })
    .then(message => console.log(message.sid))
    .done(); 

    } catch (err) {
        return res.status(500).json({
            success: false,
            result: null,
            message: Array.isArray(err.message) ? err.message[0].msg : err.message
        })

    }
}

    


module.exports = { Whatsapp }