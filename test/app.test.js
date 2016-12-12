const expect = require('chai').expect;
const app = require('../app.js');
const supertest = require('supertest')(app);

describe("http get /THZTTS test",function(){
    it("correct request data && correct request method should be fine.",function(done){
        supertest
        .get("/THZTTS")
        .query({
            CallSheetID:'test-call-sheet-id',CallType:'normal',Ring :30,
            QueueTime :40,Agent:"testAgent",Exten:"testExten",
            Queue:"testQueue",State:"testState",RecordFile:"testfile",
            FileServer:"c:/test/kk",Province:"四川",District:"遂宁",End:300,
            SurveyContent:-1,CallNo:17828024814,CalledNo:17828024815,Begin:"2016/12/12 10:57"
        })
        .expect(200)
        .end(function(err, res) {
            if (err) done(err);
            done();
        });
    });
});

describe("http get /ZXZTTS test",()=>{
    it("correct request data && correct request method should be fine.",function(){
        supertest
        .get('/ZXZTTS')
        .query({Type:"login",Exten:"8001",State:"1",Agent:"坐席",BusyType:"1",Time:"2016/12/12 10:57"})
        .expect(200)
        .end(function(err, res) {
            if (err) done(err);
            done();
        });
    });
});

describe("http get /MYDJGTS test",()=>{
    it("correct request data && correct request method should be fine.",function(){
        supertest
        .get('/MYDJGTS')
        .query({CallSheetID:"test-call-sheet-id",SurveyContent:-(~(Math.random()*10))})
        .expect(200)
        .end(function(err, res) {
            if (err) done(err);
            done();
        });
    });
});



