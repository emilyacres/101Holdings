const router = require('express').Router()
const mailer = require('nodemailer');
const { User } = require('../db/models')
const inlineBase64 = require('nodemailer-plugin-inline-base64');

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bragdone@gmail.com',
      pass: 'Lec0nte<3'
    },
});

transporter.use('compile', inlineBase64());

router.put('/password', (req, res, next) => {
  User.update( req.body, {
    where: {email: "admin"}
  }).then(user => {
    console.log("############USER", user[0])
    const template = `
    <h3 style="color: gray">Updated 101 Holdings administrator account:</h3>
    <hr />
    <h3>Username: ${user.email}</h3>
    <h3>New Password: ${req.body.password}</h3>
    <hr />
    <small style="color: gray">101 Holdings via 101-holdings.com</small>   `

    const mailOptions = {
    from: "101 Holdings", // sender address
    to: "info@101-holding.com", // list of receivers
    subject: "101 Holdings Changes to Admin", // Subject line
    html: template // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        next(error)
      } else {
        res.json(info)
      }
    })

  })
})


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
    to: "info@101-holdings.com", // list of receivers
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

