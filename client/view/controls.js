Template.controls.events = {
    'click input#saveNewMap':function(){
        Maps.insert({name: Maps.find().count()+1,map: Session.get('currentMap')});
    },
    'click input#saveCurrentMap': function(){
        if(Session.get('selectedMap')){
            var obj = Maps.findOne({name: Session.get('selectedMap')});
            Maps.update({id : obj.id,map:Session.get('currentMap')});
        }
    }
}