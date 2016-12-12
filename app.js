"use strict"
const express = require('express');
const ExecSql = require('./services/ServiceManager');
const common = require('./common/tool');
const logger = require('./common/logger');
const route = express.Router();
const app = express();




route.get('/THZTTS',(req,res)=>{
	if(!common.checkQueryStringForTHZTTS(req))
	{
		res.status(401).json({isok:false,mesg:'缺少必须的参数！'});
		return;
	}

	let obj = common.assembleParamsForTHZTTS(req.query);
	
	ExecSql('insert into us_thjlgl SET ?',obj).then(result=>{
		console.log(result);
		res.status(200).json({isok:true,mesg:"推送成功！"});
	}).catch(err=>{
		logger.error(err);
        res.status(401).json({isok:false,mesg:err});
	});
});



route.get('/ZXZTTS',(req,res)=>{
	if(!common.checkQueryStringForZXZT(req))
	{
		res.status(401).json({isok:false,mesg:'缺少必须的参数！'});
		return;
	}
	req.query.ZJ = common.generateGUID();
	
	ExecSql('insert into us_zxztgl set ?',req.query).then(result=>{
		res.status(200).json({isok:true,mesg:"推送成功！"});
	}).catch(err=>{
		logger.error(err);
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
		if(result.changedRows === 1)
		{
			res.status(200).json({isok:true,mesg:"推送成功！"});
		}
		else
		{
			res.status(404).json({isok:false,mesg:`未找到CallSheetID为 ${req.query.CallSheetID} 的通话记录！`});
		}
	}).catch(err=>{
		logger.error(err);
        res.status(401).json({isok:false,mesg:err});
	});
});

route.post("*",function(req,res){
	res.status(404).json({isok:false,mesg:"请使用GET请求！"});
})

app.use(route);
module.exports = app;
app.listen(3000);


