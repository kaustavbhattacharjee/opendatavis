import React,{Component} from 'react';
import * as d3 from "d3";
class PieChart extends Component{
  handleClick(d) {
    console.log(d);
   }
render(){
console.log(this.props.dataset)
const width = 160;
const height = 250;
const colour = d3.scale.category10();
var myscale;
if(d3.min(this.props.dataset)==d3.max(this.props.dataset)){
  myscale=d3.scale.linear()
  .domain([0,d3.max(this.props.dataset)])
  .range([0, height])
}
else{
  myscale=d3.scale.linear()
  .domain([d3.min(this.props.dataset),d3.max(this.props.dataset)])
  .range([0, height])
}
return(
<div>
  <svg width={width} height={height}>
    <g>
      {this.props.dataset.map((d,i)=>( <rect key={i}  className="rec" fill={colour(d)} x={i*2+1} y={height/2-myscale(d)} width='5' height={myscale(d)} > </rect>))}
    </g>
    <text y={180}>{this.props.attribute}</text>
  </svg>
</div>
)
}}
export default PieChart;
