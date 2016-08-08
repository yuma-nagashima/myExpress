var express = require('express');
var router = express.Router();
var mssql = require('mssql');
var util = require('util');
var dbHelper = require('./lib/dbHelper');

// POST したデータをパースするために body-parser が別途必要
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

/**
 * 交通費取得
 * @param trans_ymd 対象月
 * @param user_id ユーザID
 * @return result 結果,message メッセージ,errors エラー配列
 */
router.get('/:trans_ymd/:user_id', (req, res, next)=> {

  //SQL文生成
  let sql = 'SELECT * FROM T_TRANS';
  sql += ' WHERE';
  sql += ' TRANS_YMD=@TRANS_YMD';
  sql += ' AND USER_ID=@USER_ID';
  sql += ' ORDER BY TRANS_YMD,SEQ_NO';

    //パラメータ生成
  let params =[];
  params[0] ={name:'TRANS_YMD', type:mssql.VarChar, value:req.params.trans_ymd};
  params[1] ={name:'USER_ID', type:mssql.VarChar, value:req.params.user_id};

  //SQL実行
  dbHelper.query(sql,params,function(errors,result){
    console.log(util.inspect(result,false,null));
    if(errors == null){
      res.send({result:result,message:'Success'});
    }
    else{
      res.send({result:null,message:'Error',errors:errors});
    }
  });
});

module.exports = router;
