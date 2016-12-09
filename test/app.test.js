const expect = require('chai').expect;
const app = require('../app.js');
const supertest = require('supertest')(app);
var url = '/THZTTS?CallNo=12232&CalledNo=12232212232&CallSheetID=asdsadsasdsda-asdas-asd-asd&CallType=normal&Ring=30&Begin=2016/2/3 12:33&End=123&QueueTime=232&Agent=testagent&Exten=testExten&Queue=testQueue&State=testState&RecordFile=testfile.mp3&FileServer=c:/test/kk&Province=四川&District=成都';
describe("http get /THZTTS test",function(){
    it("correct request data && correct request method should be fine.",function(done){
        supertest
        .get(url)
        .expect(207,done);
    });

    
});



