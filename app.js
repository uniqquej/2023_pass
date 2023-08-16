const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//라우트 객체 생성
const mainRouter    = require('./routes/index');
const dustRouter    = require('./routes/dust');

//라우트 설정
app.use('/', mainRouter);
app.use('/dust', dustRouter);

//client req 대기중
const PORT = 8080;
app.listen(PORT, function() {
    console.log('Listening on port: ', PORT);
});