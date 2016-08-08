import React, { Component } from 'react';
import request from  'superagent';

export default class calendar extends Component {
  constructor(props) {
    super(props);

    //現在日時を取得
    let d = new Date();

    //状態を保存
    this.state = {year:d.getFullYear(),month:d.getMonth(),days:[]};

    ////メソッドをバインド
    this.moveMonths = this.moveMonths.bind(this);
  }

  componentDidMount(){
    this.moveMonths(0);
  }
  
  moveMonths(n){

    let y = this.state.year;
    let m = this.state.month;

    //新しい年月をセット
    m=m+n;
    if (m > 11) {
      y += 1;
      m -= 12;
    }
    if(m < 0){
      y -= 1;
      m += 12;
    }

    //一列目の日曜日が何日前かを取得
     var d = 1;
     var firstdate= new Date(y,m,d);
     if(firstdate.getDay() !=0){
      for(d=0; d>-6; d--){
        var firstdate= new Date(y,m,d);
        if(firstdate.getDay() ==0){
          break;
        }
      }
    }

    //日付データを格納
    var days = new Array(6);
    for (var i=0; i<days.length; i++){
      days[i] = new Array(7);
      for (var j=0; j<days[i].length; j++){
        var dispdate = new Date(y,m,d);
        //days[i][j]=dispdate;
        days[i][j]={date:dispdate,checked:false};
        d++;
      }
    }

    this.setState({year:y,month:m,days:days});  //結果格納
  }

  changeSelection(i,j){
      let days = this.state.days;
      days[i][j].checked = !days[i][j].checked;
      this.setState({days:days});  //結果格納
      //console.log(i + ',' + j + days[i][j].checked);
  }

  render() {
      return (
        <div>
          <table  className="calendar_table">
            <thead>
              <tr>
                  <th><a href='#' onClick={this.moveMonths.bind(this,-1)} title='先月へ移動'>&lt;</a></th>
                  <th colSpan='5'>{this.state.year}年{this.state.month+1}月</th>
                  <th><a href='#' onClick={this.moveMonths.bind(this,1)} title='来月へ移動'>&gt;</a></th>
              </tr>
              <tr>
                <td>Sun</td>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.days.map((row,i)=> {
                  return(
                    <tr>
                      {(()=>{
                        var tds =[];
                        for(var j=0; j<7;j++){
                          var id = i + '-' + j;
                          if (row[j].date.getMonth() == this.state.month){
                            tds.push(
                              <td><input id={id} type='checkbox' className='tgl tgl-flip' ref={row[j].date} checked={row[j].checked} onClick={this.changeSelection.bind(this,i,j)} />
                              <label data-tg-off={row[j].date.getDate()} data-tg-on={row[j].date.getDate()} htmlFor={id} className='tgl-btn' /></td>
                              );
                          }
                          else{
                            tds.push(<td className="otherMonth">{row[j].date.getDate()}</td>);
                          }
                        }
                        return tds;
                      })()}
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      );
  }
}