const express = require('express');
const app = express();
//로그인 인증 모듈
const passport          = require('passport');
const passportConfig    = require('./passport');
const session           = require('express-session');
const flash             = require('connect-flash');

passportConfig()

//세션 설정
//http:severless > 한번 로그인 한 후 연결을 끊기 때문에 인증 권한을 계속 인증해야함 > 인증정보를 저장해놓기 위해 세션 만듦
app.use(
    session({
       resave: false,
       saveUninitialized: false,
       secret: "sessionsecretsessionsecret", //세션정보 암호화
    }),
);
//passport 초기화
app.use(passport.initialize()); //req에 passport 설정 추가
app.use(passport.session());    //req.session에 passport 데이터 추가
app.use(flash());

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