"use strict"
const express = require('express');
const ExecSql = require('./services/ServiceManager');
const common = require('./common/tool');
const route = express.Router();
const app = express();




route.get('/THZTTS',(req,res)=>{
	if(!common.checkQueryStringForTHZTTS(req))
	{
		res.status(401).json({isok:false,mesg:'缺少必须的参数！'});
		return;
	}


	let obj = common.assembleParamsForTHZTTS(req.query);
	let keys = Object.keys(obj);
	//let values = common.generateParamArray(obj);
    var sql = `insert into us_thjlgl (${keys.toString()}) values (
        '${obj.ZJ}',
        '${obj.ZJFHM}',
        '${obj.BJFHM}',
        '${obj.LDSJ}',
        '${obj.THSJ}',
        '${obj.SFJT}',
        '${obj.QYBZ}',
        '${obj.GXR}',
        '${obj.CJR}',
        '${obj.GXSJ}',
        '${obj.CJSJ}',
        '${obj.BZ}',
        '${obj.CallSheetID}',
        '${obj.CallType}',
        '${obj.Ring}',
        '${obj.QueueTime}',
        '${obj.Agent}',
        '${obj.Exten}',
        '${obj.Queue}',
        '${obj.State}',
        '${obj.RecordFile}',
        '${obj.FileServer}',
        '${obj.Province}',
        '${obj.District}')`;
    console.log(sql)
    console.log(obj);

    

	ExecSql('insert into us_thjlgl set zj = "asdsasadasdsad"',[]).then(result=>{
		
		res.status(200).json(result);
	}).catch(err=>{
        console.log(err);
        res.status(401).json({isok:false,mesg:err});
	});
});

route.get('/ZXZTTS',(req,res)=>{

	ExecSql('select * from us_csgl;').then(result=>{
		console.log(res);
		res.status(200).json(result);
	}).catch(err=>{
		console.log(err);
	});
});

route.get('/MYDJGTS',(req,res)=>{

	ExecSql('select * from us_csgl;').then(result=>{
		console.log(res);
		res.status(200).json(result);
	}).catch(err=>{
		console.log(err);
	});
});



app.use(route);
app.listen(3000);
