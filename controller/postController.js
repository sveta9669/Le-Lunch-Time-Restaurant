const { User, Feedback, Food } = require('../model/index')
const nodemailer = require('nodemailer');
const uuid = require('uuid')
const bcrypt = require('bcrypt')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nodetrain@gmail.com',
        pass: 'upjdvnnugzljoune'
    }
});

class postController {

    static async feedback(req, res) {
        const { name, surname, email, message } = req.body
        await Feedback.create({ name, surname, email, message })
        res.redirect(`/contact`)
    }

    static async addProduct(req, res) {
        const { type, image, title, price } = req.body
        await Food.create({ image, type, title, price })
        res.redirect(`/admin`)
    }

    static async signupUser(req, res) {
        const { name, surname, age, email, password, confirmpassword } = req.body
        if (confirmpassword == password) {
            const token = uuid.v4()
            const mailOptions = {
                from: 'nodetrain@gmail.com',
                to: email,
                subject: 'Hii from Sveta',
                html: `<h3> Hello ${name} </h3>
                <p> click --> <a href='http://localhost:2020/verify?email=${email}&token=${token}'>me</a> </p>`
            };
            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    const hash = bcrypt.hashSync(password, 10)
                    await User.create({ name, surname, age, email, password: hash, token, verify: 0, type: 0 })
                }
            })
            res.redirect('/signin')
        }
        else {
            res.redirect('/signup')
        }
    }
    
    static async checkemail(req, res) {
        const usem = await User.findOne({ where: { email: req.body.email } })
        let rnd = Math.floor(Math.random() * 8990 + 1000)
        if (usem) {
            const mailOptions = {
                from: 'nodetrain@gmail.com',
                to: usem.email,
                subject: 'confirm email',
                html: `<h3> Hello ${usem.name} </h3>
                <p> your code - ${rnd} </p>`
            }
            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    await User.update({ code: rnd }, { where: { email: usem.email } })
                }
            })
        } else {
            console.log("wrong email")
        }
        res.redirect('/forgotPass')
    }
}

module.exports = postController