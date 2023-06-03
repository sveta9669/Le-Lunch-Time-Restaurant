module.exports.isLogin = (req, res, next) => {
    if (req.user && req.user.verify) {
        return next();
    } else {
        return res.redirect('/signin')
    }
}
module.exports.isLoginAdmin = (req, res, next) => {
    if (req.user && req.user.verify && req.user.type == 1) {
        return next();
    } else {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/signin');
        });
    } 
} 
module.exports.isLoginUser = (req, res, next) => {
    if (req.user && req.user.verify && req.user.type == 0) {
        return next();
    } else {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/signin');
        });
    }
}