function getRoot(req, res){
    res.send('Bienvenido')
}

function getLogin(req, res){
    if(req.isAuthenticated()){
        let user = req.user
        console.log('user logueado')
        res.render('profileUser', {user})
    } else {
        console.log('user no logueado')
        res.render('login')
    }
}

function getSignup(req, res) {
    res.render('signup')
}

function postLogin(req, res){
    let user = req.user
    res.render('profileUser')
}

function postSignup (req, res){
    let user = req.user
    res.render('profileUser')
}

function getFaillogin(req, res){
    console.log('error en login')
    res.render('login-error', {})
}

function getFailsignup(req, res){
    console.log('error en signup')
    res.render('signup-error', {})
}

function getLogout(req, res){
    req.logout();
    res.redirect('/');
}

function failRoute(req, res){
    res.status(404).send('Ruta no encontrada');
}

export default {
    getRoot,
    getLogin,
    getSignup,
    postLogin,
    postSignup,
    getFaillogin,
    getFailsignup,
    getLogout,
    failRoute
}
