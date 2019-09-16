import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3'
class Barchart extends Component {
   constructor(props){
      super(props)
      this.state={
        width:200,
        height:100,
      }
    }
//---------------------------------------------------------------------------createBarchart starts here
  createBarchart(){
const node = this.node
var dataset=this.props.dataset;
var margin=10;
var h=this.state.height - margin;
var w=this.state.width;
var rectwidth=w/dataset.length-.4;
const xScale=d3.scale.linear()
        .domain([0,dataset.length])
        .range([0,w])
const yScale=d3.scale.linear()
        .domain([0,1])
        .range([0,h])
const svg = d3.select(node).append("svg").attr('height',h).attr('width',w)
svg.selectAll('rect')
.data(dataset)
.enter()
.append('rect')
.attr("x",function(d,i){
    return xScale(i);
})
.attr("y",function(d){
    return h - yScale(d);
})
.attr("width",rectwidth)
.attr("height",function(d,i){
    return yScale(d);
})
.attr('fill',"green");
//---------------------------------------------------------

d3.select(node).append("text")    
        .attr("x", w/2 )
        .attr("y",  h + margin-2 )
        .style("text-anchor", "middle")
        .style("font-size",".6em")
        .text(this.props.Aname);
//Define Y axis
var yAxis = d3.svg.axis()
      .scale(yScale)
      .tickFormat(function (d) {
          return d;
      })
      .orient("left");
//Create Y axis
svg.append("g").attr("class", "y axis").call(yAxis);      
}

componentDidMount() {
    this.createBarchart()
}
  componentDidUpdate() {
    this.createBarchart()
  }
      render() 
      {
            return(
            <svg ref={node => this.node = node} width={this.state.width} height={this.state.height}>
            </svg> 
          )
      }
      }
export default Barchart