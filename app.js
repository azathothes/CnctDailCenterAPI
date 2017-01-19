"use strict"
const express = require('express');
const ExecSql = require('./services/ServiceManager');
const common = require('./common/tool');
const logger = require('./common/logger');
const route = express.Router();
const app = express();
const bodyparser = require('body-parser');



route.post('/callback',(req,res)=>{

	if(req.body.RecordFile !== undefined)
	{
		let result = common.checkQueryStringForTHZTTS(req);
		if(!result[0])
		{
			res.status(401).json({isok:false,mesg:`缺少必须的参数:${result[1]}`});
			return;
		}

		let obj = common.assembleParamsForTHZTTS(req.body);
		
		ExecSql("select ZJ from us_yhgl where fjhqybz = 0 and fjh = ?",{fjh:obj.Agent}).then(yhs=>{
			
			obj.CJR = "test_cjr_zj";
			return ExecSql('insert into us_thjlgl SET ?',obj);
		}).then(result=>{
			res.status(200).json({isok:true,mesg:"推送成功！"});
		}).catch(err=>{
			logger.error(err);
        	res.status(401).json({isok:false,mesg:err});
		});




	}
	else if(req.body.Agent !== undefined)
	{
		if(!common.checkQueryStringForZXZT(req))
		{
			res.status(401).json({isok:false,mesg:'缺少必须的参数！'});
			return;
		}
		
		req.body.ZJ = common.generateGUID();
	
		ExecSql('insert into us_zxzt set ?',req.body).then(result=>{
			res.status(200).json({isok:true,mesg:"推送成功！"});
		}).catch(err=>{
			logger.error(err);
        	res.status(401).json({isok:false,mesg:err});
		});
	}
	else if(req.body.CallSheetID !== undefined && req.body.SurveyContent !== undefined)
	{
		if(!common.checkQueryStringForMYDJGTS(req))
		{
			res.status(401).json({isok:false,mesg:'缺少必须的参数！'});
			return;
		}
		ExecSql('update us_thjlgl set SurveyContent = ? where CallSheetID = ?',[req.body.SurveyContent ,req.body.CallSheetID]).then(result=>{
			if(result.changedRows === 1)
			{
				res.status(200).json({isok:true,mesg:"推送成功！"});
			}
			else
			{
				res.status(404).json({isok:false,mesg:`未找到CallSheetID为 ${req.body.CallSheetID} 的通话记录！`});
			}
		}).catch(err=>{
			logger.error(err);
        	res.status(401).json({isok:false,mesg:err});
		});
	}
	else{
		res.status(401).json({isok:false,mesg:"参数错误"});
	}
})

route.get("*",function(req,res){
	res.status(404).json({isok:false,mesg:"请使用Post请求！"});
})


app.use(bodyparser.urlencoded({ extended: false }))
app.use(route);
module.exports = app;
app.listen(10532);


