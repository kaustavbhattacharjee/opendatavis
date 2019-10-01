import React, { Component } from 'react'
import Barchart from './Barchart';
class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result:{},
      number_of_datasets:1,
      dataset: [5,10,12,15,18,22,25,12,35,18,5,40,12,35,18,55,10,112,75,18,65,110,112,55,68,15,110,122,125,118,5,10,12,15,18,22,25,12,35,18,5,40],
    probdiv:{},
    }
this.jsonHandler2 = this.jsonHandler2.bind(this);
this.creatdis = this.creatdis.bind(this);
  }
  jsonHandler2(){
    const self=this;
    var url = "http://ec2-18-217-239-9.us-east-2.compute.amazonaws.com:5000/json2";
    var data = {datasets: this.props.data};
    //console.log(data)
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      self.setState({result:response},()=>{
        this.creatdis();
      })
      //console.log(response)
      return response;
    }).catch(error => console.error('Error:', error));
  }
  creatdis(){
    var len=Object.keys(this.state.result).length;
    console.log(len)
    if(len>0){
      this.setState({number_of_datasets:len})
      var temp={}
      for(var i in this.state.result){
        var res=this.state.result;
        var arr=[]
        Object.keys(this.state.result[i]).map(function(key, index) {
          //console.log(key,res[i][key])
          arr.push(<Barchart dataset={res[i][key]} Aname={key} key={i}></Barchart>)
        });
       temp[i]=arr;         
      }
      //console.log(temp)
      this.setState({probdiv:temp})
    }
  }
  componentDidMount(){
    this.jsonHandler2()
  }
  componentDidUpdate(){
  }
    render() { 
      if(Object.keys(this.state.probdiv).length>0){
      this.props.data.map(d=>{
        console.log(d)
      })
    }
      return (
        <div className='popup'>
          <div className='popup_inner'>
          <button className="btn btn-info" onClick={this.props.closePopup}>close</button>
          </div>
          <div className="popdiv">
{/* conatiner starts here */}
          <div className="container">
            <div className="row">
              {
              this.props.data.map(d=>{
              var a="col-sm-"+12/this.props.data.length;
              return <div className={a}>
                        <div> {d} </div>
                        {this.state.probdiv[d]}
                      </div>
                  })
              }
              </div>    
            </div>
            </div>
{/* conatiner ends here */}
          </div>
          
        
      );
    }
  }
  export default Popup;