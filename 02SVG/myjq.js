$(document).ready(function() {
    var a=$("#one");
    var b=$("#two");
    var c=$("#three")
    var r1=$("#r1")
    //drawline("#line",a,c);
    //$("#line").clone().addClass("clone").insertAfter($("#line"));
    drawline("clone1",a,r1)
    drawline("clone2",a,b)

});

function drawline(myline,myPoint,myPoint2){
$("#line").clone().addClass(myline).insertAfter($("#line"));
var x1 = $(myPoint).offset().left + ($(myPoint).width()/2);
var y1 = $(myPoint).offset().top + ($(myPoint).height()/2);
var x2 = $(myPoint2).offset().left + ($(myPoint2).width()/2);
var y2 = $(myPoint2).offset().top + ($(myPoint2).height()/2);
$('.'+myline).attr('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2);  //svg attributes
console.log(x1,y1,x2,y2)
}
