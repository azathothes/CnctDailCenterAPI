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
	
	ExecSql('insert into us_thjlgl set ?',obj).then(result=>{
		res.status(200).json(result);
	}).catch(err=>{
        console.log(err);
        res.status(401).json({isok:false,mesg:err});
	});
});



route.get('/ZXZTTS',(req,res)=>{
	console.log(req.query);
	if(!common.checkQueryStringForZXZT(req))
	{
		res.status(401).json({isok:false,mesg:'缺少必须的参数！'});
		return;
	}
	req.query.ZJ = common.generateGUID();
	
	ExecSql('insert into us_zxztgl set ?',req.query).then(result=>{
		res.status(200).json(result);
	}).catch(err=>{
        console.log(err);
        res.status(401).json({isok:false,mesg:err});
	});

});

route.get('/MYDJGTS',(req,res)=>{

	if(!common.checkQueryStringForMYDJGTS(req))
	{
		res.status(401).json({isok:false,mesg:'缺少必须的参数！'});
		return;
	}
	ExecSql('update us_thjlgl set SurveyContent = ? where CallSheetID = ?',[req.query.SurveyContent , req.query.CallSheetID]).then(result=>{
		res.status(200).json(result);
	}).catch(err=>{
        console.log(err);
        res.status(401).json({isok:false,mesg:err});
	});
});



app.use(route);
app.listen(3000);
