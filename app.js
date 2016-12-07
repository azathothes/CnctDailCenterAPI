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
	
    console.log(obj);
	
	ExecSql('insert into us_thjlgl set ?',obj).then(result=>{
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
