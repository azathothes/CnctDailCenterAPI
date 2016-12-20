"use strict"
const crypto = require('crypto');
const entitys = require('../entitys/Entity');
const mysql = require('mysql');
module.exports.checkQueryStringForTHZTTS =(req)=>{
	let params = req.body;

	if(params.CallNo === undefined)
	{
		return [false,"CallNo"];
	}

	if(params.CalledNo === undefined)
	{
		return [false,"CalledNo"];
	}
	if(params.CallSheetID === undefined)
	{
		return [false,"CallSheetID"];
	}

	if(params.CallType === undefined)
	{
		return [false,"CallType"];
	}
	if(params.Ring === undefined)
	{
		return [false,"Ring"];
	}
	if(params.Begin === undefined)
	{
		return [false,"Begin"];
	}

	if(params.End === undefined)
	{
		return [false,"End"];
	}
	if(params.QueueTime === undefined)
	{
		return [false,"QueueTime"];
	}
	if(params.Agent === undefined)
	{
		return [false,"Agent"];
	}

	if(params.Exten === undefined)
	{
		return [false,"Exten"];
	}
	if(params.Queue === undefined)
	{
		return [false,"Queue"];
	}
	if(params.State === undefined)
	{
		return [false,"State"];
	}

	if(params.RecordFile === undefined)
	{
		return [false,"RecordFile"];
	}
	if(params.FileServer === undefined)
	{
		return [false,"FileServer"];
	}
	
	return [true,"ok"];
}


module.exports.checkQueryStringForZXZT =(req)=>{
	let params = req.body;
	if( !params.State
		||!params.Type
		||!params.Exten
		||!params.Agent
		||!params.Time
		||!params.BusyType)
	{
		return false;
	}
	else
	{
		return true;
	}
}


module.exports.checkQueryStringForMYDJGTS =(req)=>{
	let params = req.body;

	if( !params.CallSheetID
		||!params.SurveyContent)
	{
		return false;
	}
	else
	{
		return true;
	}
}



module.exports.assembleParamsForTHZTTS=(reqquery)=>{
	let now = new Date();
	reqquery['Ring'] = 0;
	reqquery['QueueTime'] = 0;
	for (var key in entitys.us_thjlglEntity) {
		if(entitys.us_thjlglEntity.hasOwnProperty(key))
		{
			if(reqquery[key])
			{
				entitys.us_thjlglEntity[key] = reqquery[key].trim();
			}
		}
	}
	
	["ZJ","ZJFHM","BJFHM","LDSJ","THSJ","SFJT","QYBZ","GXR","CJR","GXSJ","CJSJ","BZ"].forEach(item=>{
		switch (item) {
			case "ZJ":
				entitys.us_thjlglEntity[item] = generateGUID();
				break;
			case "ZJFHM":
				entitys.us_thjlglEntity[item] = reqquery.CallNo.trim();
				break;
			case "BJFHM":
				entitys.us_thjlglEntity[item] = reqquery.CalledNo.trim();
				break;
			case "LDSJ":
				entitys.us_thjlglEntity[item] = reqquery.Begin.trim();
				break;
			case "THSJ":
				entitys.us_thjlglEntity[item] = 0;
				break;
			case "SFJT":
				entitys.us_thjlglEntity[item] = reqquery.State.trim() === "dealing" ? 1 : 0;
				break;
			case "QYBZ":
				entitys.us_thjlglEntity[item] = 1;
				break;
			case "GXR":
				entitys.us_thjlglEntity[item] = "null";
				break;
			case "CJR":
				entitys.us_thjlglEntity[item] = "null";
				break;
			case "GXSJ":
				entitys.us_thjlglEntity[item] = now;
				break;
			case "CJSJ":
				entitys.us_thjlglEntity[item] = now;
				break;
			case "BZ":
				entitys.us_thjlglEntity[item] = "null";
				break;
			default:
				break;
		}
	})

	return entitys.us_thjlglEntity;
}

module.exports.generateParamArray = function(reqquery){
	let array = [];
	for(var key in reqquery){
		if(reqquery.hasOwnProperty(key))
		{
			array.push(reqquery[key]);
		}
	}
	return array;
}


function generateGUID(){
	return crypto.createHash('md5').update((new Date).valueOf().toString()).digest('hex');
}
function formateDate(fmt){ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

module.exports.generateGUID = generateGUID;
