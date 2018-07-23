const db = require("../db/dbHelper");
const jwt = require('jsonwebtoken');

module.exports = {
	getDatas : (app) => {
		app.post("/getDatas",(req,res) => {
			var params  = {
				page : req.body.page,
				qty : req.body.qty || 10
			};
			let start = (params.page - 1) * params.qty;
			var sql = `select * from products limit ${start},${params.qty}`;
			// var sql2 = "select count(*)total from products";
			db.mysql.execute(sql).then((datas) => {
				res.send(datas);
			});
 		});
	},
	getCounts : (app) => {
		app.get("/counts",(req,res) => {
			var sql = `select count(*)total from products`;
			db.mysql.execute(sql).then((datas) =>{
				res.send(datas);
			});
		});
	},
	addForm : (app) => {
		app.post("/addForm",(req,res) => {
			var params = {
				route : req.body.route,
				price : req.body.price,
				place : req.body.place,
				time : req.body.time,
				pic : req.body.pic
			}
			let sql = `insert into products(name,price,start_place,date,imgurl) values('${params.route}',${params.price},'${params.place}','${params.time}','${params.pic}')`
			db.mysql.execute(sql).then((datas) =>{
				res.send(datas);
			});
		})
	},
	removeRoute : (app) => {
		app.post("/removeRoute",(req,res) => {
			let routeId = req.body.routeId;
			let sql = `delete from products where id = ${routeId}`;
			db.mysql.execute(sql).then((datas) =>{
				res.send(datas);
			});
		})
	},
	modifyForm : (app) => {
		app.post("/modifyForm",(req,res) => {
			let params = {
				routeId :req.body.routeId,
				route : req.body.route,
				price : req.body.price,
				place : req.body.place,
				time : req.body.time,
				pic : req.body.pic
			}
			
			let sql = `update products set name = '${params.route}',price = "${params.price}", 
			start_place = "${params.place}", date = '${params.time}', imgurl = "${params.pic}" where id = ${params.routeId}`;
			db.mysql.execute(sql).then((datas) =>{
				res.send(datas);
			});
		})
	},
	backLogin : (app) => {
		app.post("/backLogin",(req,res) => {
			let username = req.body.username;
			let password = req.body.password;
			let sql = `select * from user where phone = '${username}' and password = '${password}'`;
			db.mysql.execute(sql).then((result) => {
				if(result.length > 0){
					let secret = 'kh_token';
					//生成 Token
				    let token = jwt.sign({username:username,password:password}, secret, {
				        'expiresIn': 60*30 //30分钟过期
				    })      
				    res.send({status: true, token});
				}else{
					res.send({status:false,msg:"用户名或密码错误"});
				}
			})
			
		});
	},
	verifytoken : (app) => {
		app.post("/verifytoken",(req,res) => {
			 let secret = 'kh_token';
			let token = req.headers['authorization'];
    		 if(!token){
        		res.send({status: false, message: 'token不能为空'});
    		}
    		jwt.verify(token, secret, (error, result) => {
		        if(error){
		            res.send({status: false});
		        } else {
		            res.send({status: true, data: result});
		        }
		    });
		});
	}

	
	
}
