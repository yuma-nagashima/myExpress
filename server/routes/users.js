var express = require('express');
var pg = require('pg');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  // 接続設定 下のような構成で記述する 
  // tcp://ユーザー:パスワード@IPアドレス:ポート番号/データベース
  var connectionString = "postgres://root:7lYstAciHZ446Y@vr-rapid.czu7x2h3nbea.ap-northeast-1.rds.amazonaws.com:5432/vrrapid";

  // pg.connect(接続先, コールバック関数)
  pg.connect(connectionString, function(err, client){
      // client.query(SQL, コールバック関数)
      client.query("SELECT user_id, user_name,busi_name FROM com_m_user ", function(err, result){
          res.send(result)
      });
  });
});

module.exports = router;
