let nodemailer = require('nodemailer');
// email sender function
module.exports = {
    sendEmail : function(req, res){
    // Definimos el transporter
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'kaia.hartmann@ethereal.email',
                pass: '1CWHvE25hv64BurXHj'
            }
        });
        // Definimos el email
        let mailOptions = {
            from: 'kaia.hartmann@ethereal.email',
            to: req.body.email,
            subject: 'Consulta de ' + req.body.nombre,
            text: 'Telefono de contacto: ' + req.body.tel + ' ' + req.body.textArea
        }
        // Enviamos el email
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(req.body);
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.redirect('/')
            }
        })
    },
    contact : function (req, res, next) {

        res.render('contactForm')
    }
}