const router = require('express').Router()
const mailer = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bragdone@gmail.com',
      pass: 'Lec0nte<3'
    },
});

transporter.use('compile', inlineBase64());

router.post('/', (req, res, next) => {

  const template = `
    <h3 style="color: gray">New Contact Form Submission:</h3>
    <hr />
    <h3>${req.body.name} "${req.body.email}"</h3>
    <h3>${req.body.subject}</h3>
    <p>${req.body.message}</p>
    <hr />
    <small style="color: gray">101 Holdings via 101-holdings.com</small>   `

  const mailOptions = {
    from: `${req.body.email}`, // sender address
    to: "acres.emilygrace@gmail.com", // list of receivers
    subject: `${req.body.subject}` ? `${req.body.subject}` : "New Contact Form Submission", // Subject line
    html: template // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      next(error)
    } else {
      res.json(info)
    }
  })

});

module.exports = router;

