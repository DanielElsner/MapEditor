var canvas,context, width = 800 , height=480,horizontalSquares = 50,verticalSquares = 30,blue = '#00f',red='#FF0000',
grass = 'grass',rock = 'rock', imageObjects = {};
var horizontalFactor = width / horizontalSquares;
var verticalFactor = height / verticalSquares;
var canvasRendered   = false;
Maps = Meteor.subscribe('Maps');




function setCurrentMap(map) {
    console.log('setMap');
    Session.set('currentMap', map);
}

Template.mainCanvas.events = {
    'click canvas' : function(ev){
	var position = getPostion(ev);
	var field = fetchField(getRelativePostion(ev.toElement,ev.pageX,ev.pageY));
	field.image = Session.get('selectedImage');
	fillFieldWithImage(field);
    updateField(field);
    }
}

Template.mainCanvas.canvasWidth = function(){
    return width;
}
Template.mainCanvas.canvasHeight = function(){
    return height;
}
Template.mainCanvas.rendered = function () {
    canvas = document.getElementById('mainCanvas');
    context = canvas.getContext('2d');
    setCurrentMap(getCurrentMap());
    drawCurrentMap();
    console.log('canvas renderd');
}


function getCurrentMap() {
    return Session.get('currentMap') || defaultMap();
}
function fetchField(pos){
    var currentMap = getCurrentMap();
    return currentMap[posToCursor(pos.x,horizontalFactor)][posToCursor(pos.y,verticalFactor)];
}
function updateField(field){
    var currentMap = getCurrentMap();
    var pos = {x: field.x,y:field.y};
    currentMap[posToCursor(pos.x,horizontalFactor)][posToCursor(pos.y,verticalFactor)] = field;
    setCurrentMap(currentMap);
}


function posToCursor(pos,factor){
    return (pos - (pos % factor) ) / factor;
}

 drawCurrentMap =function (){
    var map = getCurrentMap();
     for(var i = 0 ; i < map.length ; i++){
         var row = map[i];
         for(var j = 0 ; j < row.length ; j++){
             fillFieldWithImage(row[j]);
         }
     }
     return map;
 }

function defaultMap(){
    console.log('defaultmap');
    var map = [verticalSquares];
    for(var i = 0 ; i < horizontalSquares ; i++){
	var row = [horizontalSquares];
        for(var j = 0 ; j < verticalSquares ; j++){
            row[j] = {
            'x' : (i) * horizontalFactor,
            'y' : (j) * verticalFactor,
            color : blue,
            image : grass
            };
            map[i] = row;
        }
    }
    return map;
}


function fillField(field){
    context.beginPath();
    context.moveTo(field.x,field.y);
    context.lineTo(field.x+verticalFactor,field.y);
    context.lineTo(field.x+verticalFactor,field.y+horizontalFactor);
    context.lineTo(field.x,field.y+horizontalFactor);
    context.lineTo(field.x,field.y);
    context.closePath();
    context.fillStyle = field.color;
    context.fill();
}
function fillFieldWithImage(field){
    var image = new Image();
    var elem = document.getElementById(field.image);
    image.onload = function () {
	context.drawImage(image,field.x,field.y);//,field.x+verticalFactor,field.y+horizontalFactor,100,100);
    }
    image.src = elem.src;
}

function drawLine(from,to){
    context.beginPath();
    context.moveTo(from.x,from.y);
    context.lineTo(to.x,to.y);
    context.closePath();
    context.stroke();
    console.log('draw line from-> x' + from.x +' y: '+from.y+ ' to-> x: '+to.x+' y: '+to.y);
}

function getPostion(ev){
    console.log(ev);
    var result = 'postion:';
    result += ' total x: ' + ev.x;
    result += ' total y: ' + ev.y;
    result += '\n';
    return result;
}

function getRelativePostion(canvas,totalX,totalY){
    var result = '';
    var offset = $(canvas).offset();
    return {
	x : totalX - offset.left,
	y : totalY - offset.top
    };
}