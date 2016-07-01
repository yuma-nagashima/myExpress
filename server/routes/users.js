var express = require('express');
var router = express.Router();
var pg = require('pg');

// POST したデータをパースするために body-parser が別途必要
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

router.post('/', (req, res, next)=> {

  // 接続設定 下のような構成で記述する 
  // tcp://ユーザー:パスワード@IPアドレス:ポート番号/データベース
  var connectionString = "postgres://root:7lYstAciHZ446Y@vr-rapid.czu7x2h3nbea.ap-northeast-1.rds.amazonaws.com:5432/vrrapid";

  // pg.connect(接続先, コールバック関数)
  pg.connect(connectionString, (err, client)=>{

    let user_name = req.body.user_name;
    console.log(user_name);

    let query = client.query("SELECT user_id, user_name,busi_name FROM com_m_user");
    if(user_name){
      query =client.query("SELECT user_id, user_name,busi_name FROM com_m_user WHERE user_name LIKE $1", ['%' + user_name +'%']);
    }
    let rows = [];
    query.on('row',(row)=>{
      rows.push(row);
    });
    query.on('end',(row,error)=>{
      res.send({rows:rows,message:'Success'});
    });
    query.on('error',(error)=>{
      res.send({rows:null,message:'Error',error:error});
    });

  });
});

module.exports = router;
