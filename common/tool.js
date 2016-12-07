"use strict"
const crypto = require('crypto');
const entitys = require('../entitys/Entity');
const mysql = require('mysql');
module.exports.checkQueryStringForTHZTTS =(req)=>{
	let params = req.query;

	if( !params.CallNo 
		||!params.CallNo
		||!params.CalledNo
		||!params.CallSheetID
		||!params.CallType
		||!params.Ring
		||!params.Begin
		||!params.End
		||!params.QueueTime
		||!params.Agent
		||!params.Exten
		||!params.Queue
		||!params.State
		||!params.RecordFile
		||!params.FileServer
		||!params.Province
		||!params.District )
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
	for (var key in entitys.us_thjlglEntity) {
		if(entitys.us_thjlglEntity.hasOwnProperty(key))
		{
			if(reqquery[key])
			{
				entitys.us_thjlglEntity[key] = reqquery[key];
			}
		}
	}
	
	["ZJ","ZJFHM","BJFHM","LDSJ","THSJ","SFJT","QYBZ","GXR","CJR","GXSJ","CJSJ","BZ"].forEach(item=>{
		switch (item) {
			case "ZJ":
				entitys.us_thjlglEntity[item] = generateGUID();
				break;
			case "ZJFHM":
				entitys.us_thjlglEntity[item] = reqquery.CallNo;
				break;
			case "BJFHM":
				entitys.us_thjlglEntity[item] = reqquery.CalledNo;
				break;
			case "LDSJ":
				entitys.us_thjlglEntity[item] = mysql.escape(reqquery.Begin);//reqquery.Begin = "2014/2/21 12:22:32"
				break;
			case "THSJ":
				entitys.us_thjlglEntity[item] = mysql.escape(reqquery.End);
				break;
			case "SFJT":
				entitys.us_thjlglEntity[item] = reqquery.State === "dealing" ? 1 : 0;
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
				entitys.us_thjlglEntity[item] = formateDate.call(now,'yyyy-MM-dd hh:mm:ss');
				break;
			case "CJSJ":
				entitys.us_thjlglEntity[item] = formateDate.call(now,'yyyy-MM-dd hh:mm:ss');
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
	return crypto.createHash('md5').digest('hex');
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

/*CallNo=12232212232
&CalledNo=12232212232
&CallSheetID=asdsadsasdsda-asdas-asd-asd
&CallType=normal
&Ring=30
&Begin=2016/2/3 12:33
&End=2016/2/3 12:33
&QueueTime=232
&Agent=testagent
&Exten=testExten
&Queue=testQueue
&State=testState
&RecordFile=testfile.mp3
&FileServer=c:/test/kk
&Province=四川
&District=成都*/