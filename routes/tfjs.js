const express     = require('express');
const router      = express.Router();

const tf = require('@tensorflow/tfjs');

router.get('/regression1', function(req, res) {
    res.render('tfjs/regression1'); // 브라우저에서 학습하고 예측, 서버 할 일X
});
router.get('/regression2', async function(req, res) {
    res.render('tfjs/regression2');
});
router.post('/regression2', async function(req, res) {
    let model = await tf.loadLayersModel('https://raw.githubusercontent.com/oralcoder/2023_PASS/main/reg_model.json');
    model.summary();
    const data = req.body.data;
    let testX = data.split(',').map(function(x) {
        return parseInt(x);
    });
    testX = tf.tensor(testX, [testX.length]);
    const preds = model.predict(testX).arraySync();
    res.send(preds);
});


module.exports = router;