//var React = require('react');
//var ReactDOM = require('react-dom');
import React from 'react';
import ReactDOM from 'react-dom';
var request = require("superagent");

var App = React.createClass({
  //初期状態取得
  getInitialState: function() {
    return {
        data: [],
        test:'aaaaa'
      };  //結果を初期化
  },
  //ユーザ一覧取得コンポーネント
  getUsers:function() {
    request.get("/users")  //GETメソッドで取得
      .end(function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(res.body);
          this.setState({data: res.body.rows});  //結果格納
        }
      }.bind(this));
  },
  //コンポーネントのマウント
  componentDidMount:function(){
    this.getUsers();
  },
  //描画
  render:function()  {
    return (
      <div>
        <h1>Reactテスト</h1>
        <p>{this.state.test}</p>
        <table  className="fixed_headers">
          <thead>
            <tr>
              <th>#</th>
              <th>user_id</th>
              <th>user_name</th>
              <th>busi_name</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(row,i) {
                return(
                  <tr key={row.user_id}>
                    <td>{i+1}</td>
                    <td>{row.user_id}</td>
                    <td>{row.user_name}</td>
                    <td>{row.busi_name}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
});

ReactDOM.render(
    <App />,
    document.getElementById('content')
);