class Point {
    constructor(position, pointType) {
        this.position = position;
        this.prevPosition = position;
        this.pointType = pointType;
    }

    clone(){

        return new Point(this.position, pointType);

    }



}

class Stick {
    constructor(pointA, pointB, length) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.length = length;
    }
}


class PointType{
    static Free = new PointType("Free")
    static Locked = new PointType("Locked")
    static Link = new PointType("Link")

    constructor(name) {
        this.name = name
    }
}



  
function addPoint(x,y,points){
    var position = new Vector2d(x,y);
    points.push(new Point(position,PointType.Free));
}

function addStick(pointA, pointB){
    distance = pointA.position.distance(pointB.position);
    sticks.push(new Stick(pointA,pointB,distance));
}

function isOnPointLocked(points, position,tolerance){

    for (var i = 0; i<points.length; i++){
        if(points[i].position.distance(position)<tolerance){
            if(points[i].pointType===PointType.Free){
                points[i].pointType= PointType.Locked
            }
            else if(points[i].pointType===PointType.Locked){
                points[i].pointType= PointType.Free
            }
            return true;
        }
    }
    return false;

}

function isOnPoint(point, pos,tolerance){
    if(point.position.distance(pos)<tolerance){
        return true;
    }

    return false;
}

function checkLink(newLink,points){

}

