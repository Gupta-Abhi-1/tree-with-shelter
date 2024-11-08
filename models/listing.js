const mongoose= require("mongoose");
// const { type } = require("os");
const initData= require("../init/data.js");
const Schema= mongoose.Schema;

const listingSchema= new Schema({
  title:{
    type:String, 
    required:true
  },
  description:{
    type:String
  },
 image:{
   url:String,
   filename:String,
 },
  price:{
    type:Number
  },
  location:{
    type:String
  },
  country:{
    type:String
  },
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Listing= mongoose.model("Listing",listingSchema);
module.exports= Listing;
