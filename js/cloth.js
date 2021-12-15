var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("click", clickPoint);
canvas.addEventListener('contextmenu', linkPoint);
var points = new Array();
var sticks = new Array();
var rect = canvas.getBoundingClientRect();
var size = 10

var gravity = new Vector2d(0,9.8);
var currentLink = null;
var linkIndex = null;
var linkType = null;

function simulate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i =0; i<points.length; i++){
        var curPoint = points[i];
        if(!(curPoint.pointType===PointType.Locked)){
            var origPos = curPoint.position;
            var diff = curPoint.position.subtract(curPoint.prevPosition);
            curPoint.position = curPoint.position.add(diff);
            curPoint.position = curPoint.position.add(gravity);
            curPoint.prevPosition = origPos;
        }
    }

    for (var i =0; i<sticks.length; i++){
        var currentStick = sticks[i];
        var stickCentre = (currentStick.pointA.position.stickCentre(currentStick.pointB.position));
        var stickDir = (currentStick.pointA.position.subtract(currentStick.pointB.position)).normalize();
        if(currentStick.pointA.pointType!=PointType.Locked){
            currentStick.pointA.position = stickCentre.add(stickDir.mult(currentStick.length).divide(2));
        }
        if(currentStick.pointB.pointType!=PointType.Locked){
            currentStick.pointB.position = stickCentre.subtract(stickDir.mult(currentStick.length).divide(2));
        }
    }
    render();

    
}

function linkPoint(event){
    var x = event.clientX - rect.left ;
    var y = event.clientY - rect.top;
    var newLink;
    var index = null;
    var curLinkType;
    for (var i = 0; i < points.length; i++) {
        if(isOnPoint(points[i],new Vector2d(x,y),size*2)){
            curLinkType =points[i].pointType 
            points[i].pointType=PointType.Link
            newLink = points[i];
            index = i;
        }  

    }

    if(currentLink==null){
        currentLink= newLink;
        linkIndex = index;
        linkType = curLinkType;
    }
    else if (linkIndex==index){
        currentLink = null;
        points[index].pointType =linkType;
        index = null;
    }
    else{
        addStick(currentLink,newLink);
        currentLink = null;
        points[index].pointType=curLinkType;
        points[linkIndex].pointType=linkType;
    }
    render();
}



function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        ctx.beginPath();
        ctx.arc(point.position.x, point.position.y, size, 0, Math.PI*2, false);
        if(point.pointType===PointType.Free){
            ctx.fillStyle = "black";
        }
        else if(point.pointType===PointType.Locked){
            ctx.fillStyle = "red";
        }
        else if(point.pointType===PointType.Link){
            ctx.fillStyle = "green";
        }

        ctx.fill();
        ctx.closePath(); 
    }

    for (var i = 0; i < sticks.length; i++) {
        var stick = sticks[i];
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(stick.pointA.position.x, stick.pointA.position.y);
        ctx.lineTo(stick.pointB.position.x, stick.pointB.position.y);
        ctx.fillStyle = "black";
        ctx.stroke();
        ctx.closePath(); 
    }
}

function clickPoint(event) {
    var x = event.clientX - rect.left ;
    var y = event.clientY - rect.top;
    if( ! (x<0 ||x>1600 || y <0 || y >800)){
        if(!isOnPointLocked(points,new Vector2d(x,y),size*2)){
            addPoint(x,y,points);
        }
    }
    render();


       
}




