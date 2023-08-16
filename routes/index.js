const express     = require('express');
const router      = express.Router();
const auth        = require('./auth');

//auth.checkauth 미들웨어 먼저 실행 후 로그인 되어 있으면 다음 미들웨어 실행
// 로그인이 안 되어있다면 index.html rendering 못함
router.get('/', auth.CheckAuth, function(req, res) {
    res.render('index');
});

// 외부에서 사용가능 하도록 해줌
module.exports = router;
