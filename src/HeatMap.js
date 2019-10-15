import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3'
class HeatMap extends Component {
   constructor(props){
      super(props)
      this.state={
        svgcount:0,
        width:0,
        height:0,
        test:1, dataset_length:5,attribute_length:0,
      }
      this.createHeatMap = this.createHeatMap.bind(this)
      this.prep = this.prep.bind(this)
      this.prep2 = this.prep2.bind(this)
   }
   componentWillMount(){
    var multiplier=18; // multiplier defines the cell size
//----------Main display
    if(this.props.display=='main'){
      if(this.props.commonA.length<15){
        //console.log("less than 10")
        this.setState({width:this.props.commonA.length*multiplier + 620})
      }
      else{
        console.log(this.props.commonA.length)
        this.setState({width:this.props.commonA.length*multiplier + 420})
      }

      this.setState({attribute_length: this.props.commonA.length});
      this.setState({height:this.props.datasets.datasets.length*multiplier + 120})
      this.setState({dataset_length: this.props.datasets.datasets.length});
    }
//----------
    else if(this.props.count==1){
      if(this.props.commonA.length<15){
        //console.log("Child is with count==1")
        this.setState({width:this.props.commonA.length*multiplier + 620})
      }
      else{
        console.log(this.props.commonA.length)
        this.setState({width:this.props.commonA.length*multiplier + 420})
      }
      this.setState({attribute_length: this.props.commonA.length});
      this.setState({height:this.props.gdatasets.length*multiplier + 120})
      this.setState({dataset_length: this.props.gdatasets.length});
    }
//----------child display
    else if(this.props.display=='child' && this.props.count!=1){
      if(this.props.commonA.length<15){
        //console.log("Child is with count!=1")
        this.setState({width:this.props.commonA.length*multiplier + 620})
      }
      else{
        console.log(this.props.commonA.length)
        this.setState({width:this.props.commonA.length*multiplier + 420})
      }
      this.setState({attribute_length: this.props.commonA.length});
      this.setState({height:this.props.gdatasets.length*multiplier + 10})
      this.setState({dataset_length: this.props.gdatasets.length});
    }
    else{
      this.setState({width:this.props.clickedA.length*multiplier + 350})
      this.setState({height:this.props.gdatasets.length*multiplier + 120})
      this.setState({dataset_length: this.props.gdatasets.length});
      this.setState({attribute_length: this.props.clickedA.length-1});
    }
  
  }
  //--------------------------------Prepare for HeatMap here
   prep(mydata,commonA){
    var arr=[]
    for (var i=0;i<mydata.datasets.length;i++){
        for(var j=0;j<commonA.length;j++){
            var arr2=[];
            arr2.push(mydata.datasets[i]);
            arr2.push(commonA[j])
            arr2.push(mydata.matrix[i][j]);
            //console.log(mydata.datasets[i],mydata.matrix[i][j],commonA[j]);
            arr.push(arr2);
        }
        
    }
    return arr;
}
prep2(mydata,commonA,gdatasets){
  var arr=[]
  for (var i=0;i<mydata.datasets.length;i++){
      for(var ai=0;ai<gdatasets.length;ai++){
          if(mydata.datasets[i]==gdatasets[ai]){
              for(var j=0;j<commonA.length;j++){
                  var arr2=[];
                  arr2.push(mydata.datasets[i]);
                  arr2.push(commonA[j])
                  arr2.push(mydata.matrix[i][j]);
                  //console.log(mydata.datasets[i],mydata.matrix[i][j],commonA[j]);
                  arr.push(arr2);
              }
          }    
      }
  }
  //console.log('prep2',arr)
  return arr;
}
   //------------CreateHeatMap starts here
   createHeatMap() {
    const node = this.node
    if(this.props.display=='main' || this.props.count==1){
      var margin = {top: 100, right: 40, bottom: 20, left: 80};
    }
    else{
      var margin = {top: 5, right: 40, bottom: 5, left: 80};
    }
    var width = this.state.width - margin.right - margin.left,
    height = this.state.height - margin.top - margin.bottom;
    if(this.props.display=='main'){
      var data=this.prep(this.props.datasets,this.props.commonA)
    }
    //-------only combinationed attributes
    else if(this.props.display=='minimum'){
      var data=this.prep2(this.props.datasets,this.props.clickedA,this.props.gdatasets)
    }
    else{
      var data=this.prep2(this.props.datasets,this.props.commonA,this.props.gdatasets)
    }
    //console.log(data);
    var x_elements = d3.set(data.map(function( d ) { return d[1]; } )).values();
    //console.log(x_elements);
    var y_elements = d3.set(data.map(function( d ) { return d[0]; } )).values();
    
// Ordinal Scaling for X axis
    var xScale = d3.scale.ordinal()
      .domain(x_elements)
      .rangeBands([0, width]);
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .tickFormat(function (d) {
          return d;
      })
      .orient("top");
     // console.log(width)
//Ordinal Scaling for Y axis
    var yScale = d3.scale.ordinal()
      .domain(y_elements)
      .rangeBands([0, height]);
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .tickFormat(function (d) {
          return d;
      })
      .orient("left");
//--------- d3 Select starts here
    var svg = d3.select(node)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      d3.select(node)
      .selectAll('rect')
      .data(data)
      .exit()
      .remove()
//-------------------------------------------------------------------------------------- Main view starts here
if(this.props.display=='main'){
          d3.select(node)
          .selectAll('rect')
          .data(data)
          .attr('class', 'cell')
          .attr('id',(d,i)=>"cell"+i)
          .attr('width', width/(this.state.attribute_length)-1)
          .attr('height', height/(this.state.dataset_length)-1)
          .attr('y', function(d) { return yScale(d[0]); })
          .attr('x', function(d) { return xScale(d[1]); })
          .attr('fill', (d)=> d[2]!=='n'? 'rgb(158,154,200)':"rgb(247,247, 247)")
//--x axis
svg.append("g")
.attr("class", "x axis")
.call(xAxis)
.selectAll('text')
.attr("id",(d,i)=> 'text'+i)
.style("text-anchor", "start")
.attr('fill',(d,i)=>{
  if(this.props.clickedA){
    if(this.props.clickedA.includes(i)){
      return('red');
    }
  }
  
})
.attr("dx", "1em")
.attr("dy", ".6em")
.on('click',(d,i)=> {
  // assign function only for main matrix
  if(this.props.display=='main'){
    this.props.clickhandler('text'+i,i,'x');
  }
  // else can be applied for
})
.attr("transform", function (d) {
    return "rotate(-45)";    
});      
//------------------------------------------------------- Y Axis
svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .selectAll('text')
      .on('click',(d,i)=>{
        this.props.clickhandler(this.props.gdatasets,i,'popup2');
      })
      .attr('font-weight', 'normal');
//------------------------------------------------------- Border starts here
var colors = d3.scale.linear()
.domain([0,1,2,3,4])
.range(["#9321ff","yellow","#93215f","red","#31c514"]);
var x = Math.floor((Math.random() * 4) + 1);
svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", height)
      .attr("width", width)
      .style("stroke",function (d,i) {
        return colors(x);    
    })
      .style("fill", "none")
      .style("stroke-width", 3);
}
//Main view ends here
//-------------------------------------------------------------------------------------- childview starts here
if(this.props.display=='child'){
  d3.select("#svg0").remove();
  d3.select(node)
  .selectAll('rect')
  .data(data)
  .attr('class', 'cell')
  .attr('id',(d,i)=>"cell"+i)
  .attr('width', width/(this.state.attribute_length)-1)
  .attr('height', height/(this.state.dataset_length)-1)
  .attr('y', function(d) { return yScale(d[0]); })
  .attr('x', function(d) { return xScale(d[1]); })
  .attr('fill', (d)=> d[2]!=='n'? 'rgb(158,154,200)':"rgb(247,247, 247)")
//--x axis
if(this.props.count==1){
  svg.append("g")
  .attr("class", "x axis")
  .call(xAxis)
  .selectAll('text')
  .attr("id",(d,i)=> 'text'+i)
  .style("text-anchor", "start")
  .attr('fill',(d,i)=>{
  if(this.props.clickedA){
  if(this.props.clickedA.includes(i)){
  return('red');
  }
  }
  
  })
  .attr("dx", "1em")
  .attr("dy", ".6em")
  .on('click',(d,i)=> {
  // assign function only for main matrix
  if(this.props.count==1){
  this.props.clickhandler('text'+i,i,'x');
  }
  // else can be applied for
  })
  .attr("transform", function (d) {
  return "rotate(-45)";    
  });
}      
//----------Y Axis
svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.selectAll('text')
.on('click',(d,i)=>{
this.props.clickhandler(this.props.gdatasets,i,'popup2');
})
.attr('font-weight', 'normal');
//------Border starts here
var colors = d3.scale.linear()
.domain([0,1,2,3,4])
.range(["#9321ff","yellow","#93215f","red","#31c514"]);
var x = Math.floor((Math.random() * 4) + 1);
svg.append("rect")
.attr("x", 0)
.attr("y", 0)
.attr("height", height)
.attr("width", width)
.style("stroke",function (d,i) {
return colors(x);    
})
.style("fill", "none")
.style("stroke-width", 3);
}
//Child view ends here
}
//CreateMap ends here
componentDidMount() {
  this.createHeatMap()
}
componentDidUpdate() {
  this.createHeatMap()
}

shouldComponentUpdate(nextProps, nextState){
  if(this.props.display=='main'){
    return false;
  }
  else if(this.props.commonA===nextProps.commonA){
    return false;
  }
  else if(this.props.display=="child"){
    return false;
  }
  else{
    console.log(' else ');
    return true;
  }
}

render() 
{
  //console.log(this.props.count)
      return(
      <div style={{display:'block'}}>
      <svg className="svgRectContainer" id={this.props.display=="main"? "svg0" :"svg"+this.props.count} ref={node => this.node = node}
      width={this.state.width} height={this.state.height}>
      </svg> 
      </div>
      
    )
}
}
export default HeatMap