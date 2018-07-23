var db = require("../db/dbHelper");
module.exports = {
	login : function(app){
		app.post("/login",function(req,res){
			let data = {
                name: req.body.username,
                password: req.body.password
            }
	            let sql = `select * from user where phone = '${data.name}' and password = '${data.password}'` ;
	          	db.mysql.execute(sql).then(function(result){
	          		if(result.length > 0){
	          			res.send({status:true});
	          		}else {
	          			res.send({status:false,msg:"用户名或密码错误"});
	          		}
	          	res.end();
          	});
 		});
	},
	register : function(app){
        app.post("/register",function(req,res){
            let data = {
                name: req.body.username,
                password: req.body.password
            };

			let sql = `select * from user where phone = '${data.name}' ` ;
            db.mysql.execute(sql).then(function(result){
                    if(result.length > 0){
                        res.send({status:false,message:'用户名已被注册'});
                    }else {
						let tsql = `insert into user(phone,password) values('${data.name}','${data.password}')`;
                        db.mysql.execute(tsql).then(function(result){
                            if(result){
                                res.send({status:true});
                            }else{
                                res.send({status:false,mesage:'注册失败'});
                            }
                        });
                    }
                
            });
        });

    },
	getList : function(app){
		app.get("/travel",function(req,res){
			let page = req.query.page;
			let qty = req.query.qty;
			let start;
			if(page && qty){
				start = (page - 1) * qty;
			}else {
				page = 1;
				qty = 15;
				start = (page - 1) * qty;
			}
			var sql = `select * from products limit ${start},${qty}`;
		
			db.mysql.execute(sql).then(function(datas){
				res.send(datas);
			});
		});
	}
	
}
