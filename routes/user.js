const express     = require('express');
const router      = express.Router();

const UserModel   = require('../models/user')
const bkfd2Password = require("pbkdf2-password");
const hasher        = bkfd2Password();

const passport = require('passport');

router.get('/signup', async function(req, res) {
	res.render('signup');
});
router.post('/signup', async function(req, res) {
	//회원가입 요청 처리
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    console.log(id, password, name, email);

    //hasher(input, call back func) > 비동기이므로 순서를 보장하기 위해 return 방식으로 call back 함수를 많이 사용함
    hasher( {password: password } , async function(error, pass, salt, hash) {
        // hasher : 1) 함수 자체에서 delay를 주어서 응답 시간을 늦춰줌
        //          2) salt 값을 더해서 rainbow table 사용을 막을 수 있음, hash = hash(pw+salt값) 반환
        var user = {
            id: id,
            password: hash,
            salt: salt,
            name: name,
            email: email,
        };
        const result = await UserModel.AddUser(user);
        if (result.error) {
            console.log(result.error);
            res.redirect('/user/signup');
        }
        else {
            console.log('USER CREATED');
            res.redirect('/user/signin');
        }
    }); //hasher
});

router.get('/signin', async function(req, res) {
	res.render('signin');
});
router.post('/signin', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/user/signin'
}));

module.exports = router;