import React, { Component } from 'react';
import './App.css';
import HeatMap from './HeatMap';
import Popup from './Popup';
import $ from "jquery"
import * as algorithms from './algorithms';
//import * as d3 from 'd3'
class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    viewgrouptracker:2,
    unionmade:[],
    arr:[],
    clickedA:[],
    groups:[],
    key:0,
    componentDidUpdatecounter:0,
    matrixdata:{},
    sorted_groups:[],
    mydata2: {},
    popupdata:"",
    popupdata2:"",
  }
 this.child_view=this.child_view.bind(this);
 this.sort_by_dataset=this.sort_by_dataset.bind(this);
 this.Unionmaker=this.Unionmaker.bind(this);
 this.attribute_click_handler=this.attribute_click_handler.bind(this);
 this.togglePopup=this.togglePopup.bind(this);
 this.linedraw.bind=this.linedraw;
 this.matrixgenerator.bind=this.matrixgenerator;
 this.jsonHandler = this.jsonHandler.bind(this);
};
//----------------------------------------------------Union Maker
Unionmaker(mydata){
  var mySet= new Set();
  for(var key in mydata){
      for(var i=0;i<mydata[key].length;i++){
          mySet.add(mydata[key][i]);
      }
      }
return Array.from(mySet);
}
//----------------------------------------------------------------------------------------------------------Child_view based on clicked attributes
child_view(){
  this.linedraw()
  this.keyhandler();
  var mySet=new Set();
  for(var i=0;i<this.state.clickedA.length;i++){
    mySet.add(this.state.clickedA[i])
  }
  var index=Array.from(mySet);
  var combinations2=algorithms.combinationgen2(index);
  var groups_to_vis=[];
var grouped_datasets=algorithms.dataset_grouper(this.state.matrixdata.datasets,this.state.matrixdata.matrix,combinations2,);
for(var j=0;j<grouped_datasets.length;j++){
  if(grouped_datasets[j][1].length>0){
  var a=  
  <
  HeatMap count={j+1} key={String(this.state.key)+j} gdatasets={grouped_datasets[j][1]} combinations={grouped_datasets[j][0]} 
  display='child' mypopup={this.togglePopup} clickedA={this.state.clickedA} clickhandler={this.attribute_click_handler} 
  datasets={this.state.matrixdata} commonA={this.state.unionmade}  
  />

  groups_to_vis.push({'item':a,'totalatt':grouped_datasets[j][0].length,'total_datasets':grouped_datasets[j][1].length});
  }
  this.setState({groups:groups_to_vis});
}
}
//--Sort groups According To datasets 
sort_by_dataset(){
  this.linedraw()
  var a=this.state.groups.sort(function (a, b) {
    return b.total_datasets - a.total_datasets;
  });
  this.setState({sorted_groups:a})
}
//--Sort groups According To attributes 
sort_by_attributes=()=>{
  var a=this.state.groups.sort(function (a, b) {
    return b.totalatt - a.totalatt;
  });
  this.setState({sorted_groups:a})
}
//--Key Handler
keyhandler=()=>{
  var a=this.state.key;
  a++;
  this.setState({key:a})
}
//IndextoAttribute Generator function
index2atrr=(indexArray)=>{
  var result=[];
  for(var i=0;i<indexArray.length;i++){
    //if(typeof(this.state.unionmade[indexArray[i]])!= "undefined"){
      //console.log(this.state.unionmade[indexArray[i]])
      result.push(this.state.unionmade[indexArray[i]]);
    //}
  }
//console.log(algorithms.matrixgen(result,this.state.mydata2))
return result;
}
//-----------------------------------------------------attribute_click_handler starts here
attribute_click_handler(id,index,axis){
//---------------To handle dataset clicks
if(axis=='y'){
  this.setState({popupdata:id})
  //console.log(id)
  this.togglePopup();
}
else if(axis=='popup2'){
  this.setState({popupdata2:id})
  this.togglePopup();
}
else{
  var arr=this.state.clickedA;
  //---------------To remove attributes from array
  if(this.state.clickedA.includes(index)){
    arr = this.state.clickedA.filter(function(e) { return e !== index })
    this.classRemover(id,'textcolor');
  }
  else{
    this.classAdder(id,'textcolor')
    arr.push(index)
  }
  this.setState({clickedA:arr},()=>{
// change Here to implement all attributes or selected attributes
    if(this.state.viewgrouptracker==2){
      this.child_view();
    }
    else{
      this.sort_by_dataset();
    }
  })
}
  }
//----------------------------------------------------- Class Adder
classAdder = (id,class_name)=>{
var element = document.getElementById(id);
//element.style.fill = 'blue';
element.classList.add(class_name);
}
//----------------------------------------------------- Class Remover
classRemover = (id,class_name)=>{
  var element = document.getElementById(id);
  element.classList.remove(class_name);
  }  
