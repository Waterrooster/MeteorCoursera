Images = new Mongo.Collection("images");

if(Meteor.isClient)
{
 
  Template.images.helpers({images:Images.find({},{sort:{rating:-1}})});    

  Template.images.events({
    'click .js-image': function(event){
      $(event.target).css("width","50px");
    },
    'click .js-del-image': function(event){
        var image_id = this._id;
        $("#"+image_id).hide('slow',function(){
              Images.remove({"_id":image_id});  
        });
    },
    'click .js-rate-image':function(event){
      var rating = $(event.currentTarget).data("userrating");
      var image_id = this.id;
      Images.update({_id:image_id},
                    {$set: {rating:rating}});

    }
  });

  Template.image_add_form.events({
    'submit .js-add-image':function(event){
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      
    }
  });
}

if(Meteor.isServer)
{
  Meteor.startup(function(){
    if(Images.find().count()==0)
    {
      for(var i=1;i<23;i++)
      {
        Images.insert(
        {
          img_src: "img_"+i+".jpg",
          img_alt: "image number "+ i
        }
          );
      }
    }

  });
}