module.exports = {
    CheckAuth: async function(req, res, next) {
        console.log(req);
        if(req.isAuthenticated()) { // 로그인 여부 반환
            next(); //다음 미들웨어에게 실행권을 넘겨주는 역할
        }
        else {
            res.redirect('/user/signin');
        }
    },
}