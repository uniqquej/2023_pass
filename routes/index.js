const express     = require('express');
const router      = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

// 외부에서 사용가능 하도록 해줌
module.exports = router;
