const express = require('express')
const router = express.Router()
const { User } = require('../model/index')
const multer = require('multer')
const MainController = require('../controller/mainController')
const PostController = require('../controller/postController')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const nodemailer = require('nodemailer')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const {isLogin, isLoginAdmin, isLoginUser} = require("./middleware")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null,  file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', MainController.main) 

router.get('/food', MainController.food) 
router.get('/drink', MainController.drink)   
router.get('/salad', MainController.salad) 
router.get('/blog', MainController.blog) 
router.get('/contact', MainController.contact) 

router.get('/single/:id', MainController.single) 
router.get('/openCard/:id', MainController.openCard) 

router.get('/profile', isLoginUser, MainController.getProfileById)  
router.get('/orders', isLoginUser, MainController.orders) 
router.get('/addCard/:id', isLoginUser, MainController.addCard)

router.get('/signin', MainController.signin) 
router.get('/forgotPass', MainController.forgotPass) 
router.get('/login', MainController.login)
router.get('/signout', MainController.signout)

router.get('/admin', isLoginAdmin, MainController.admin)
router.get('/delete_feedback/:id', isLoginAdmin, MainController.deleteFeedback)
router.get('/editProduct', isLoginAdmin, MainController.editProduct)
router.get('/deleteProduct/:id', isLoginAdmin, MainController.deleteProduct)
router.get('/updateProduct/:id', isLoginAdmin, MainController.updateProduct)


router.get('/changepassword', isLogin, MainController.changePass)
router.get('/changePasswordByCode', MainController.changePasswordByCode)
 
router.get('/update',  isLogin, MainController.updateById)
router.get('/verify', MainController.verify)
      
router.post('/signupUser', PostController.signupUser)
router.post('/checkemail', PostController.checkemail)
router.post('/feedback', PostController.feedback)
router.post('/addproduct', isLoginAdmin, PostController.addProduct)
   
router.post('/signinUser',
    passport.authenticate('local', { failureRedirect: '/signin' }),
    function (req, res) {
        // 0 user, 1 admin
        if(req.user.type == 1){
            res.redirect('/admin')
        } else{
            res.redirect('/profile')
        }

    });
passport.use(new LocalStrategy(
    async function (username, password, done) {
        const us = await User.findOne({
            where: {
                email: username,
            }
        })
        if(us){
            if(us.verify){
                if(bcrypt.compareSync(password, us.password)){
                    return done(null, us)
                }else{
                    return done(null, false)
                }
            }else{
                return done(null, false)

            }
        }else{
            return done(null, false)
        }
    }
));
passport.serializeUser(function(user, done) {
    // console.log('serializeUser===>', user.id)
    done(null, user.id)
})

passport.deserializeUser( async function(id, done) { 
    //   console.log('deserializeUser===>', id);
    const user = await User.findOne({where:{id}})
    done(null, user)
  })

module.exports = router