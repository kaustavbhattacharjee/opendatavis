import React, { Component } from 'react';
import './App.css';
import HeatMap from './HeatMap';
import Popup from './Popup';
import $ from "jquery"
import axios from 'axios';
import * as algorithms from './algorithms';
import {Button,Row,Col,Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,Modal, ModalHeader, ModalBody, ModalFooter,FormGroup,Input,Label,Form,FormText} from 'reactstrap';
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
    file:{},
    modal: false,
    uploaded_filenames:[],
  }
 this.child_view=this.child_view.bind(this);
 this.sort_by_dataset=this.sort_by_dataset.bind(this);
 this.Unionmaker=this.Unionmaker.bind(this);
 this.attribute_click_handler=this.attribute_click_handler.bind(this);
 this.togglePopup=this.togglePopup.bind(this);
 this.linedraw.bind=this.linedraw;
 this.matrixgenerator.bind=this.matrixgenerator;
 this.jsonHandler = this.jsonHandler.bind(this);
 this.toggle = this.toggle.bind(this);
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
//----------------------------------------------------------------------------Child_view based on clicked attributes
child_view(){
  //this.linedraw()
  this.keyhandler();
  var mySet=new Set();
  for(var i=0;i<this.state.clickedA.length;i++){
    mySet.add(this.state.clickedA[i])
  }
  var index=Array.from(mySet);
  var combinations2=algorithms.combinationgen2(index);
  var groups_to_vis=[];
var grouped_datasets=algorithms.dataset_grouper(this.state.matrixdata.datasets,this.state.matrixdata.matrix,combinations2,);
// Loop through each group and create the heat map
for(var j=0;j<grouped_datasets.length;j++){
var c=j+1;
var a=  
  <
  HeatMap count={c} key={String(this.state.key)+j} gdatasets={grouped_datasets[j]} combinations={[0,1]} 
  display='child' mypopup={this.togglePopup} clickedA={this.state.clickedA} clickhandler={this.attribute_click_handler} 
  datasets={this.state.matrixdata} commonA={this.state.unionmade}  
  />
  groups_to_vis.push({'item':a,'totalatt':5,'total_datasets':grouped_datasets[j].length});
  this.setState({groups:groups_to_vis});
}
}
//--Sort groups According To datasets 
sort_by_dataset(){
  //this.linedraw()
  console.log(this.state.groups)
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
// Class Adder
classAdder = (id,class_name)=>{
var element = document.getElementById(id);
//element.style.fill = 'blue';
element.classList.add(class_name);
}
// Class Remover
classRemover = (id,class_name)=>{
  var element = document.getElementById(id);
  element.classList.remove(class_name);
  }  
togglePopup(){
  this.setState({
    showPopup: !this.state.showPopup
  });
}
componentDidUpdate(prevState,prevProp){
  //this.linedraw()
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
      $("#mySVG").clone().addClass(myline).addClass("mylines").insertBefore($("#mySVG").css({left:x1-2,top:y1+3,width:2,opacity:.8,height:y2-y1-5,backgroundColor:"rgb(158,154,200)","z-index":1})); 
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
var url = "http://ec2-18-217-239-9.us-east-2.compute.amazonaws.com:5000/json";
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
  //this.jsonHandler();
}
matrixgenerator(){
  var matrixdata=algorithms.matrixgen(this.state.unionmade,this.state.mydata2);
  this.setState({matrixdata:matrixdata})
}
toggle() {
  this.setState(prevState => ({
    modal: !prevState.modal
  }));
}
//-----------------------------------------------------------------Upload Files
handleFile=(e)=>{
  let file=e.target.files
  this.setState({file:file})
  var filename_array=[];
  var x = document.getElementById("fileupload");
    for (var i = 0; i < x.files.length; i++) {
      var myfile = x.files[i];
      if ('name' in myfile) {
        filename_array.push(myfile.name)
      }
    }
    this.setState({uploaded_filenames:filename_array})
    //console.log(filename_array);
}
handleUpload=(e)=>{
  let file=this.state.file;
  let formdata=new FormData()
  for (var key in this.state.file) {
  formdata.append('file',this.state.file[key])
  }
  axios({
    url:'http://ec2-18-217-239-9.us-east-2.compute.amazonaws.com:5000/uploader',
    method:"POST",
    headers:{
    authorizition:'Hello'
    },
    data:formdata
  }).then((respose_from_server)=>{
  // then is the response
  alert("Uploaded successfull")  
  console.log(respose_from_server.data)
  },(err)=>{
    console.log(err)
  })
}
//-----------------------------------------------------------------Render function starts here  
render() {
  //console.log(this.state.uploaded_filenames) 
  //console.log(this.state.file)
  if(Object.keys(this.state.matrixdata).length>0){
  }
  return (
    <div>
{ /* Navbar starts here */ }
    <Navbar style={{backgroundColor:"rgb(224,224,224,.3)"}} expand="sm" >
          <NavbarBrand href="/">UrbanForest</NavbarBrand>
          <NavbarToggler/>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Sort by
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.sort_by_attributes}>
                    Atribute
                  </DropdownItem>
                  <DropdownItem onClick={this.sort_by_dataset}>
                    Datasets
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Button color="primary" size="md" onClick={this.jsonHandler}>Process</Button>
              </NavItem>
            </Nav>
          </Collapse>
    </Navbar>
{ /* File Upload (first column starts here) */ }
    <Row className="row1">
        <Col md="2" style={{padding:0,overflow:'auto',marginLeft:3,marginRight:1}} className="upload" >
          <div style={{backgroundColor:"rgb(224,224,224,.3)",width:"100%",height:"700px"}}>
            <FormGroup className="formclass">
              <Input type="file" name="fileupload" id="fileupload" onChange={(e)=>this.handleFile(e)} multiple={true}></Input>
              <Button className="buttonclass" color="info" size="sm" onClick={(e)=>this.handleUpload(e)} block>Upload</Button>
            </FormGroup>
{ /* checkbox starts here */ }     
        <div style={{overflow:'scroll'}}>     
          {this.state.uploaded_filenames.length>0 ? 
            <Form>
        {this.state.uploaded_filenames.map((item)=>{
             return <FormGroup check className="formclass">
              <Label check>
              <Input type="checkbox" />{' '}
                {item.length>23?item.substring(0, 23)+" . .": item}
              </Label>
            </FormGroup>
            })
          }
      <Button className="buttonclass" color="info" size="sm" block onClick={this.jsonHandler}>Process</Button>
            </Form>
                : null
            }
        </div>
      </div>
      </Col>
{ /* Main view starts here */ }
      <Col className="main" style={{backgroundColor:"rgb(224,224,224,.3)",overflow:"scroll",padding:1}}>
          <div>
              {
                  (Object.keys(this.state.matrixdata).length>0)?<HeatMap key={'key1'} gdatasets={[]} display='main' clickhandler={this.attribute_click_handler} datasets={this.state.matrixdata} commonA={this.state.unionmade} />:"Click process to display matrix"
              }
              { 
                this.state.groups.map( (d,i)=> {
                  if(this.state.clickedA.length>0){return d.item}
                  else{$("#"+"mySVG").hide();}
                })  
              }
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
{ /* div for line starts here */ }      
      <div id="mySVG"></div>
      </Col>
        </Row>
{ /* Modal starts here */ }
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="xl" style={{maxWidth: '1600px', width: '90%'}}>
          <ModalHeader toggle={this.toggle}>Modal Title</ModalHeader>
          <ModalBody>
          <Row>
          <Col md="2" style={{padding:1}}>
          <div style={{backgroundColor:"rgb(224,224,224,.3)",width:"100%",height:"400px"}}></div>
          </Col>
          <Col md="10" style={{padding:1}}>
          <div style={{backgroundColor:"rgb(224,224,224,.3)",width:"100%",height:"400px"}}>
          </div>
          </Col>
        </Row>
          </ModalBody>
        </Modal>
{ /* Modal ends here */ }
 
    </div>
    );
  }
}
export default App;

