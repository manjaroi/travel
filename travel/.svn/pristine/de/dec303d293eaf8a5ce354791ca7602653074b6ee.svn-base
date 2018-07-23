var express = require("express");
var path = require("path");
const bparser = require('body-parser');
var user = require("./user");
var back = require("./back");
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,auth");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);
    } else{
      next();
    }
});

app.use(express.static(path.join(__dirname, '../../../Web/src')));
app.use(bparser.urlencoded({ extended: false }));


module.exports = {
  start : function(port){
    user.login(app);
    user.getList(app);
    user.register(app);
    back.getDatas(app);
    back.getCounts(app);
    back.addForm(app);
    back.removeRoute(app);
    back.modifyForm(app);
    back.backLogin(app);
    back.verifytoken(app);
    app.listen(port || 8080);
  }
}