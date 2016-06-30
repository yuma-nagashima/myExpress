var express = require('express');
var bodyParser = require("body-parser");  // POST したデータをパースするために body-parser が別途必要
var pg = require('pg');

var router = express.Router();

var app = express();
app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {

  // 接続設定 下のような構成で記述する 
  // tcp://ユーザー:パスワード@IPアドレス:ポート番号/データベース
  var connectionString = "postgres://root:7lYstAciHZ446Y@vr-rapid.czu7x2h3nbea.ap-northeast-1.rds.amazonaws.com:5432/vrrapid";

  // pg.connect(接続先, コールバック関数)
  pg.connect(connectionString, function(err, client){

      // client.query(SQL, コールバック関数)
      client.query("SELECT user_id, user_name,busi_name FROM com_m_user ", function(err, result){

          // errにはerrorが発生した場合の情報が格納される
          // resultに取得したデータが格納される
          // 取得したデータ件数を表示する
          console.log("Result:" + result.rows.length);

          // 取得したデータの詳細を表示する
          for(i=0; i < result.rows.length; i++){
              console.log("id=" + result.rows[i].user_id +" name=" + result.rows[i].user_name);
          }

          //pretty: trueでjadeが出力するHTMLを改行＋インデント有りにする
          res.send(result)
      });
  });
});

module.exports = router;
