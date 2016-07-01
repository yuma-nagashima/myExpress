import React, { Component } from 'react';
import request from  'superagent';

export default class PageA extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    // console.log(this.props);
    this.state = {data:[]};

    this.getUsers = this.getUsers.bind(this);
  }

  //ユーザ一覧取得
  getUsers() {
    request.get("/users")  //GETメソッドで取得
      .end((err, res) =>{
        if (err) {
          console.log(err);
        } else {
          //console.log(res.body);
          this.setState({data: res.body.rows});  //結果格納
        }
      });
  }

  componentDidMount(){
    this.getUsers();
  }

  render() {
      return (
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
      );
  }
}