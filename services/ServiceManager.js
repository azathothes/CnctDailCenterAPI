const Promise = require('bluebird');

const pool = require('../db/db');

function ExecSql(sql,params){
	return new Promise((resolve,reject)=>{
		pool.getConnection((err,conn)=>{
			if(err)
			{
				reject(err);
			}
			else
			{
				conn.query(sql,params,(err,result)=>{
					if(err)
					{
						reject(err);
					}
					else
					{
						conn.release();
						resolve(result);
					}
				});
			}
		})
	});
}

module.exports = ExecSql;