//----------------------------------------------------- togglePopup
togglePopup(){
  this.setState({
    showPopup: !this.state.showPopup
  });
}
//---------------------------------------------------------------ComponentDidUpdate
componentDidUpdate(prevState,prevProp){
  this.linedraw()
  return false;  
}
//---------------------------------------------------------------Line draw function starts here
linedraw(){
  var selectedonly=true;
  if(this.state.clickedA.length>0){
    $("#"+"mySVG").show();
  }
  else{
    $("#"+"mySVG").hide();
  }
  $("."+"mylines").remove();
var svgs=$(".svgRectContainer"); var IdArray=[]; for(var i=0;i<svgs.length;i++){ IdArray.push(svgs[i].id)}
// ------------------------------------------------------------Outer for loop for lines starts here
  for(var i=0;i<IdArray.length-1;i++){
    var s1length=$("#"+IdArray[i]).find( ".cell" ).length; // only useful for else
    var cellcount=0;
    if(selectedonly){
// ------------------------------------------------------------number of lines to draw is determined here
  for(var k=0;k<this.state.clickedA.length;k++){
    var j=this.state.clickedA[k]+s1length-this.state.unionmade.length;
    var s1c1=$("#"+IdArray[i]+" #cell"+j);
    var s2c1=$("#"+IdArray[i+1]+" #cell"+cellcount);
    cellcount++;
    var myline=IdArray[i]+j;
    var x1 = $(s1c1).offset().left + ($(s1c1).width()/2);
    var y1 = $(s1c1).offset().top + ($(s1c1).height());
    var y2 = $(s2c1).offset().top;
    if($("."+myline).length==0){
      $("#mySVG").clone().addClass(myline).addClass("mylines").insertBefore($("#mySVG").css({left:x1-2,top:y1+3,width:1,opacity:.8,height:y2-y1-5,backgroundColor:"rgb(158,154,200)"})); 
    }  
  }    
}
//if ends here
else{
    for(var j=s1length-this.state.unionmade.length;j<s1length;j++){
s1c1=$("#"+IdArray[i]+" #cell"+j);
s2c1=$("#"+IdArray[i+1]+" #cell"+cellcount);
cellcount++;
myline=IdArray[i]+j;
var x1 = $(s1c1).offset().left + ($(s1c1).width()/2);
var y1 = $(s1c1).offset().top + ($(s1c1).height());
var y2 = $(s2c1).offset().top;
if($("."+myline).length==0){
  $("#mySVG").clone().addClass(myline).addClass("mylines").insertBefore($("#mySVG").css({left:x1-2,top:y1+3,width:1,opacity:.5,height:y2-y1-5,backgroundColor:"rgb(158,154,200)"})); 
}  
}  
} 
//else ends here
}
  }
//------------------------------------------------------------- Json Handler starts Here
jsonHandler(){
const self=this;
var url = "http://127.0.0.1:5000/json";
var data = {myrequest: 'data'};
fetch(url, {
  method: 'POST', 
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => {
  self.setState({mydata2:response.datasets_with_Attributes})
  self.setState({unionmade:response.only_shared_attributes})
  self.matrixgenerator()
  return response;
}).catch(error => console.error('Error:', error));
}
//-----------------------------------------------------ComponentDidmount
componentDidMount(){
  this.jsonHandler();
}
matrixgenerator(){
  var matrixdata=algorithms.matrixgen(this.state.unionmade,this.state.mydata2);
  this.setState({matrixdata:matrixdata})
}

//-----------------------------------------------------------------Render function starts here  
render() {
  if(Object.keys(this.state.matrixdata).length>0){
  }
    return (
     <div className="container-fluid">
        <div className="row">
              <div className="col-3">
              <button onClick={this.sort_by_dataset} className="btn  btn-outline-secondary">Sort by datasets</button>
              <button onClick={this.sort_by_attributes} className="btn  btn-outline-secondary">Sort by attributes</button>
              <button onClick={this.jsonHandler} className="btn  btn-outline-secondary">Process data</button>
              </div>
              <div className="matrix col-9">
              
              {
                  (Object.keys(this.state.matrixdata).length>0)?<HeatMap key={'key1'} gdatasets={[]} display='main' clickhandler={this.attribute_click_handler} datasets={this.state.matrixdata} commonA={this.state.unionmade} />:"NA"
              }
              { 
                this.state.groups.map( (d,i)=> {
                  if(this.state.clickedA.length>0){return d.item}
                  else{$("#"+"mySVG").hide();}
                })  
              }
              </div>
        </div>      
      { // pop up window starts here
        this.state.showPopup ? 
          <Popup
            data={this.state.popupdata2}
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
       //pop up window ends here
       }
      <div id="mySVG">
      </div>
    </div>
    );
  }
}
export default App;

