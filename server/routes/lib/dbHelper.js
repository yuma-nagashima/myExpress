var mssql = require('mssql');

/**
 * DBに接続してSQLを実行する
 * @param sql 実行したいSQL
 * @param params SQLに指定するパラメータ（name,type,valueの配列）
 * @param callback SQL実行後、処理するイベント
 */
exports.query = function(sql, params, callback) {
  let config = {
    user: 'systoukei',
    password: 'systoukeisystoukei',
    server: 'WORKSERVER02',
    database: 'WorkManager',
    stream: true, // You can enable streaming globally
    options: {
      encrypt: true // Use this if you're on Windows Azure
    }
  };

  mssql.connect(config, function(err) {
    
    var errors = [];

    if (err) {
      errors.push(err);
      return callback(errors,null);
    }

     let request = new mssql.Request();

     //パラメータセット
     for (let i=0; i<params.length; i++){
      request.input(params[i].name, params[i].type, params[i].value);
     }
     
    //SQL実行
    var result = [];
    var records = [];
    request.query(sql);
    request.on('recordset', function(columns) {
      // Emitted once for each recordset in a query
      //console.log(columns);
      var rec = {
        columns:columns,
        records: []
      };
      result.push(rec);
    });

    request.on('row', function(row) {
      // Emitted for each row in a recordset
      result[result.length - 1].records.push(row);
    });

    request.on('error', function(err) {
      // May be emitted multiple times
      errors.push(err);
    });

    request.on('done', function(returnValue) {
      console.log(returnValue);
      // Always emitted as the last one
      if (errors.length == 0) {
        callback(null, result);
      } else {
        callback(errors, result);
      }
      mssql.close();
    });
  });
}