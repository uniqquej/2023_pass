const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//라우트 객체 생성
const mainRouter    = require('./routes/index');
const dustRouter    = require('./routes/dust');
const userRouter    = require('./routes/user');

//라우트 설정
app.use('/', mainRouter);
app.use('/dust', dustRouter);
app.use('/user', userRouter);

//client req 대기중
const PORT = 8080;
app.listen(PORT, function() {
    console.log('Listening on port: ', PORT);
});