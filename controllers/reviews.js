const Listing= require("../models/listing");
const Review= require("../models/review");
const {reviewSchema}=require("../Schema");
const {reviewAuthor}= require("../middleware");

// review route
module.exports.review= async(req,res)=>{
    let listings= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author= req.user._id;
    listings.reviews.push(newReview);
 
   await newReview.save();
   await listings.save();
   console.log("review has saved");
   req.flash("success","New review has added");
   res.redirect(`/listings/${listings._id}`);
 };

 // review delete route
 module.exports.deleteReview= async(req,res)=>{
    let {id, reviewId}= req.params;
   await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
 await  Review.findByIdAndDelete(reviewId);
 req.flash("success","Review has been deleted");
 res.redirect(`/listings/${id}`);
};