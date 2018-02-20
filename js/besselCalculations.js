
var functionValue = document.getElementById("functionValue");

var generalV;
var generalName;
var generalColor;


functionValue.oninput = function() {
functionValue.innerHTML = this.value;
  if(functionValue.value == 0){
    $('span.j0').show();
    $('span.j1').hide();
    $('span.j2').hide();
    $('span.j3').hide();
    $('span.j4').hide();
    generalBesselFunctionPlotAnimate(0,"#00f",'J<sub>0</sub>(z)',35);
  }
  else if (functionValue.value == 1){
    $('span.j0').hide();
    $('span.j1').show();
    $('span.j2').hide();
    $('span.j3').hide();
    $('span.j4').hide();
    generalBesselFunctionPlotAnimate(1,"#0f0",'J<sub>1</sub>(z)',35);
  }
  else if (functionValue.value == 2){
    $('span.j0').hide();
    $('span.j1').hide();
    $('span.j2').show();
    $('span.j3').hide();
    $('span.j4').hide();
    generalBesselFunctionPlotAnimate(2,"#f00",'J<sub>2</sub>(z)',35);
  }
  else if (functionValue.value == 3){
    $('span.j0').hide();
    $('span.j1').hide();
    $('span.j2').hide();
    $('span.j3').show();
    $('span.j4').hide();
    generalBesselFunctionPlotAnimate(3,"#ccc",'J<sub>3</sub>(z)',35);
  }
  else {
    $('span.j0').hide();
    $('span.j1').hide();
    $('span.j2').hide();
    $('span.j3').hide();
    $('span.j4').show();
    generalBesselFunctionPlotAnimate(4,"#f0f",'J<sub>4</sub>(z)',35);
  }
  console.log(functionValue.value);
}
/******************** */
var minMax = document.getElementById("min-max");
// var maxValuePlot = minMax.value;
minMax.onchange = function() {
var maxValId = document.getElementById("maxValId");
maxValId.innerHTML = minMax.value;
console.log(generalName,generalColor,generalV,minMax.value);
// generalBesselFunctionPlotAnimate(0,"#00f",'J<sub>0</sub>(z)',35);
generalBesselFunctionPlotAnimate(generalV,generalColor,generalName,minMax.value);

// Plotly.newPlot(TESTER);
// return rePlot;
}
var plotAllOrOne = document.getElementById("plotAllOrOne");
// var maxValuePlot = minMax.value;
plotAllOrOne.onchange = function() {
    if(plotAllOrOne.value == 0){
        Plotly.newPlot(TESTER);
        plotAllTogether(35);
    }
    if(plotAllOrOne.value==1){
        Plotly.newPlot(TESTER);
        generalBesselFunctionPlot(0,"#00f",'J<sub>0</sub>(z)',35);
    }
}

function plotAllTogether(maxvalue){
    generalBesselFunctionPlot(0,"#00f",'J<sub>0</sub>(z)',maxvalue);
    generalBesselFunctionPlot(1,"#0f0",'J<sub>1</sub>(z)',maxvalue);
    generalBesselFunctionPlot(2,"#f00",'J<sub>2</sub>(z)',maxvalue);
    generalBesselFunctionPlot(3,"#ccc",'J<sub>3</sub>(z)',maxvalue);
    generalBesselFunctionPlot(4,"#f0f",'J<sub>4</sub>(z)',maxvalue);
}

function generalBesselFunctionPlot(v,colorVal,nameVal,maxValuePlot){
    generalV = v;
generalColor = colorVal;
generalName = nameVal;

    var trace = {
    x: [],
    y: [],
    // mode: 'bar',
    
    
    type: 'scatter',
    name: nameVal,
    // text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    // hoverlabel: { bgcolor:"gray" },
    line:{
        shape :"spline",
        smoothing:1.3,
        color:colorVal,
        simplify: false},
    
    
  };
  var data = [ trace ];
  
  var layout = { 
    xaxis: {
      range: [ 0, maxValuePlot+2 ], 
    title:"Z"
    },
    yaxis: {
      title:nameVal,
    //   range: [ -1, 1 ] 
    },
    title:'Bessel Function of the First Kind',
    showlegend:true,
    hovermode:'closest'
  };

trace.x=[];
trace.y=[];

  for(var i = 0;i<= maxValuePlot;i+=0.1){
   x1 = i;
   y1 = generalGettingEquation(x1,v);
 //   console.log(y1);
   trace.x.push(x1);
   trace.y.push(y1);
   
  }
  
  TESTER = document.getElementById('myDiv');
  Plotly.plot(TESTER, data, layout);
//   rePlot=Plotly.plot(TESTER, data, layout);

}
//////////////////////////////
function generalBesselFunctionPlotAnimate(v,colorVal,nameVal,maxValuePlot){
generalV = v;
generalColor = colorVal;
generalName = nameVal;

    var trace = {
    x: [],
    y: [],
    // mode: 'bar',
    
    
    type: 'scatter',
    name: nameVal,
    // text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    // hoverlabel: { bgcolor:"gray" },
    line:{
        shape :"spline",
        smoothing:1.3,
        color:colorVal},
    
    
  };
  var data = [ trace ];
  
  var layout = { 
    xaxis: {
        range: [ 0, maxValuePlot+2 ], 
    title:"Z"
    },
    yaxis: {
      title:nameVal
    },
    title:'Bessel Function of the First Kind',
    showlegend:true
  };

// trace.x=[];
// trace.y=[];

  for(var i = 0;i<= maxValuePlot;i+=0.1){
   x1 = i;
   y1 = generalGettingEquation(x1,v);
 //   console.log(y1);
   trace.x.push(x1);
   trace.y.push(y1);
   
  }
  
  TESTER = document.getElementById('myDiv');
  Plotly.animate(TESTER, {data, layout: {
    xaxis:{range: [ 0, maxValuePlot ], },
    yaxis: {range: [-1.1, 1.1],
    title:nameVal}
    }}, {
    transition: {
      duration: 800,
      easing: 'cubic-out'
    }
  });


}
function generalGettingEquation(x,v){

var count = 0;
for (var k = 0;k<50;k++){
   var up = (-(x*x)/4);
   var up2 = Math.pow(up,k);
    var down = factorial(k)*factorial(k+v);
    var sum = up2 / down;
    
    count += sum;
}

// var lhs = Math.pow((x*x)/2,2);
var newX = x/2;
var lhs = Math.pow(newX,v);
var j0 = lhs * count;
return j0;

}


function factorial(k){
    // k = k-1;
    var factValue = 1;
    if(k == -1){
        return -1;
    }
    while(k > 1 ){
        factValue = factValue * k;
        k--;
        
    }
    return factValue;
    // console.log("Fact is : ",factValue);
}
window.onresize = function() {
    Plotly.Plots.resize(TESTER);
    // console.log("resize Done");
};

plotAllTogether(35);


