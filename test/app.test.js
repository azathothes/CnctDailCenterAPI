const expect = require('chai').expect;
const app = require('../app.js');
const supertest = require('supertest')(app);
const common = require("../common/tool");
var guid = null;


describe("http get /MYDJGTS test",()=>{
    it("correct request data && correct request method should be fine.",function(){
        supertest
        .get('/MYDJGTS')
        .query({CallSheetID:"guid",SurveyContent:6})
        .expect(200)
        .end(function(err, res) {
            if (err) done(err);
            console.log(guid);
            console.log(res);
            done();
        });
    });
});



