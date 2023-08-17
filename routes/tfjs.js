const express     = require('express');
const router      = express.Router();

router.get('/regression1', function(req, res) {
    res.render('tfjs/regression1'); // 브라우저에서 학습하고 예측, 서버 할 일X
});

router.post('/regression2', async function(req, res) {
        //모델 로드
        //예측
    res.send('예측결과');
}); //클라이언트에서 데이터 받고

router.get('/regression2', function(req, res) {
    res.render('tfjs/regression2'); // 서버에서 예측 실행
});

module.exports = router;