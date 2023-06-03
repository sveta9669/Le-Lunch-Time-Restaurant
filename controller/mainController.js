const { User, Food, Feedback, Card } = require('../model/index')
const bcrypt = require('bcrypt')

class MainController {

    static async main(req, res) {
        const food = await Food.findAll()
        const feedbacks = await Feedback.findAll({
            where: { type: "true" }
        })
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.render('index', { food, login, feedbacks })
    }

    static async food(req, res) {
        const food = await Food.findAll({ where: { type: "dishes" } })
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.render('food', { food, login })
    }

    static async drink(req, res) {
        const drink = await Food.findAll({
            where: { type: "drinks" }
        })
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.render('drink', { drink, login })
    }

    static async salad(req, res) {
        const salad = await Food.findAll({
            where: { type: "salads" }
        })
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.render('salad', { salad, login })
    }

    static async openCard(req, res) {
        const { id } = req.params
        const prod = await Food.findOne({ where: { id } })
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        const food = await Food.findAll()
        res.render('food', { prod, login, food })
    }

    static async addCard(req, res) {
        const { id } = req.params
        const { price, count } = req.query
        const prod = await Food.findOne({ where: { id } })
        await Card.create({ price, count, userId: req.user.id, foodId: id })
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.redirect('/food')
    }

    static async blog(req, res) {
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.render('blog', { login })
    }

    static async contact(req, res) {
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.render('contact', { login })
    }

    static async orders(req, res) {
        const user = req.user
        const orders = await Card.findAll({
            where: { userId: 3 },
            include: {
                model: Food,
                required: true,
            },
        })
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.render('orders', { login, orders, user })
    }

    static async single(req, res) {
        const food = await Food.findOne({
            where: { id: req.params.id }
        })
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.render('single', { food, login })
    }

    static async signin(req, res) {
        res.render('signin')
    }

    static async editProduct(req, res) {
        const food = await Food.findAll()
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        res.render('editProduct', { food, login })
    }

    static async login(req, res) {
        if (req.user) {
            if (req.user.type == 1) {
                res.redirect('/admin')
            } else {
                res.redirect('/profile')
            }
        } else {
            res.redirect('/signin')

        }
    }

    static async admin(req, res) {
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        const feedbacks = await Feedback.findAll()
        const food = await Food.findAll()
        res.render('admin', { feedbacks, login, food })
    }

    static async chat(req, res) {
        const users = await User.findAll({
            where: {
                type: 0,
                id: {
                    [Op.ne]: req.user.id
                }
            }
        })
        res.render('chat', { users, us: req.user })
    }

    static async signout(req, res) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/signin');
        });
    }

    static async forgotPass(req, res) {
        res.render('forgotPass')
    }
    static async deleteFeedback(req, res) {
        const feed_id = req.params.id
        await Feedback.destroy({
            where: { id: feed_id }
        })
        res.redirect(`/admin`)
    }
    static async deleteProduct(req, res) {
        const food_id = req.params.id
        await Food.destroy({
            where: { id: food_id }
        })
        res.redirect(`/editProduct`)
    }

    static async updateProduct(req, res) {
        const food_id = req.params.id
        const { title, price } = req.query
        console.log(title, price, food_id);
        await Food.update({ title, price }, { where: { id: food_id } })
        res.redirect(`/editProduct`)
    }

    static async getProfileById(req, res) {
        const user = req.user
        if (typeof req.user === "undefined") {

            var login = null;
        } else {
            var login = req.user.id
        }
        const users = await User.findOne({
            where: { id: req.user.id }
        })
        res.render('profile', { login, user })
    }


    static async changePass(req, res) {
        const { oldpassword, newpassword, confirmpassword } = req.query
        const hash = bcrypt.hashSync(newpassword, 10)
        if (bcrypt.compareSync(oldpassword, req.user.password)) {
            if (newpassword == confirmpassword) {
                await User.update({ password: hash }, { where: { id: req.user.id } })
                console.log('yeahhh')
                res.redirect(`/profile`)
            }
            else {
                console.log('confirm password was wrong')
                res.redirect(`/setting`)
            }
        } else {
            console.log('old password was wrong')
            res.redirect(`/setting`)
        }
    }

    static async changePasswordByCode(req, res) {
        const { code, newpassword, confirmpassword } = req.query
        const uspass = await User.findOne({
            where: {
                code: code
            },
        })
        const hash = bcrypt.hashSync(newpassword, 10)
        if (uspass) {

            if (code == uspass.code) {
                if (newpassword == confirmpassword) {
                    await User.update({ password: hash }, { where: { code: code } })
                    console.log('yeahhh')
                    res.redirect(`/signin`)
                }
                else {
                    console.log('confirm password was wrong')
                    res.redirect(`/forgotPass`)
                }
            }
            else {
                console.log('code is wrong')
                res.redirect(`/forgotPass`)
            }
        } else {
            console.log('code is wrong')
            res.redirect(`/forgotPass`)

        }
    }

    static async signinUser(req, res) {
        const { email, password } = req.query
        const us = await User.findOne({
            where: {
                email: email,
            }
        })
        if (us) {
            if (us.verify) {
                if (bcrypt.compareSync(password, us.password)) {
                    req.session.error = ''
                    res.redirect(`/`)
                } else {
                    req.session.error = 'password error'
                    res.redirect('/signin')
                }
            } else {
                req.session.error = 'not verify'
                res.redirect('/signin')
            }
        } else {
            req.session.error = 'user not found'
            res.redirect('/signin')
        }
    }

    static async updateById(req, res) {
        const { name, surname, age, email } = req.query
        await User.update(
            {
                name, surname, age, email
            },
            {
                where: {
                    id: req.user.id
                }
            })
        res.redirect(`/profile`)
    }

    static async verify(req, res) {
        const { email, token } = req.query
        const us = await User.findOne({
            where: { email, token }
        })
        if (us) {
            await User.update({ verify: 1, token: null },
                { where: { id: us.id } })
        }
        res.redirect('/signin')
    }
}

module.exports = MainController