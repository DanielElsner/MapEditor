Session.set('selectedImage','rock');
Template.images.images = function(){
    return [{name:'rock'},{name:'grass'},{name:'tree_1'},{name:'flower_1'}];
}
Template.image.events = {
    'click img': function(){
         Session.set('selectedImage', this.name);
    }
};

Template.image.isSelected = function(){
    return Session.get('selectedImage') == this.name ? 'selected' : '';
}