const expect = require('chai').expect;
const app = require('../app.js');
const supertest = require('supertest')(app);

describe("http get /THZTTS test",()=>{
    it("correct request data && correct request method should be fine.",function(){
        supertest
        .get('/THZTTS?CallNo=12232212232&CalledNo=12232212232&CallSheetID=asdsadsasdsda-asdas-asd-asd&CallType=normal&Ring=30&Begin=2016/2/3 12:33&End=123&QueueTime=232&Agent=testagent&Exten=testExten&Queue=testQueue&State=testState&RecordFile=testfile.mp3&FileServer=c:/test/kk&Province=四川&District=成都')
        .expect(203)
        .end(function(err, res) {
            if (err) throw err;
            expect(res.mesg).to.be.equal("推送成功！");
        });
    });

    it("correct request data && incorrect request method should not be fine.",function(){
        supertest
        .post('/THZTTS?CallNo=12232212232&CalledNo=12232212232&CallSheetID=asdsadsasdsda-asdas-asd-asd&CallType=normal&Ring=30&Begin=2016/2/3 12:33&End=123&QueueTime=232&Agent=testagent&Exten=testExten&Queue=testQueue&State=testState&RecordFile=testfile.mp3&FileServer=c:/test/kk&Province=四川&District=成都')
        .expect(404)
        .end(function(err, res) {
            if (err) throw err;
            expect(res.mesg).to.be.equal("请使用GET请求！");
        });
    })

    it("incorrect request data && correct request method should not be fine.",function(){
        supertest
        .post('/THZTTS?CalledNo=12232212232&CallSheetID=asdsadsasdsda-asdas-asd-asd&CallType=normal&Ring=30&Begin=2016/2/3 12:33&End=123&QueueTime=232&Agent=testagent&Exten=testExten&Queue=testQueue&State=testState&RecordFile=testfile.mp3&FileServer=c:/test/kk&Province=四川&District=成都')
        .expect(401)
        .end(function(err, res) {
            if (err) throw err;
            expect(res.mesg).to.be.equal("缺少必须的参数！");
        });
    })
});


describe("http get /ZXZTTS test",()=>{
    it("correct request data && correct request method should be fine.",function(){
        supertest
        .get('/ZXZTTS?Type=login&Exten=8001&State=1&Agent=坐席&BusyType=1&Time=2017/2/3')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            expect(res.mesg).to.be.equal("推送成功！");
        });
    });

    it("correct request data && incorrect request method should not be fine.",function(){
        supertest
        .post('/ZXZTTS?Type=login&Exten=8001&State=1&Agent=坐席&BusyType=1&Time=2017/2/3')
        .expect(4071)
        .end(function(err, res) {
            if (err) throw err;
            expect(res.mesg).to.be.equal("推送成功！");
        });
    });

    it("incorrect request data && correct request method should be fine.",function(){
        supertest
        .get('/ZXZTTS?Exten=8001&State=1&Agent=坐席&BusyType=1&Time=2017/2/3')
        .expect(401)
        .end(function(err, res) {
            if (err) throw err;
            expect(res.mesg).to.be.equal("推送ss成功！");
        });
    });
})
