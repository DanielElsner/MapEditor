Template.maps.maps = function (){
    return Maps.find().fetch();
}

Template.map.events = {
    'click p' : function(){
        Session.set('currentMap',Maps.findOne({name: this.name}).map);
        Session.set('selectedMap',this.name);
        drawCurrentMap();

    }
}