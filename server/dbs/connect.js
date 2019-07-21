const mysql = require('mysql');
const config = require('./config')
//	创建连接
const connection = mysql.createConnection(config);

//	连接数据库
connection.connect();

//  数据库操作
/* connection.query('SQL语句', function(error, results, fields){
    //	error 错误对象
    //	results 成功结果
}); */

module.exports = connection

//	关闭数据库 
// connection.end();